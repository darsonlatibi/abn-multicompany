import { DataTypes } from "sequelize";

import db from "../config/database.js";

/* =========================================================
   ABN FLEET SYSTEM
   EMAIL RECIPIENT MODEL
   ========================================================= */

const EmailRecipient = db.define(
  "email_recipients",
  {
    /* =====================================================
       ID
       ===================================================== */

    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    /* =====================================================
       EMAIL
       ===================================================== */

    emailId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: "email_id",
    },

    /* =====================================================
       RECIPIENT
       ===================================================== */

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    /* =====================================================
       TYPE
       ===================================================== */

    type: {
      type: DataTypes.ENUM("TO", "CC", "BCC"),
      allowNull: false,
      defaultValue: "TO",
    },

    /* =====================================================
       DELIVERY STATUS
       ===================================================== */

    status: {
      type: DataTypes.ENUM("PENDING", "SENT", "DELIVERED", "FAILED"),
      allowNull: false,
      defaultValue: "PENDING",
    },

    /* =====================================================
       CREATED / UPDATED
       ===================================================== */

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    tableName: "email_recipients",

    timestamps: true,

    indexes: [
      {
        fields: ["email_id"],
      },

      {
        fields: ["email"],
      },

      {
        fields: ["type"],
      },

      {
        fields: ["status"],
      },
    ],
  },
);

export default EmailRecipient;
