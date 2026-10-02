import express from "express";
import { whopHealth } from "../controllers/whopController.js";

const router = express.Router();

router.get("/health", whopHealth);

export default router;
