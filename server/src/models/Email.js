import { DataTypes } from "sequelize";

import db from "../config/database.js";
/* =========================================================
   ABN FLEET SYSTEM
   EMAIL MODEL
   ========================================================= */

const Email = db.define(
  "emails",
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
       SENDER
       ===================================================== */

    fromEmail: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: "from_email",
    },

    fromName: {
      type: DataTypes.STRING(150),
      allowNull: true,
      field: "from_name",
    },

    /* =====================================================
       SUBJECT
       ===================================================== */

    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
    },

    /* =====================================================
       MESSAGE
       ===================================================== */

    body: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      defaultValue: "",
    },

    preview: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    /* =====================================================
       FOLDER
       ===================================================== */

    folder: {
      type: DataTypes.ENUM("INBOX", "SENT", "DRAFT", "ARCHIVE", "TRASH"),
      allowNull: false,
      defaultValue: "INBOX",
    },

    /* =====================================================
       STATUS
       ===================================================== */

    status: {
      type: DataTypes.ENUM("DRAFT", "QUEUED", "SENDING", "SENT", "FAILED"),
      allowNull: false,
      defaultValue: "SENT",
    },

    /* =====================================================
       READ
       ===================================================== */

    unread: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    /* =====================================================
       STAR
       ===================================================== */

    starred: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    /* =====================================================
       REPLY / THREAD
       ===================================================== */

    parentId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      field: "parent_id",
    },

    threadId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      field: "thread_id",
    },

    /* =====================================================
       MESSAGE ID
       Untuk tracking email SMTP/provider
       ===================================================== */

    messageId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
      field: "message_id",
    },

    /* =====================================================
       SENT TIME
       ===================================================== */

    sentAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "sent_at",
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
    tableName: "emails",

    timestamps: true,

    indexes: [
      {
        fields: ["folder"],
      },

      {
        fields: ["status"],
      },

      {
        fields: ["from_email"],
      },

      {
        fields: ["unread"],
      },

      {
        fields: ["starred"],
      },

      {
        fields: ["thread_id"],
      },

      {
        fields: ["created_at"],
      },
    ],
  },
);

export default Email;
