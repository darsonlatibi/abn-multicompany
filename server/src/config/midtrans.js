import midtransClient from "midtrans-client";

/**
 * =========================================================
 * MIDTRANS CONFIGURATION
 * =========================================================
 *
 * Environment:
 *
 * MIDTRANS_SERVER_KEY
 * MIDTRANS_CLIENT_KEY
 * MIDTRANS_IS_PRODUCTION
 *
 * =========================================================
 */

const serverKey = process.env.MIDTRANS_SERVER_KEY;
const clientKey = process.env.MIDTRANS_CLIENT_KEY;

const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";

/**
 * ---------------------------------------------------------
 * Validate configuration
 * ---------------------------------------------------------
 */

if (!serverKey) {
  console.warn("⚠️ MIDTRANS_SERVER_KEY is not configured.");
}

if (!clientKey) {
  console.warn("⚠️ MIDTRANS_CLIENT_KEY is not configured.");
}

/**
 * =========================================================
 * SNAP
 * =========================================================
 *
 * Used for:
 * - Creating payment transactions
 * - Snap token
 * - Redirect URL
 *
 * =========================================================
 */

export const snap = new midtransClient.Snap({
  isProduction,
  serverKey,
  clientKey,
});

/**
 * =========================================================
 * CORE API
 * =========================================================
 *
 * Used for:
 * - Transaction status
 * - Payment status verification
 *
 * =========================================================
 */

export const coreApi = new midtransClient.CoreApi({
  isProduction,
  serverKey,
  clientKey,
});

/**
 * =========================================================
 * MIDTRANS CONFIG INFO
 * =========================================================
 *
 * Useful for server-side debugging.
 * Never expose serverKey.
 *
 * =========================================================
 */

export const midtransConfig = {
  isProduction,
  environment: isProduction ? "production" : "sandbox",
};

export default {
  snap,
  coreApi,
  midtransConfig,
};
