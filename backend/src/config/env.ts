import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGODB_URI || "",
  frontendOrigin: process.env.FRONTEND_ORIGIN || "",
};
