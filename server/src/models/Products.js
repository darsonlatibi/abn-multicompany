import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Products = sequelize.define(
  "products",
  {
    // =====================================================
    // PRIMARY KEY — INTERNAL DATABASE ID
    // =====================================================
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // =====================================================
    // BUSINESS PRODUCT ID — GLOBAL IDENTIFIER
    // =====================================================
    product_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },

    // =====================================================
    // OWNER / SELLER ID
    // =====================================================
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // =====================================================
    // PRODUCT NAME
    // =====================================================
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // =====================================================
    // DESCRIPTION
    // =====================================================
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // =====================================================
    // PRICE
    // =====================================================
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // =====================================================
    // STOCK
    // =====================================================
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    // =====================================================
    // IMAGE
    // =====================================================
    image: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    // =====================================================
    // CATEGORY
    // =====================================================
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    // =====================================================
    // SOURCE
    // internal / tokopedia / shopee / scada
    // =====================================================
    source: {
      type: DataTypes.STRING(50),
      defaultValue: "internal",
    },

    // =====================================================
    // TAX
    // =====================================================
    tax_percent: {
      type: DataTypes.INTEGER,
      defaultValue: 11,
    },
  },
  {
    tableName: "products",
    freezeTableName: true,
    timestamps: true,
  },
);

export default Products;
