import crypto from "crypto";

import db from "../config/database.js";

import { Order, Payment } from "../models/index.js";

import {
  createMidtransTransaction,
  getMidtransTransactionStatus,
  processMidtransNotification,
} from "./midtransService.js";

/**
 * =========================================================
 * HELPERS
 * =========================================================
 */

const generatePaymentNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();

  const random = crypto.randomBytes(4).toString("hex").toUpperCase();

  return `PAY-${timestamp}-${random}`;
};

const normalizeAmount = (value) => {
  const amount = Math.round(Number(value));

  if (!Number.isFinite(amount)) {
    return null;
  }

  return amount;
};

/**
 * =========================================================
 * MIDTRANS STATUS → PAYMENT STATUS
 * =========================================================
 */

const mapMidtransStatus = (transactionStatus, fraudStatus) => {
  const status = String(transactionStatus || "").toLowerCase();

  const fraud = String(fraudStatus || "").toLowerCase();

  // Settlement
  if (status === "settlement") {
    return "PAID";
  }

  // Capture
  if (status === "capture") {
    if (fraud === "challenge") {
      return "PENDING";
    }

    if (fraud === "deny") {
      return "FAILED";
    }

    return "PAID";
  }

  // Pending
  if (status === "pending") {
    return "PENDING";
  }

  // Expired
  if (status === "expire") {
    return "EXPIRED";
  }

  // Cancelled
  if (status === "cancel") {
    return "CANCELLED";
  }

  // Failed
  if (status === "deny" || status === "failure") {
    return "FAILED";
  }

  // Refund
  if (status === "refund" || status === "partial_refund") {
    return "REFUNDED";
  }

  return "PENDING";
};

/**
 * =========================================================
 * ORDER STATUS
 * =========================================================
 */

const mapOrderStatus = (paymentStatus) => {
  switch (paymentStatus) {
    case "PAID":
      return "PAID";

    case "REFUNDED":
      return "REFUNDED";

    case "CANCELLED":
      return "CANCELLED";

    case "EXPIRED":
      return "EXPIRED";

    case "FAILED":
      return "CANCELLED";

    default:
      return "PENDING";
  }
};

/**
 * =========================================================
 * CREATE PAYMENT
 * =========================================================
 *
 * Creates:
 *
 * Orders
 *   ↓
 * Payments
 *   ↓
 * Midtrans
 *
 * =========================================================
 */

export const createPayment = async ({
  orderNumber,
  customerName,
  customerEmail,
  customerPhone,
}) => {
  if (!orderNumber) {
    throw new Error("Order number is required.");
  }

  /**
   * -------------------------------------------------------
   * FIND ORDER
   * -------------------------------------------------------
   */

  const order = await Order.findOne({
    where: {
      order_number: String(orderNumber),
    },
  });

  if (!order) {
    throw new Error("Order not found.");
  }

  /**
   * -------------------------------------------------------
   * VALIDATE ORDER STATUS
   * -------------------------------------------------------
   */

  if (
    order.status === "CANCELLED" ||
    order.status === "EXPIRED" ||
    order.status === "REFUNDED"
  ) {
    throw new Error(
      `Order cannot be paid because its status is ${order.status}.`,
    );
  }

  if (order.status === "COMPLETED") {
    throw new Error("Order is already completed.");
  }

  /**
   * -------------------------------------------------------
   * VALIDATE TOTAL
   * -------------------------------------------------------
   */

  const amount = normalizeAmount(order.grand_total);

  if (!amount || amount < 1000) {
    throw new Error("Order grand total must be at least Rp1.000.");
  }

  /**
   * -------------------------------------------------------
   * CHECK EXISTING PAYMENT
   * -------------------------------------------------------
   */

  const existingPayment = await Payment.findOne({
    where: {
      order_id: order.id,
    },
    order: [["created_at", "DESC"]],
  });

  /**
   * -------------------------------------------------------
   * ALREADY PAID
   * -------------------------------------------------------
   */

  if (existingPayment?.status === "PAID") {
    return {
      paymentId: existingPayment.id,
      paymentNumber: existingPayment.payment_number,
      orderNumber: order.order_number,
      amount: Number(existingPayment.amount),
      status: existingPayment.status,
      snapToken: existingPayment.midtrans_token,
      paymentUrl: existingPayment.raw_response?.redirect_url || null,
    };
  }

  /**
   * -------------------------------------------------------
   * REUSE PENDING PAYMENT
   * -------------------------------------------------------
   */

  if (existingPayment?.status === "PENDING" && existingPayment.midtrans_token) {
    return {
      paymentId: existingPayment.id,

      paymentNumber: existingPayment.payment_number,

      orderNumber: order.order_number,

      amount,

      status: existingPayment.status,

      snapToken: existingPayment.midtrans_token,

      paymentUrl: existingPayment.raw_response?.redirect_url || null,
    };
  }

  /**
   * -------------------------------------------------------
   * MIDTRANS ORDER ID
   * -------------------------------------------------------
   *
   * Use stable ABN order number.
   *
   * -------------------------------------------------------
   */

  const midtransOrderId = String(order.order_number);

  /**
   * -------------------------------------------------------
   * CUSTOMER DATA
   * -------------------------------------------------------
   */

  const finalCustomerName = customerName || order.customer_name;

  const finalCustomerEmail = customerEmail || order.customer_email;

  const finalCustomerPhone = customerPhone || order.customer_phone;

  if (!finalCustomerName) {
    throw new Error("Customer name is required.");
  }

  if (!finalCustomerEmail) {
    throw new Error("Customer email is required.");
  }

  /**
   * -------------------------------------------------------
   * ITEM DETAILS
   * -------------------------------------------------------
   *
   * For now we use the complete order
   * as one Midtrans item.
   *
   * Later we can populate this from
   * OrderItems.
   *
   * -------------------------------------------------------
   */

  const itemDetails = [
    {
      id: String(order.id),

      price: amount,

      quantity: 1,

      name: order.order_type || "ABN Order",
    },
  ];

  /**
   * -------------------------------------------------------
   * CREATE MIDTRANS TRANSACTION
   * -------------------------------------------------------
   */

  const result = await createMidtransTransaction({
    orderId: midtransOrderId,

    amount,

    customerName: finalCustomerName,

    customerEmail: finalCustomerEmail,

    customerPhone: finalCustomerPhone,

    itemDetails,

    finishUrl: undefined,
  });

  /**
   * -------------------------------------------------------
   * SAVE PAYMENT
   * -------------------------------------------------------
   */

  const payment = await Payment.create({
    order_id: order.id,

    payment_number: generatePaymentNumber(),

    provider: "MIDTRANS",

    payment_method: null,

    amount,

    currency: "IDR",

    status: "PENDING",

    midtrans_order_id: midtransOrderId,

    midtrans_token: result.token,

    raw_response: result.rawResponse
      ? {
          ...result.rawResponse,
          redirect_url: result.paymentUrl || result.redirectUrl || null,
        }
      : {
          redirect_url: result.paymentUrl || result.redirectUrl || null,
        },
  });

  /**
   * -------------------------------------------------------
   * UPDATE ORDER
   * -------------------------------------------------------
   */

  await order.update({
    status: "PENDING",
  });

  /**
   * -------------------------------------------------------
   * RETURN
   * -------------------------------------------------------
   */

  return {
    paymentId: payment.id,

    paymentNumber: payment.payment_number,

    orderNumber: order.order_number,

    amount,

    status: payment.status,

    midtransOrderId,

    snapToken: result.token,

    paymentUrl: result.paymentUrl || result.redirectUrl || null,
  };
};

/**
 * =========================================================
 * VERIFY MIDTRANS SIGNATURE
 * =========================================================
 */

const verifyMidtransSignature = (notification) => {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;

  if (!serverKey) {
    throw new Error("MIDTRANS_SERVER_KEY is not configured.");
  }

  const orderId = String(notification.order_id || "");

  const statusCode = String(notification.status_code || "");

  const grossAmount = String(notification.gross_amount || "");

  const signatureKey = String(notification.signature_key || "");

  if (!orderId || !statusCode || !grossAmount || !signatureKey) {
    throw new Error("Invalid Midtrans notification signature data.");
  }

  const payload = `${orderId}${statusCode}${grossAmount}${serverKey}`;

  const expectedSignature = crypto
    .createHash("sha512")
    .update(payload)
    .digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature, "utf8");

  const receivedBuffer = Buffer.from(signatureKey, "utf8");

  if (expectedBuffer.length !== receivedBuffer.length) {
    throw new Error("Invalid Midtrans signature.");
  }

  if (!crypto.timingSafeEqual(expectedBuffer, receivedBuffer)) {
    throw new Error("Invalid Midtrans signature.");
  }

  return true;
};

/**
 * =========================================================
 * MIDTRANS NOTIFICATION
 * =========================================================
 */

export const handleMidtransNotification = async (notification) => {
  if (!notification) {
    throw new Error("Midtrans notification is required.");
  }

  /**
   * -----------------------------------------------------
   * VERIFY SIGNATURE FIRST
   * -----------------------------------------------------
   */

  verifyMidtransSignature(notification);

  /**
   * -----------------------------------------------------
   * GET VERIFIED MIDTRANS RESPONSE
   * -----------------------------------------------------
   */

  const result = await processMidtransNotification(notification);

  const midtransOrderId = String(
    result.order_id || notification.order_id || "",
  );

  if (!midtransOrderId) {
    throw new Error("Midtrans order ID is missing.");
  }

  /**
   * -----------------------------------------------------
   * FIND PAYMENT
   * -----------------------------------------------------
   */

  const payment = await Payment.findOne({
    where: {
      midtrans_order_id: midtransOrderId,
    },
  });

  if (!payment) {
    throw new Error(`Payment not found for Midtrans order ${midtransOrderId}.`);
  }

  /**
   * -----------------------------------------------------
   * FIND ORDER
   * -----------------------------------------------------
   */

  const order = await Order.findByPk(payment.order_id);

  if (!order) {
    throw new Error("Order associated with payment was not found.");
  }

  /**
   * -----------------------------------------------------
   * VALIDATE AMOUNT
   * -----------------------------------------------------
   */

  const notificationAmount = normalizeAmount(
    result.gross_amount || notification.gross_amount,
  );

  const paymentAmount = normalizeAmount(payment.amount);

  const orderAmount = normalizeAmount(order.grand_total);

  if (notificationAmount !== paymentAmount) {
    throw new Error("Midtrans amount does not match payment amount.");
  }

  if (notificationAmount !== orderAmount) {
    throw new Error("Midtrans amount does not match order grand total.");
  }

  /**
   * -----------------------------------------------------
   * MAP STATUS
   * -----------------------------------------------------
   */

  const newPaymentStatus = mapMidtransStatus(
    result.transaction_status,
    result.fraud_status,
  );

  /**
   * -----------------------------------------------------
   * DATABASE TRANSACTION
   * -----------------------------------------------------
   */

  const response = await db.transaction(async (transaction) => {
    /**
     * Lock payment row
     */
    const lockedPayment = await Payment.findByPk(payment.id, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    /**
     * Protect successful payment
     * from late downgrade.
     */
    let finalPaymentStatus = newPaymentStatus;

    if (lockedPayment.status === "PAID" && newPaymentStatus !== "REFUNDED") {
      finalPaymentStatus = "PAID";
    }

    /**
     * ------------------------------------------------
     * UPDATE PAYMENT
     * ------------------------------------------------
     */

    await lockedPayment.update(
      {
        payment_method: result.payment_type || lockedPayment.payment_method,

        status: finalPaymentStatus,

        midtrans_transaction_id:
          result.transaction_id || lockedPayment.midtrans_transaction_id,

        midtrans_transaction_status:
          result.transaction_status ||
          lockedPayment.midtrans_transaction_status,

        midtrans_payment_type:
          result.payment_type || lockedPayment.midtrans_payment_type,

        midtrans_fraud_status:
          result.fraud_status || lockedPayment.midtrans_fraud_status,

        midtrans_status_code:
          result.status_code || lockedPayment.midtrans_status_code,

        midtrans_status_message:
          result.status_message || lockedPayment.midtrans_status_message,

        midtrans_signature_key:
          notification.signature_key || lockedPayment.midtrans_signature_key,

        midtrans_transaction_time:
          result.transaction_time || lockedPayment.midtrans_transaction_time,

        midtrans_settlement_time:
          result.settlement_time || lockedPayment.midtrans_settlement_time,

        raw_response: result,
      },
      {
        transaction,
      },
    );

    /**
     * ------------------------------------------------
     * UPDATE ORDER
     * ------------------------------------------------
     */

    let newOrderStatus = mapOrderStatus(finalPaymentStatus);

    /**
     * Don't downgrade completed order.
     */

    if (order.status === "COMPLETED") {
      newOrderStatus = "COMPLETED";
    }

    /**
     * Don't downgrade processing order
     * from a late pending notification.
     */

    if (order.status === "PROCESSING" && finalPaymentStatus !== "REFUNDED") {
      newOrderStatus = "PROCESSING";
    }

    await order.update(
      {
        status: newOrderStatus,
      },
      {
        transaction,
      },
    );

    return {
      paymentId: lockedPayment.id,

      orderId: order.id,

      orderNumber: order.order_number,

      paymentStatus: finalPaymentStatus,

      orderStatus: newOrderStatus,

      midtransTransactionId: result.transaction_id || null,
    };
  });

  return response;
};

/**
 * =========================================================
 * GET PAYMENT STATUS
 * =========================================================
 */

export const getPaymentStatus = async (orderNumber) => {
  if (!orderNumber) {
    throw new Error("Order number is required.");
  }

  const order = await Order.findOne({
    where: {
      order_number: String(orderNumber),
    },
  });

  if (!order) {
    throw new Error("Order not found.");
  }

  const payment = await Payment.findOne({
    where: {
      order_id: order.id,
    },
    order: [["created_at", "DESC"]],
  });

  if (!payment) {
    throw new Error("Payment not found.");
  }

  /**
   * -----------------------------------------------------
   * QUERY MIDTRANS
   * -----------------------------------------------------
   */

  const result = await getMidtransTransactionStatus(payment.midtrans_order_id);

  const newStatus = mapMidtransStatus(
    result.transaction_status,
    result.fraud_status,
  );

  /**
   * -----------------------------------------------------
   * UPDATE LOCAL PAYMENT
   * -----------------------------------------------------
   */

  await payment.update({
    payment_method: result.payment_type || payment.payment_method,

    status:
      payment.status === "PAID" && newStatus !== "REFUNDED"
        ? "PAID"
        : newStatus,

    midtrans_transaction_id:
      result.transaction_id || payment.midtrans_transaction_id,

    midtrans_transaction_status:
      result.transaction_status || payment.midtrans_transaction_status,

    midtrans_payment_type: result.payment_type || payment.midtrans_payment_type,

    midtrans_fraud_status: result.fraud_status || payment.midtrans_fraud_status,

    midtrans_status_code: result.status_code || payment.midtrans_status_code,

    midtrans_status_message:
      result.status_message || payment.midtrans_status_message,

    midtrans_transaction_time:
      result.transaction_time || payment.midtrans_transaction_time,

    midtrans_settlement_time:
      result.settlement_time || payment.midtrans_settlement_time,

    raw_response: result,
  });

  /**
   * -----------------------------------------------------
   * UPDATE ORDER
   * -----------------------------------------------------
   */

  const finalStatus = payment.status;

  if (finalStatus === "PAID") {
    await order.update({
      status: "PAID",
    });
  } else if (finalStatus === "REFUNDED") {
    await order.update({
      status: "REFUNDED",
    });
  } else if (finalStatus === "EXPIRED") {
    await order.update({
      status: "EXPIRED",
    });
  } else if (finalStatus === "CANCELLED") {
    await order.update({
      status: "CANCELLED",
    });
  }

  return {
    orderId: order.id,

    orderNumber: order.order_number,

    paymentId: payment.id,

    paymentNumber: payment.payment_number,

    amount: Number(payment.amount),

    status: payment.status,

    midtrans: result,
  };
};

export default {
  createPayment,
  handleMidtransNotification,
  getPaymentStatus,
};
