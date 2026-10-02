import bcrypt from "bcryptjs";
import User from "../models/User.js";

// =====================================================
// SANITIZE USER
// =====================================================

const sanitizeUser = (user) => {
  const data = user.toJSON ? user.toJSON() : user;

  const { password_hash, ...safeUser } = data;

  return safeUser;
};

// =====================================================
// GET ALL USERS
// GET /api/users
// =====================================================

export const getUsers = async (req, res, next) => {
  try {
    const { search = "", role, status, page = 1, limit = 20 } = req.query;

    const pageNumber = Math.max(Number(page) || 1, 1);
    const limitNumber = Math.min(Math.max(Number(limit) || 20, 1), 100);

    const offset = (pageNumber - 1) * limitNumber;

    const where = {};

    if (role) {
      where.role = role;
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      const { Op } = await import("sequelize");

      where[Op.or] = [
        {
          username: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          full_name: {
            [Op.like]: `%${search}%`,
          },
        },
      ];
    }

    const { count, rows } = await User.findAndCountAll({
      where,
      attributes: {
        exclude: ["password_hash"],
      },
      order: [["created_at", "DESC"]],
      limit: limitNumber,
      offset,
    });

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      data: rows.map(sanitizeUser),
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total: count,
        totalPages: Math.ceil(count / limitNumber),
      },
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// GET USER BY ID
// GET /api/users/:id
// =====================================================

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password_hash"],
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully.",
      data: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// CREATE USER
// POST /api/users
// =====================================================

export const createUser = async (req, res, next) => {
  try {
    const { username, email, password, full_name, avatar, role, status } =
      req.body;

    if (!username || !email || !password || !full_name) {
      return res.status(400).json({
        success: false,
        message: "Username, email, password, and full_name are required.",
      });
    }

    const existingEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }

    const existingUsername = await User.findOne({
      where: {
        username,
      },
    });

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already registered.",
      });
    }

    const password_hash = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password_hash,
      full_name,
      avatar: avatar || null,
      role: role || "VIEWER",
      status: status || "ACTIVE",
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// UPDATE USER
// PUT /api/users/:id
// =====================================================

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { username, email, full_name, avatar, role, status } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (email && email !== user.email) {
      const existingEmail = await User.findOne({
        where: {
          email,
        },
      });

      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: "Email already registered.",
        });
      }
    }

    if (username && username !== user.username) {
      const existingUsername = await User.findOne({
        where: {
          username,
        },
      });

      if (existingUsername) {
        return res.status(409).json({
          success: false,
          message: "Username already registered.",
        });
      }
    }

    await user.update({
      username: username !== undefined ? username : user.username,

      email: email !== undefined ? email : user.email,

      full_name: full_name !== undefined ? full_name : user.full_name,

      avatar: avatar !== undefined ? avatar : user.avatar,

      role: role !== undefined ? role : user.role,

      status: status !== undefined ? status : user.status,
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// UPDATE USER PASSWORD
// PATCH /api/users/:id/password
// =====================================================

export const updateUserPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const password_hash = await bcrypt.hash(password, 12);

    await user.update({
      password_hash,
    });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// UPDATE USER STATUS
// PATCH /api/users/:id/status
// =====================================================

export const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["ACTIVE", "INACTIVE", "SUSPENDED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user status.",
      });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await user.update({
      status,
    });

    return res.status(200).json({
      success: true,
      message: "User status updated successfully.",
      data: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// UPDATE USER ROLE
// PATCH /api/users/:id/role
// =====================================================

export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const allowedRoles = [
      "SUPER_ADMIN",
      "ADMIN",
      "TRADER",
      "ANALYST",
      "VIEWER",
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user role.",
      });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await user.update({
      role,
    });

    return res.status(200).json({
      success: true,
      message: "User role updated successfully.",
      data: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

// =====================================================
// DELETE USER
// DELETE /api/users/:id
// =====================================================

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await user.destroy();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
