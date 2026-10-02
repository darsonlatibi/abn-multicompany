import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Orders = db.define(
  "Orders",
  {
    // =====================================================
    // ID
    // =====================================================

    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    // =====================================================
    // ORDER NUMBER
    // =====================================================

    order_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    // =====================================================
    // USER
    // =====================================================

    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },

    // =====================================================
    // ORDER TYPE
    // =====================================================

    order_type: {
      type: DataTypes.ENUM("KOPI", "PRODUCT", "EMS_RENTAL", "EMS_LICENSE"),
      allowNull: false,
      defaultValue: "PRODUCT",
    },

    // =====================================================
    // CUSTOMER
    // =====================================================

    customer_name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    customer_phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    customer_email: {
      type: DataTypes.STRING(150),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },

    // =====================================================
    // TOTAL
    // =====================================================

    subtotal: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },

    discount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },

    tax: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },

    shipping_cost: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },

    grand_total: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },

    // =====================================================
    // ORDER STATUS
    // =====================================================

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "PAID",
        "PROCESSING",
        "COMPLETED",
        "CANCELLED",
        "EXPIRED",
        "REFUNDED",
      ),
      allowNull: false,
      defaultValue: "PENDING",
    },

    // =====================================================
    // NOTES
    // =====================================================

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // =====================================================
    // TIMESTAMP
    // =====================================================

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default Orders;
