import express from "express";

import { createSupportPayment } from "../controllers/SupportPaymentController.js";

const router = express.Router();

router.post("/pay", createSupportPayment);

export default router;
