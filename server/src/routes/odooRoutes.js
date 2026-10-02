import express from "express";

import {
  testOdoo,
  testOdooCount,
  getOdooUsers,
  getOdooEmployees,
} from "../controllers/odooController.js";

import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/test", verifyToken, testOdoo);
router.get("/count", verifyToken, testOdooCount);

/* =========================================================
   USERS
   ========================================================= */

router.get("/users", verifyToken, getOdooUsers);

/* =========================================================
   EMPLOYEES
   ========================================================= */

router.get("/employees", verifyToken, getOdooEmployees);

export default router;
