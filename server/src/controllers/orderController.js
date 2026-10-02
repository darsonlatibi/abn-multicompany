import { Op } from "sequelize";
import sequelize from "../config/database.js";

import { Order, OrderItem, Products } from "../models/index.js";

// =====================================================
// CONSTANTS
// =====================================================

const ORDER_TYPES = ["KOPI", "PRODUCT", "EMS_RENTAL", "EMS_LICENSE"];

const ORDER_STATUSES = [
  "PENDING",
  "PAID",
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
  "EXPIRED",
  "REFUNDED",
];

// =====================================================
// HELPERS
// =====================================================

const toNumber = (value, fallback = 0) => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : NaN;
};

const roundMoney = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(1000 + Math.random() * 9000);

  return `ABN-${timestamp}-${random}`;
};

const sendError = (res, status, message) =>
  res.status(status).json({
    success: false,
    message,
  });

// =====================================================
// CREATE ORDER
// POST /api/orders
// =====================================================

export const createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      order_type = "PRODUCT",
      customer_name,
      customer_phone,
      customer_email,
      items,
      discount = 0,
      shipping_cost = 0,
      notes = null,
    } = req.body;

    // =================================================
    // VALIDATE ORDER TYPE
    // =================================================

    if (!ORDER_TYPES.includes(order_type)) {
      await transaction.rollback();

      return sendError(
        res,
        400,
        `Invalid order_type. Allowed: ${ORDER_TYPES.join(", ")}`,
      );
    }

    // =================================================
    // VALIDATE CUSTOMER
    // =================================================

    if (!customer_name || !customer_email) {
      await transaction.rollback();

      return sendError(
        res,
        400,
        "customer_name and customer_email are required",
      );
    }

    // =================================================
    // VALIDATE ITEMS
    // =================================================

    if (!Array.isArray(items) || items.length === 0) {
      await transaction.rollback();

      return sendError(res, 400, "Order must contain at least one item");
    }

    // =================================================
    // VALIDATE RENTAL DATES
    // =================================================

    if (order_type === "EMS_RENTAL") {
      if (!req.body.rental_start || !req.body.rental_end) {
        await transaction.rollback();

        return sendError(
          res,
          400,
          "rental_start and rental_end are required for EMS_RENTAL",
        );
      }

      const startDate = new Date(req.body.rental_start);
      const endDate = new Date(req.body.rental_end);

      if (
        Number.isNaN(startDate.getTime()) ||
        Number.isNaN(endDate.getTime()) ||
        endDate <= startDate
      ) {
        await transaction.rollback();

        return sendError(res, 400, "Invalid rental dates");
      }
    }

    // =================================================
    // PREPARE ORDER ITEMS
    // =================================================

    let subtotal = 0;
    let calculatedTax = 0;

    const orderItems = [];

    for (const item of items) {
      const productId = Number(item.product_id);
      const quantity = Number(item.quantity);
      const itemDiscount = toNumber(item.discount, 0);

      // -------------------------------------------------
      // PRODUCT ID
      // -------------------------------------------------

      if (!Number.isSafeInteger(productId) || productId <= 0) {
        await transaction.rollback();

        return sendError(res, 400, "Each item requires a valid product_id");
      }

      // -------------------------------------------------
      // QUANTITY
      // -------------------------------------------------

      if (!Number.isSafeInteger(quantity) || quantity <= 0) {
        await transaction.rollback();

        return sendError(
          res,
          400,
          "Each item requires a valid positive quantity",
        );
      }

      // -------------------------------------------------
      // ITEM DISCOUNT
      // -------------------------------------------------

      if (!Number.isFinite(itemDiscount) || itemDiscount < 0) {
        await transaction.rollback();

        return sendError(res, 400, "Invalid item discount");
      }

      // =================================================
      // LOAD PRODUCT FROM DATABASE
      //
      // IMPORTANT:
      // Harga, nama, product code dan tax berasal dari DB.
      // Client tidak boleh menentukan harga sendiri.
      // =================================================

      const product = await Products.findByPk(productId, {
        transaction,

        // Lock row supaya stock aman ketika ada
        // transaksi bersamaan.
        lock: transaction.LOCK.UPDATE,
      });

      if (!product) {
        await transaction.rollback();

        return sendError(res, 404, `Product ${productId} not found`);
      }

      // -------------------------------------------------
      // STOCK
      // -------------------------------------------------

      const currentStock = Number(product.stock || 0);

      if (currentStock < quantity) {
        await transaction.rollback();

        return sendError(
          res,
          400,
          `Insufficient stock for product "${product.name}". Available: ${currentStock}`,
        );
      }

      // -------------------------------------------------
      // PRICE FROM DATABASE
      // -------------------------------------------------

      const unitPrice = Number(product.price);

      if (!Number.isFinite(unitPrice) || unitPrice < 0) {
        await transaction.rollback();

        return sendError(
          res,
          500,
          `Invalid price configured for product "${product.name}"`,
        );
      }

      // -------------------------------------------------
      // TAX FROM DATABASE
      // -------------------------------------------------

      const taxPercent = Number(product.tax_percent || 0);

      if (!Number.isFinite(taxPercent) || taxPercent < 0) {
        await transaction.rollback();

        return sendError(
          res,
          500,
          `Invalid tax configuration for product "${product.name}"`,
        );
      }

      // =================================================
      // CALCULATE LINE
      // =================================================

      const lineGross = roundMoney(quantity * unitPrice);

      if (itemDiscount > lineGross) {
        await transaction.rollback();

        return sendError(
          res,
          400,
          `Discount cannot exceed gross amount for product "${product.name}"`,
        );
      }

      const lineSubtotal = roundMoney(lineGross - itemDiscount);

      // Tax dihitung setelah discount item.
      const lineTax = roundMoney(lineSubtotal * (taxPercent / 100));

      subtotal = roundMoney(subtotal + lineSubtotal);

      calculatedTax = roundMoney(calculatedTax + lineTax);

      // =================================================
      // SNAPSHOT ORDER ITEM
      // =================================================

      orderItems.push({
        product_id: product.id,

        // Gunakan UUID product sebagai product code.
        product_code: product.product_id,

        // Snapshot nama saat order dibuat.
        product_name: product.name,

        quantity,

        // Harga resmi dari database.
        unit_price: unitPrice,

        discount: itemDiscount,

        subtotal: lineSubtotal,
      });

      // =================================================
      // REDUCE STOCK
      // =================================================

      product.stock = currentStock - quantity;

      await product.save({
        transaction,
      });
    }

    // =================================================
    // ORDER DISCOUNT
    // =================================================

    const orderDiscount = toNumber(discount, 0);

    if (!Number.isFinite(orderDiscount) || orderDiscount < 0) {
      await transaction.rollback();

      return sendError(res, 400, "Invalid order discount");
    }

    if (orderDiscount > subtotal) {
      await transaction.rollback();

      return sendError(res, 400, "Order discount cannot exceed subtotal");
    }

    // =================================================
    // SHIPPING
    // =================================================

    const orderShipping = toNumber(shipping_cost, 0);

    if (!Number.isFinite(orderShipping) || orderShipping < 0) {
      await transaction.rollback();

      return sendError(res, 400, "Invalid shipping_cost");
    }

    // =================================================
    // GRAND TOTAL
    // =================================================

    const grandTotal = roundMoney(
      subtotal - orderDiscount + calculatedTax + orderShipping,
    );

    if (grandTotal <= 0) {
      await transaction.rollback();

      return sendError(res, 400, "Order grand_total must be greater than zero");
    }

    // =================================================
    // CREATE ORDER
    // =================================================

    const order = await Order.create(
      {
        order_number: generateOrderNumber(),

        // Dari authenticated user jika tersedia.
        user_id: req.user?.id ?? null,

        order_type,

        customer_name,
        customer_phone,
        customer_email,

        subtotal,

        discount: orderDiscount,

        tax: calculatedTax,

        shipping_cost: orderShipping,

        grand_total: grandTotal,

        status: "PENDING",

        notes,
      },
      {
        transaction,
      },
    );

    // =================================================
    // CREATE ORDER ITEMS
    // =================================================

    const itemsWithOrderId = orderItems.map((item) => ({
      ...item,
      order_id: order.id,
    }));

    await OrderItem.bulkCreate(itemsWithOrderId, {
      transaction,
    });

    // =================================================
    // COMMIT
    // =================================================

    await transaction.commit();

    // =================================================
    // LOAD CREATED ORDER
    // =================================================

    const createdOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          as: "items",
        },
      ],
    });

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: createdOrder,
    });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }

    console.error("createOrder error:", error);

    return sendError(res, 500, "Failed to create order");
  }
};

// =====================================================
// GET ALL ORDERS
// GET /api/orders
// =====================================================

export const getOrders = async (req, res) => {
  try {
    const {
      status,
      order_type,
      user_id,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const pageNumber = Math.max(1, parseInt(page, 10) || 1);

    const pageSize = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));

    const offset = (pageNumber - 1) * pageSize;

    const where = {};

    // -------------------------------------------------
    // STATUS FILTER
    // -------------------------------------------------

    if (status) {
      if (!ORDER_STATUSES.includes(status)) {
        return sendError(res, 400, "Invalid order status");
      }

      where.status = status;
    }

    // -------------------------------------------------
    // ORDER TYPE FILTER
    // -------------------------------------------------

    if (order_type) {
      if (!ORDER_TYPES.includes(order_type)) {
        return sendError(res, 400, "Invalid order_type");
      }

      where.order_type = order_type;
    }

    // -------------------------------------------------
    // USER FILTER
    // -------------------------------------------------

    if (user_id) {
      where.user_id = user_id;
    }

    // -------------------------------------------------
    // SEARCH
    // -------------------------------------------------

    if (search) {
      where[Op.or] = [
        {
          order_number: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          customer_name: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          customer_email: {
            [Op.like]: `%${search}%`,
          },
        },
      ];
    }

    // -------------------------------------------------
    // QUERY
    // -------------------------------------------------

    const { count, rows } = await Order.findAndCountAll({
      where,

      include: [
        {
          model: OrderItem,
          as: "items",
        },
      ],

      distinct: true,

      order: [["created_at", "DESC"]],

      limit: pageSize,
      offset,
    });

    return res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",

      data: rows,

      pagination: {
        total: count,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(count / pageSize),
      },
    });
  } catch (error) {
    console.error("getOrders error:", error);

    return sendError(res, 500, "Failed to retrieve orders");
  }
};

// =====================================================
// GET ORDER BY ORDER NUMBER
// GET /api/orders/:orderNumber
// =====================================================

export const getOrderByNumber = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await Order.findOne({
      where: {
        order_number: orderNumber,
      },

      include: [
        {
          model: OrderItem,
          as: "items",
        },
      ],
    });

    if (!order) {
      return sendError(res, 404, "Order not found");
    }

    return res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    console.error("getOrderByNumber error:", error);

    return sendError(res, 500, "Failed to retrieve order");
  }
};

// =====================================================
// UPDATE ORDER STATUS
// PATCH /api/orders/:orderNumber/status
// =====================================================

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const { status } = req.body;

    if (!ORDER_STATUSES.includes(status)) {
      return sendError(res, 400, "Invalid order status");
    }

    const order = await Order.findOne({
      where: {
        order_number: orderNumber,
      },
    });

    if (!order) {
      return sendError(res, 404, "Order not found");
    }

    await order.update({
      status,
    });

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    console.error("updateOrderStatus error:", error);

    return sendError(res, 500, "Failed to update order status");
  }
};

// =====================================================
// CANCEL ORDER
// DELETE /api/orders/:orderNumber
// =====================================================

export const cancelOrder = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await Order.findOne({
      where: {
        order_number: orderNumber,
      },
    });

    if (!order) {
      return sendError(res, 404, "Order not found");
    }

    if (order.status !== "PENDING") {
      return sendError(res, 400, "Only pending orders can be cancelled");
    }

    await order.update({
      status: "CANCELLED",
    });

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    console.error("cancelOrder error:", error);

    return sendError(res, 500, "Failed to cancel order");
  }
};
