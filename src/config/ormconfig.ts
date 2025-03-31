import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const extension = process.env.NODE_ENV == "production" ? "js" : "ts";
const isTestEnv = process.env.NODE_ENV === "test";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, `../entities/*.${extension}`)],
  migrations: [path.join(__dirname, `../migrations/*.${extension}`)],
  synchronize: false,
  logging: !isTestEnv,
});
