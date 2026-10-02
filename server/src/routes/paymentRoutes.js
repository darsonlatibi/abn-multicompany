import express from "express";

import {
  createPaymentController,
  midtransNotificationController,
  paymentStatusController,
} from "../controllers/paymentController.js";

const router = express.Router();

/**
 * =========================================================
 * CREATE PAYMENT
 * POST /api/payments/create
 * =========================================================
 */
router.post("/create", createPaymentController);

/**
 * =========================================================
 * MIDTRANS WEBHOOK
 * POST /api/payments/notification
 * =========================================================
 *
 * Jangan gunakan JWT middleware.
 * Endpoint ini dipanggil oleh Midtrans.
 */
router.post("/notification", midtransNotificationController);

/**
 * =========================================================
 * PAYMENT STATUS
 * GET /api/payments/:orderNumber/status
 * =========================================================
 */
router.get("/:orderNumber/status", paymentStatusController);

export default router;
