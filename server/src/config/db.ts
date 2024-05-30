import { DataSource } from "typeorm";
import { __prod__ } from "../constants";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: +(process.env.DB_PORT as string),
  database: process.env.DB_NAME,
  synchronize: false,
  logging: !__prod__,
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],
});
