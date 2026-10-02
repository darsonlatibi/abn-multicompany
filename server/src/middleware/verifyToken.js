/* =========================================================
   ABN WEBSITE
   JWT VERIFY TOKEN MIDDLEWARE
   ========================================================= */

import jwt from "jsonwebtoken";

/* =========================================================
   GET JWT ACCESS SECRET
   ========================================================= */
const getAccessSecret = () => {
  return process.env.ACCESS_TOKEN_SECRET || null;
};

/* =========================================================
   VERIFY ACCESS TOKEN
   ========================================================= */

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    /* =====================================================
       AUTHORIZATION HEADER
       ===================================================== */

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const token = authHeader.substring(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token tidak ditemukan.",
      });
    }

    /* =====================================================
       JWT SECRET
       ===================================================== */

    const secret = getAccessSecret();

    if (!secret) {
      console.error("[verifyToken] JWT access secret belum dikonfigurasi.");

      return res.status(500).json({
        success: false,
        message: "JWT configuration error.",
      });
    }

    /* =====================================================
       VERIFY TOKEN
       ===================================================== */

    const decoded = jwt.verify(token, secret);

    /* =====================================================
       ONLY ACCESS TOKEN
       ===================================================== */

    if (decoded.type && decoded.type !== "access") {
      return res.status(401).json({
        success: false,
        message: "Invalid access token.",
      });
    }

    /* =====================================================
       ATTACH USER TO REQUEST
       ===================================================== */

    req.user = decoded;

    next();
  } catch (err) {
    console.error("[verifyToken]", err.message);

    /* =====================================================
       TOKEN EXPIRED
       ===================================================== */

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired.",
      });
    }

    /* =====================================================
       INVALID TOKEN
       ===================================================== */

    return res.status(401).json({
      success: false,
      message: "Invalid access token.",
    });
  }
};

export default verifyToken;
