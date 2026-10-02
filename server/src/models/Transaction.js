import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    // =====================================================
    // ABN ORDER
    // =====================================================

    order_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    // =====================================================
    // MIDTRANS
    // =====================================================

    transaction_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },

    transaction_status: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "pending",
    },

    fraud_status: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    payment_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    status_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },

    status_message: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    // =====================================================
    // PAYMENT
    // =====================================================

    gross_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },

    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "IDR",
    },

    // =====================================================
    // CUSTOMER
    // =====================================================

    customer_name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    customer_email: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    customer_phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    // =====================================================
    // MIDTRANS TIME
    // =====================================================

    transaction_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    settlement_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    expiry_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    // =====================================================
    // PAYMENT CHANNEL
    // =====================================================

    bank: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    va_number: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    approval_code: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    masked_card: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    // =====================================================
    // MIDTRANS REFERENCE
    // =====================================================

    signature_key: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },

    // =====================================================
    // ABN INTERNAL
    // =====================================================

    status: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "PENDING",
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "transactions",
    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",

    indexes: [
      {
        unique: true,
        fields: ["order_id"],
      },
      {
        fields: ["transaction_status"],
      },
      {
        fields: ["payment_type"],
      },
      {
        fields: ["status"],
      },
      {
        fields: ["customer_email"],
      },
      {
        fields: ["created_at"],
      },
    ],
  },
);

export default Transaction;
