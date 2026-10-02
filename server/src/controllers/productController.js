import { Op } from "sequelize";
import Products from "../models/Products.js";

/* =========================================================
   HELPERS
   ========================================================= */

const sendError = (res, status, message, error = null) => {
  console.error(`[PRODUCT] ${message}`, error?.message || "");

  return res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && error
      ? { error: error.message }
      : {}),
  });
};

const toNumber = (value, fallback = 0) => {
  const number = Number(value);

  return Number.isFinite(number) ? number : fallback;
};

/* =========================================================
   CREATE PRODUCT
   POST /api/products
   ========================================================= */

export const createProduct = async (req, res) => {
  try {
    const {
      product_id,
      userId,
      name,
      description = null,
      price,
      stock = 0,
      image = null,
      category = null,
      source = "internal",
      tax_percent = 11,
    } = req.body;

    // -----------------------------------------------------
    // VALIDATION
    // -----------------------------------------------------

    if (!userId) {
      return sendError(res, 400, "userId is required.");
    }

    if (!name || !String(name).trim()) {
      return sendError(res, 400, "Product name is required.");
    }

    if (price === undefined || price === null || price === "") {
      return sendError(res, 400, "Price is required.");
    }

    const productPrice = toNumber(price, NaN);
    const productStock = toNumber(stock, NaN);
    const productTax = toNumber(tax_percent, NaN);

    if (!Number.isFinite(productPrice) || productPrice < 0) {
      return sendError(res, 400, "Price must be a valid number.");
    }

    if (!Number.isFinite(productStock) || productStock < 0) {
      return sendError(res, 400, "Stock must be a valid number.");
    }

    if (!Number.isFinite(productTax) || productTax < 0) {
      return sendError(res, 400, "tax_percent must be a valid number.");
    }

    // -----------------------------------------------------
    // CREATE
    // -----------------------------------------------------

    const product = await Products.create({
      ...(product_id ? { product_id } : {}),
      userId,
      name: String(name).trim(),
      description,
      price: productPrice,
      stock: productStock,
      image,
      category,
      source,
      tax_percent: productTax,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: product,
    });
  } catch (error) {
    return sendError(res, 500, "Failed to create product.", error);
  }
};

/* =========================================================
   GET PRODUCTS
   GET /api/products
   ========================================================= */

export const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      source,
      userId,
      page = 1,
      limit = 20,
    } = req.query;

    const pageNumber = Math.max(Number(page) || 1, 1);
    const limitNumber = Math.min(Math.max(Number(limit) || 20, 1), 100);

    const offset = (pageNumber - 1) * limitNumber;

    const where = {};

    // -----------------------------------------------------
    // SEARCH
    // -----------------------------------------------------

    if (search) {
      where[Op.or] = [
        {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          category: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          source: {
            [Op.like]: `%${search}%`,
          },
        },
      ];
    }

    // -----------------------------------------------------
    // FILTERS
    // -----------------------------------------------------

    if (category) {
      where.category = category;
    }

    if (source) {
      where.source = source;
    }

    if (userId) {
      where.userId = userId;
    }

    const { count, rows } = await Products.findAndCountAll({
      where,
      order: [["id", "DESC"]],
      limit: limitNumber,
      offset,
    });

    return res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total: count,
        totalPages: Math.ceil(count / limitNumber),
      },
    });
  } catch (error) {
    return sendError(res, 500, "Failed to fetch products.", error);
  }
};

/* =========================================================
   GET PRODUCT BY ID
   GET /api/products/:id
   ========================================================= */

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findByPk(id);

    if (!product) {
      return sendError(res, 404, "Product not found.");
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return sendError(res, 500, "Failed to fetch product.", error);
  }
};

/* =========================================================
   UPDATE PRODUCT
   PUT /api/products/:id
   ========================================================= */

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findByPk(id);

    if (!product) {
      return sendError(res, 404, "Product not found.");
    }

    const {
      userId,
      name,
      description,
      price,
      stock,
      image,
      category,
      source,
      tax_percent,
    } = req.body;

    const updateData = {};

    if (userId !== undefined) {
      updateData.userId = userId;
    }

    if (name !== undefined) {
      if (!String(name).trim()) {
        return sendError(res, 400, "Product name cannot be empty.");
      }

      updateData.name = String(name).trim();
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    if (price !== undefined) {
      const value = toNumber(price, NaN);

      if (!Number.isFinite(value) || value < 0) {
        return sendError(res, 400, "Price must be a valid number.");
      }

      updateData.price = value;
    }

    if (stock !== undefined) {
      const value = toNumber(stock, NaN);

      if (!Number.isFinite(value) || value < 0) {
        return sendError(res, 400, "Stock must be a valid number.");
      }

      updateData.stock = value;
    }

    if (image !== undefined) {
      updateData.image = image;
    }

    if (category !== undefined) {
      updateData.category = category;
    }

    if (source !== undefined) {
      updateData.source = source;
    }

    if (tax_percent !== undefined) {
      const value = toNumber(tax_percent, NaN);

      if (!Number.isFinite(value) || value < 0) {
        return sendError(res, 400, "tax_percent must be a valid number.");
      }

      updateData.tax_percent = value;
    }

    await product.update(updateData);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      data: product,
    });
  } catch (error) {
    return sendError(res, 500, "Failed to update product.", error);
  }
};

/* =========================================================
   DELETE PRODUCT
   DELETE /api/products/:id
   ========================================================= */

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findByPk(id);

    if (!product) {
      return sendError(res, 404, "Product not found.");
    }

    await product.destroy();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    return sendError(res, 500, "Failed to delete product.", error);
  }
};
