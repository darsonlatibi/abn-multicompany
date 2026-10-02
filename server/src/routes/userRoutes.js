import express from "express";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserPassword,
  updateUserStatus,
  updateUserRole,
  deleteUser,
} from "../controllers/userController.js";

import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// =====================================================
// USERS CRUD
// =====================================================

// GET /api/users
router.get("/", verifyToken, getUsers);

// GET /api/users/:id
router.get("/:id", verifyToken, getUserById);

// POST /api/users
router.post("/", verifyToken, createUser);

// PUT /api/users/:id
router.put("/:id", verifyToken, updateUser);

// PATCH /api/users/:id/password
router.patch("/:id/password", verifyToken, updateUserPassword);

// PATCH /api/users/:id/status
router.patch("/:id/status", verifyToken, updateUserStatus);

// PATCH /api/users/:id/role
router.patch("/:id/role", verifyToken, updateUserRole);

// DELETE /api/users/:id
router.delete("/:id", verifyToken, deleteUser);

export default router;
