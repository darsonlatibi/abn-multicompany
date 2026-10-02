import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import path from "node:path";
import { fileURLToPath } from "node:url";

/* =========================================================
   ABN WEBSITE
   DATABASE CONFIGURATION
   ========================================================= */

/* =========================================================
   LOAD ENV
   ========================================================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../../.env");

dotenv.config({
  path: envPath,
});

/* =========================================================
   CONFIG
   ========================================================= */

const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_PORT = Number(process.env.DB_PORT || 3306);
const DB_NAME = process.env.DB_NAME || "abn_website";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";

/* =========================================================
   DEBUG CONFIG
   ========================================================= */

console.log("==============================================");
console.log(" DATABASE CONFIG");
console.log("==============================================");
console.log(` ENV FILE : ${envPath}`);
console.log(` DB HOST  : ${DB_HOST}`);
console.log(` DB PORT  : ${DB_PORT}`);
console.log(` DB NAME  : ${DB_NAME}`);
console.log(` DB USER  : ${DB_USER}`);
console.log(` DB PASS  : ${DB_PASSWORD ? "SET" : "EMPTY"}`);
console.log("==============================================");

/* =========================================================
   SEQUELIZE
   ========================================================= */

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false,
});

/* =========================================================
   EXPORTS
   ========================================================= */

/*
 * Named export
 *
 * Digunakan oleh:
 * import { sequelize } from "../config/database.js";
 */
export { sequelize };

/*
 * Default export
 *
 * Digunakan oleh model seperti:
 * import db from "../config/database.js";
 */
export default sequelize;

/* =========================================================
   DATABASE CONNECTION
   ========================================================= */

export async function connectDatabase() {
  try {
    await sequelize.authenticate();

    console.log("==============================================");
    console.log(" DATABASE");
    console.log("==============================================");
    console.log(` HOST    : ${DB_HOST}`);
    console.log(` PORT    : ${DB_PORT}`);
    console.log(` DATABASE: ${DB_NAME}`);
    console.log(" STATUS  : CONNECTED");
    console.log("==============================================");
  } catch (error) {
    console.error("==============================================");
    console.error(" DATABASE CONNECTION ERROR");
    console.error("==============================================");
    console.error(error.message);
    console.error("==============================================");

    throw error;
  }
}
