/* =========================================================
   ABN WEBSITE
   EMAIL ROUTES
   ========================================================= */

import express from "express";

import {
  getEmails,
  getEmailById,
  createEmail,
  markEmailAsRead,
  markEmailAsUnread,
  toggleEmailStar,
  deleteEmail,
  archiveEmail,
} from "../controllers/EmailController.js";

import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

/* =========================================================
   EMAIL
   ========================================================= */

router.get("/", verifyToken, getEmails);

router.get("/:id", verifyToken, getEmailById);

router.post("/", verifyToken, createEmail);

router.patch("/:id/read", verifyToken, markEmailAsRead);

router.patch("/:id/unread", verifyToken, markEmailAsUnread);

router.patch("/:id/star", verifyToken, toggleEmailStar);

router.patch("/:id/archive", verifyToken, archiveEmail);

router.delete("/:id", verifyToken, deleteEmail);

export default router;
