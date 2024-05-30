import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/db";

import productRouter from "./routes/product";

dotenv.config();

const main = async () => {
  const app = express();

  await AppDataSource.initialize();

  app.use(express.json());

  app.use("/products", productRouter);

  const port = process.env.PORT;

  app.listen(port, () => console.log(`Server started on port ${port}`));
};

main();
