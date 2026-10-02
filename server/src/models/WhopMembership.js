import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const WhopMembership = sequelize.define(
  "WhopMembership",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    membership_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },

    whop_user_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    company_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    product_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    plan_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "ACTIVE",
    },

    access_granted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    activated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    deactivated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    raw_data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "whop_memberships",
    timestamps: true,
  },
);

export default WhopMembership;
