import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 5300;
const HOST = process.env.HOST || "0.0.0.0";

const server = app.listen(PORT, HOST, () => {
  console.log("");
  console.log("==========================================");
  console.log(" ABN MultiCompany Server");
  console.log("==========================================");
  console.log(` API    : http://localhost:${PORT}`);
  console.log(` Health : http://localhost:${PORT}/api/health`);
  console.log(` Host   : ${HOST}`);
  console.log(` Env    : ${process.env.NODE_ENV || "development"}`);
  console.log("==========================================");
  console.log("");
});

server.on("error", (error) => {
  console.error("Server error:", error);
});
