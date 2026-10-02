import { odooSearchCount, odooSearchRead } from "../services/odooService.js";

export async function testOdoo(req, res) {
  try {
    const users = await odooSearchRead(
      "res.users",
      [],
      ["id", "name", "login"],
      {
        limit: 5,
      },
    );

    res.json({
      success: true,
      message: "Odoo connection successful.",
      data: users,
    });
  } catch (error) {
    console.error("Odoo test error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function testOdooCount(req, res) {
  try {
    const count = await odooSearchCount("res.partner");

    res.json({
      success: true,
      message: "Odoo connection successful.",
      count,
    });
  } catch (error) {
    console.error("Odoo count error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
/* =========================================================
   ODOO USERS
   ========================================================= */

export async function getOdooUsers(req, res) {
  try {
    const data = await odooSearchRead(
      "res.users",
      [],
      ["id", "name", "login", "active", "email"],
      {
        order: "name asc",
      },
    );

    res.json({
      success: true,
      message: "Odoo users retrieved successfully.",
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Odoo users error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve Odoo users.",
    });
  }
}
/* =========================================================
   ODOO EMPLOYEES
   ========================================================= */

export async function getOdooEmployees(req, res) {
  try {
    const data = await odooSearchRead(
      "hr.employee",
      [],
      [
        "id",
        "name",
        "work_email",
        "work_phone",
        "mobile_phone",
        "job_title",
        "department_id",
        "company_id",
        "user_id",
        "active",
      ],
      {
        order: "name asc",
      },
    );

    res.json({
      success: true,
      message: "Odoo employees retrieved successfully.",
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Odoo employees error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve Odoo employees.",
    });
  }
}
