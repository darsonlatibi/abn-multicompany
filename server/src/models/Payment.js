import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Payment = db.define(
  "Payment",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    // =====================================================
    // ORDER
    // =====================================================

    order_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    payment_number: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    // =====================================================
    // PAYMENT PROVIDER
    // =====================================================

    provider: {
      type: DataTypes.ENUM("MIDTRANS"),
      allowNull: false,
      defaultValue: "MIDTRANS",
    },

    payment_method: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },

    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "IDR",
    },

    // =====================================================
    // PAYMENT STATUS
    // =====================================================

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "PAID",
        "FAILED",
        "EXPIRED",
        "CANCELLED",
        "REFUNDED",
      ),
      allowNull: false,
      defaultValue: "PENDING",
    },

    // =====================================================
    // MIDTRANS
    // =====================================================

    midtrans_order_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    midtrans_transaction_id: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    midtrans_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    midtrans_transaction_status: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    midtrans_payment_type: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    midtrans_fraud_status: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    midtrans_status_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    midtrans_status_message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    midtrans_signature_key: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },

    midtrans_transaction_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    midtrans_settlement_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    // =====================================================
    // RAW MIDTRANS RESPONSE
    // =====================================================

    raw_response: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    // =====================================================
    // TIMESTAMPS
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
    tableName: "payments",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default Payment;
