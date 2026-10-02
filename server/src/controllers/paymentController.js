import {
  createPayment,
  handleMidtransNotification,
  getPaymentStatus,
} from "../services/paymentService.js";

/**
 * =========================================================
 * CREATE PAYMENT
 * POST /api/payments/create
 * =========================================================
 *
 * Client hanya mengirim order_number.
 *
 * Amount TIDAK boleh dipercaya dari frontend.
 * Amount diambil dari orders.grand_total.
 */

export const createPaymentController = async (req, res) => {
  try {
    const { order_number, customer_name, customer_email, customer_phone } =
      req.body;

    if (!order_number) {
      return res.status(400).json({
        success: false,
        message: "order_number is required.",
      });
    }

    const result = await createPayment({
      orderNumber: order_number,
      customerName: customer_name,
      customerEmail: customer_email,
      customerPhone: customer_phone,
    });

    return res.status(201).json({
      success: true,
      message: "Payment created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("CREATE PAYMENT CONTROLLER ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error?.message || "Failed to create payment.",
    });
  }
};

/**
 * =========================================================
 * MIDTRANS WEBHOOK
 * POST /api/payments/notification
 * =========================================================
 *
 * Endpoint ini TIDAK menggunakan JWT.
 * Midtrans yang memanggil endpoint ini.
 */

export const midtransNotificationController = async (req, res) => {
  try {
    console.log("==============================================");
    console.log("MIDTRANS WEBHOOK");
    console.log("ORDER ID:", req.body?.order_id);
    console.log("TRANSACTION ID:", req.body?.transaction_id);
    console.log("TRANSACTION STATUS:", req.body?.transaction_status);
    console.log("PAYMENT TYPE:", req.body?.payment_type);
    console.log("==============================================");

    const result = await handleMidtransNotification(req.body);

    return res.status(200).json({
      success: true,
      message: "Midtrans notification processed successfully.",
      data: result,
    });
  } catch (error) {
    console.error("MIDTRANS NOTIFICATION CONTROLLER ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error?.message || "Notification processing failed.",
    });
  }
};

/**
 * =========================================================
 * GET PAYMENT STATUS
 * GET /api/payments/:orderNumber/status
 * =========================================================
 */

export const paymentStatusController = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    if (!orderNumber) {
      return res.status(400).json({
        success: false,
        message: "Order number is required.",
      });
    }

    const result = await getPaymentStatus(orderNumber);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("GET PAYMENT STATUS CONTROLLER ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error?.message || "Failed to retrieve payment status.",
    });
  }
};

export default {
  createPaymentController,
  midtransNotificationController,
  paymentStatusController,
};
