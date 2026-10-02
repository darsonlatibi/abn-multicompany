import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const WhopEvent = sequelize.define(
  "WhopEvent",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    event_id: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },

    event_type: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    processed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    payload: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    processed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "whop_events",
    timestamps: true,
  },
);

export default WhopEvent;
