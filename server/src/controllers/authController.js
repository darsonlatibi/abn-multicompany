import bcrypt from "bcryptjs";
import User from "../models/User.js";

import {
  registerUser,
  loginUser,
  getUserById,
  refreshAccessToken,
} from "../services/authService.js";

/* =========================================================
   COOKIE CONFIG
   ========================================================= */

const REFRESH_TOKEN_COOKIE = "abn_multicompany_refresh_token";
const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/api/auth",
};

/* =========================================================
   LOGIN
   POST /api/auth/login
   ========================================================= */

export async function login(req, res) {
  try {
    const { login: loginValue, email, password } = req.body;

    const loginIdentifier = String(loginValue || email || "")
      .trim()
      .toLowerCase();

    if (!loginIdentifier) {
      return res.status(400).json({
        success: false,
        message: "Email wajib diisi.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password wajib diisi.",
      });
    }

    const result = await loginUser({
      login: loginIdentifier,
      password,
    });

    /*
     * Refresh token:
     * HttpOnly cookie.
     *
     * Frontend tidak perlu membaca token ini.
     */
    res.cookie(REFRESH_TOKEN_COOKIE, result.refreshToken, {
      ...cookieOptions,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    /*
     * Access token:
     * dikirim ke frontend untuk disimpan sementara
     * melalui authBridge.
     */
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        accessToken: result.accessToken,
        expiresIn: result.expiresIn,
        user: result.user,
      },
    });
  } catch (error) {
    console.error("AUTH LOGIN ERROR:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Login gagal. Silakan coba lagi.",
    });
  }
}

/* =========================================================
   REGISTER
   POST /api/auth/register
   ========================================================= */

export async function register(req, res) {
  try {
    const { username, email, password, full_name, role } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username wajib diisi.",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email wajib diisi.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password wajib diisi.",
      });
    }

    if (!full_name) {
      return res.status(400).json({
        success: false,
        message: "Nama lengkap wajib diisi.",
      });
    }

    const user = await registerUser({
      username,
      email: String(email).trim().toLowerCase(),
      password,
      full_name,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      user,
    });
  } catch (error) {
    console.error("AUTH REGISTER ERROR:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Registrasi gagal.",
    });
  }
}

/* =========================================================
   REFRESH TOKEN
   POST /api/auth/token
   ========================================================= */

export async function refresh(req, res) {
  try {
    const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE];

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token tidak ditemukan.",
      });
    }

    const result = await refreshAccessToken(refreshToken);

    /*
     * Rotate refresh token.
     */
    res.cookie(REFRESH_TOKEN_COOKIE, result.refreshToken, {
      ...cookieOptions,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    /*
     * Access token harus TOP LEVEL
     * agar frontend dapat membaca:
     *
     * response.data.accessToken
     */
    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully.",
      accessToken: result.accessToken,
      expiresIn: result.expiresIn,
    });
  } catch (error) {
    console.error("AUTH REFRESH ERROR:", error);

    res.clearCookie(REFRESH_TOKEN_COOKIE, cookieOptions);

    return res.status(error.status || 401).json({
      success: false,
      message: error.message || "Refresh token tidak valid atau sudah expired.",
    });
  }
}

/* =========================================================
   LOGOUT
   POST /api/auth/logout
   ========================================================= */

export async function logout(req, res) {
  try {
    res.clearCookie(REFRESH_TOKEN_COOKIE, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    console.error("AUTH LOGOUT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Logout gagal.",
    });
  }
}

/* =========================================================
   CURRENT USER
   GET /api/auth/me
   ========================================================= */

export async function me(req, res) {
  try {
    if (!req.user?.sub) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const user = await getUserById(req.user.sub);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("AUTH ME ERROR:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "User tidak ditemukan.",
    });
  }
}

/* =========================================================
   FORGOT PASSWORD
   ========================================================= */

export async function forgotPassword(req, res) {
  try {
    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email wajib diisi.",
      });
    }

    /*
     * Untuk sementara response generik.
     * Email reset password dapat diintegrasikan kemudian.
     */
    return res.status(200).json({
      success: true,
      message: "Jika email terdaftar, instruksi reset password akan dikirim.",
    });
  } catch (error) {
    console.error("AUTH FORGOT PASSWORD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Gagal memproses permintaan reset password.",
    });
  }
}

/* =========================================================
   CHANGE PASSWORD
   POST /api/auth/change-password
   ========================================================= */

export async function changePassword(req, res) {
  try {
    if (!req.user?.sub) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword) {
      return res.status(400).json({
        success: false,
        message: "Password saat ini wajib diisi.",
      });
    }

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: "Password baru wajib diisi.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Konfirmasi password tidak sama.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password baru minimal 6 karakter.",
      });
    }

    const user = await User.findByPk(req.user.sub);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan.",
      });
    }

    const validPassword = await bcrypt.compare(
      currentPassword,
      user.password_hash,
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Password saat ini salah.",
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "Password baru harus berbeda dari password saat ini.",
      });
    }

    user.password_hash = await bcrypt.hash(newPassword, 12);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password berhasil diubah.",
    });
  } catch (error) {
    console.error("AUTH CHANGE PASSWORD ERROR:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Gagal mengubah password.",
    });
  }
}
