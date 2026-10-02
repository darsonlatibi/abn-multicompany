import express from "express";

import {
  createOrder,
  getOrders,
  getOrderByNumber,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController.js";

const router = express.Router();

/* =========================================================
   ORDERS
   ========================================================= */

// POST /api/orders
router.post("/", createOrder);

// GET /api/orders
router.get("/", getOrders);

// GET /api/orders/:orderNumber
router.get("/:orderNumber", getOrderByNumber);

// PATCH /api/orders/:orderNumber/status
router.patch("/:orderNumber/status", updateOrderStatus);

// DELETE /api/orders/:orderNumber
router.delete("/:orderNumber", cancelOrder);

export default router;
