import pkg from "pg";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true" ? {
    rejectUnauthorized: true,
     ca: process.env.DB_CA_FILE
} : false
});

