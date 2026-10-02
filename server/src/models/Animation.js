// server/src/models/Animation.js

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Animation = sequelize.define(
  "Animation",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    slug: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    file_path: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.0,
    },

    currency: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      defaultValue: "USD",
    },

    whop_product_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    whop_plan_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    purchase_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("DRAFT", "ACTIVE", "INACTIVE"),
      allowNull: false,
      defaultValue: "DRAFT",
    },
  },
  {
    tableName: "animations",
    timestamps: true,
    underscored: true,
  },
);

export default Animation;
