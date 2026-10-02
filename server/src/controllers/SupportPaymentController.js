import crypto from "crypto";

import { snap } from "../config/midtrans.js";
import SupportPayment from "../models/SupportPayment.js";

/**
 * =========================================================
 * GENERATE SUPPORT NUMBER
 * =========================================================
 */
const generateSupportNumber = () => {
  const timestamp = Date.now();
  const random = crypto.randomBytes(3).toString("hex").toUpperCase();

  return `ABN-SUPPORT-${timestamp}-${random}`;
};

/**
 * =========================================================
 * GENERATE MIDTRANS ORDER ID
 * =========================================================
 */
const generateMidtransOrderId = () => {
  const timestamp = Date.now();
  const random = crypto.randomBytes(3).toString("hex").toUpperCase();

  return `ABN-SUPPORT-${timestamp}-${random}`;
};

/**
 * =========================================================
 * NORMALIZE MONEY
 * =========================================================
 */
const toMoney = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return null;
  }

  return Math.round(number);
};

/**
 * =========================================================
 * CREATE SUPPORT PAYMENT
 *
 * POST /api/payments/support
 *
 * Body:
 * {
 *   amount: 30000,
 *   customer_name: "Test Support ABN",
 *   customer_email: "test@example.com",
 *   customer_phone: "08123456789"
 * }
 * =========================================================
        const payload = {
      amount: initialAmount,
      customer_name: customerName.trim(),

      ...(customerEmail.trim()
        ? {
            customer_email: customerEmail.trim(),
          }
        : {}),

      ...(customerPhone.trim()
        ? {
            customer_phone: customerPhone.trim(),
          }
        : {}),
    };
 */
export async function createSupportPayment(req, res) {
  try {
    const { amount, customer_name, customer_email, customer_phone } = req.body;

    /**
     * -------------------------------------------------------
     * VALIDATE AMOUNT
     * -------------------------------------------------------
     */
    const paymentAmount = toMoney(amount);

    if (!paymentAmount || paymentAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount pembayaran tidak valid.",
      });
    }

    /**
     * Minimum support Rp1.000
     */
    if (paymentAmount < 1000) {
      return res.status(400).json({
        success: false,
        message: "Minimum support adalah Rp1.000.",
      });
    }

    /**
     * -------------------------------------------------------
     * NORMALIZE CUSTOMER DATA
     * -------------------------------------------------------
     */
    const normalizedName = customer_name
      ? String(customer_name).trim()
      : "ABN Supporter";

    const normalizedEmail = customer_email
      ? String(customer_email).trim().toLowerCase()
      : null;

    const normalizedPhone = customer_phone
      ? String(customer_phone).trim()
      : null;

    /**
     * -------------------------------------------------------
     * GENERATE IDENTIFIERS
     * -------------------------------------------------------
     */
    const supportNumber = generateSupportNumber();

    const midtransOrderId = generateMidtransOrderId();

    /**
     * -------------------------------------------------------
     * MIDTRANS SNAP PARAMETER
     * -------------------------------------------------------
     */
    const parameter = {
      transaction_details: {
        order_id: midtransOrderId,
        gross_amount: paymentAmount,
      },

      item_details: [
        {
          id: "ABN-SUPPORT",
          price: paymentAmount,
          quantity: 1,
          name: "Support ABN",
        },
      ],

      customer_details: {
        first_name: normalizedName,
        email: normalizedEmail || "supporter@abn.web.id",
        ...(normalizedPhone
          ? {
              phone: normalizedPhone,
            }
          : {}),
      },
    };

    /**
     * -------------------------------------------------------
     * CREATE MIDTRANS TRANSACTION
     * -------------------------------------------------------
     */
    const midtransResponse = await snap.createTransaction(parameter);

    /**
     * -------------------------------------------------------
     * SAVE SUPPORT PAYMENT
     * -------------------------------------------------------
     */
    const supportPayment = await SupportPayment.create({
      support_number: supportNumber,

      customer_name: normalizedName,

      customer_email: normalizedEmail,

      customer_phone: normalizedPhone,

      amount: paymentAmount,

      currency: "IDR",

      status: "PENDING",

      provider: "MIDTRANS",

      midtrans_order_id: midtransOrderId,

      midtrans_token: midtransResponse?.token || null,

      raw_response: midtransResponse,
    });

    /**
     * -------------------------------------------------------
     * RESPONSE
     * -------------------------------------------------------
     */
    return res.status(201).json({
      success: true,

      message: "Support payment berhasil dibuat.",

      data: {
        id: supportPayment.id,

        supportNumber: supportPayment.support_number,

        amount: paymentAmount,

        currency: "IDR",

        status: supportPayment.status,

        provider: "MIDTRANS",

        midtransOrderId,

        snapToken: midtransResponse?.token || null,

        paymentUrl: midtransResponse?.redirect_url || null,
      },
    });
  } catch (error) {
    /**
     * -------------------------------------------------------
     * ERROR LOG
     * -------------------------------------------------------
     */
    console.error("CREATE SUPPORT PAYMENT ERROR:", error);

    /**
     * Midtrans error
     */
    const midtransMessage = error?.ApiResponse?.error_messages?.join?.(", ");

    return res.status(500).json({
      success: false,

      message:
        midtransMessage || error?.message || "Gagal membuat support payment.",

      ...(process.env.NODE_ENV !== "production" && {
        error: {
          name: error?.name,
          message: error?.message,
        },
      }),
    });
  }
}
