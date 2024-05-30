import express from "express";
import { createPost } from "../controllers/product";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  body(["name", "brand_name", "upc12_number"]).exists(),
  body("upc12_number").custom((value) => {
    if (typeof value !== "number") {
      throw new Error("upc12_number must be a number");
    }
    if (value.toString().length !== 12) {
      throw new Error("upc12_number must be a 12 digit number");
    }
    return true;
  }),
  createPost
);

export default router;
