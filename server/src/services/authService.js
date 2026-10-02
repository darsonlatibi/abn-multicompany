import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || "15m";

const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "30d";

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error("JWT secrets are not configured.");
}

/* =========================================================
   REGISTER
   ========================================================= */

export async function registerUser({
  username,
  email,
  password,
  full_name,
  role,
}) {
  const existingUser = await User.findOne({
    where: {
      email,
    },
  });

  if (existingUser) {
    const error = new Error("Email already registered.");
    error.status = 409;
    throw error;
  }

  const existingUsername = await User.findOne({
    where: {
      username,
    },
  });

  if (existingUsername) {
    const error = new Error("Username already registered.");
    error.status = 409;
    throw error;
  }

  const password_hash = await bcrypt.hash(password, 12);

  const user = await User.create({
    username,
    email,
    password_hash,
    full_name,
    role: role || "VIEWER",
    status: "ACTIVE",
  });

  return sanitizeUser(user);
}

/* =========================================================
   LOGIN
   ========================================================= */

export async function loginUser({ login, password }) {
  const user = await User.findOne({
    where: {
      email: login,
    },
  });

  if (!user) {
    const error = new Error("Invalid email or password.");
    error.status = 401;
    throw error;
  }

  if (user.status !== "ACTIVE") {
    const error = new Error("User account is not active.");
    error.status = 403;
    throw error;
  }

  const validPassword = await bcrypt.compare(password, user.password_hash);

  if (!validPassword) {
    const error = new Error("Invalid email or password.");
    error.status = 401;
    throw error;
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
    expiresIn: getAccessTokenExpiresInSeconds(),
  };
}

/* =========================================================
   REFRESH ACCESS TOKEN
   ========================================================= */

export async function refreshAccessToken(refreshToken) {
  if (!refreshToken) {
    const error = new Error("Refresh token is required.");
    error.status = 401;
    throw error;
  }

  let payload;

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (error) {
    const refreshError = new Error("Invalid or expired refresh token.");
    refreshError.status = 401;
    throw refreshError;
  }

  if (!payload?.sub) {
    const error = new Error("Invalid refresh token payload.");
    error.status = 401;
    throw error;
  }

  const user = await User.findByPk(payload.sub);

  if (!user) {
    const error = new Error("User not found.");
    error.status = 401;
    throw error;
  }

  if (user.status !== "ACTIVE") {
    const error = new Error("User account is not active.");
    error.status = 403;
    throw error;
  }

  /*
   * Refresh token rotation:
   * - token lama sudah berhasil diverifikasi
   * - generate access token baru
   * - generate refresh token baru
   */
  const accessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken: newRefreshToken,
    expiresIn: getAccessTokenExpiresInSeconds(),
    user: sanitizeUser(user),
  };
}

/* =========================================================
   GET USER
   ========================================================= */

export async function getUserById(userId) {
  const user = await User.findByPk(userId);

  if (!user) {
    const error = new Error("User not found.");
    error.status = 404;
    throw error;
  }

  return sanitizeUser(user);
}

/* =========================================================
   ACCESS TOKEN
   ========================================================= */

export function generateAccessToken(user) {
  return jwt.sign(
    {
      sub: String(user.id),
      email: user.email,
      role: user.role,
      type: "access",
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  );
}

/* =========================================================
   REFRESH TOKEN
   ========================================================= */

export function generateRefreshToken(user) {
  return jwt.sign(
    {
      sub: String(user.id),
      email: user.email,
      role: user.role,
      type: "refresh",
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    },
  );
}

/* =========================================================
   VERIFY ACCESS TOKEN
   ========================================================= */

export function verifyAccessToken(token) {
  const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);

  if (payload.type !== "access") {
    const error = new Error("Invalid access token.");
    error.status = 401;
    throw error;
  }

  return payload;
}

/* =========================================================
   VERIFY REFRESH TOKEN
   ========================================================= */

export function verifyRefreshToken(token) {
  const payload = jwt.verify(token, REFRESH_TOKEN_SECRET);

  if (payload.type !== "refresh") {
    const error = new Error("Invalid refresh token.");
    error.status = 401;
    throw error;
  }

  return payload;
}

/* =========================================================
   ACCESS TOKEN EXPIRY
   ========================================================= */

function getAccessTokenExpiresInSeconds() {
  const value = String(ACCESS_TOKEN_EXPIRES_IN).trim();

  const match = value.match(/^(\d+)\s*(s|m|h|d)?$/i);

  if (!match) {
    return 900;
  }

  const amount = Number(match[1]);
  const unit = (match[2] || "s").toLowerCase();

  const multipliers = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 24 * 60 * 60,
  };

  return amount * (multipliers[unit] || 1);
}

/* =========================================================
   SANITIZE USER
   ========================================================= */

function sanitizeUser(user) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    full_name: user.full_name,
    avatar: user.avatar,
    role: user.role,
    status: user.status,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}
