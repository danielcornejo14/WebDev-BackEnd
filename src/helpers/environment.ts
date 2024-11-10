import { configDotenv } from "dotenv";

configDotenv();

export const environment = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: new TextEncoder().encode(process.env.JWT_SECRET!),
};