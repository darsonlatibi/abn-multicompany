import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OrderItem = sequelize.define(
  "order_items",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    order_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    product_code: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    product_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },

    unit_price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },

    discount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },

    subtotal: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
  },
  {
    tableName: "order_items",
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default OrderItem;
