import express from "express";
import { createPost, getProducts, updateProduct } from "../controllers/product";
import { body, check, query } from "express-validator";

const router = express.Router();

router.post(
  "/",
  body(["name", "brandName", "upc12Number"]).exists(),
  body("upc12Number").custom((value) => validateUpc12Number(value)),
  createPost
);

router.put(
  "/:productId",
  check("name").custom((value, { req }) => {
    const { name, brandName, upc12Number } = req.body;
    if (!name && !brandName && !upc12Number) {
      throw new Error("Provide some fields for product update");
    }
    if (upc12Number) {
      validateUpc12Number(req.body.upc12Number);
    }
    return true;
  }),
  updateProduct
);

router.get(
  "/",
  query("sortOrder").optional().isIn(["ASC", "DESC"]),
  query("sortBy").optional().isIn(["name", "brand"]),
  query("page").optional().isInt(),
  query("size").optional().isInt(),
  getProducts
);

const validateUpc12Number = (value: any) => {
  if (typeof value !== "number") {
    throw new Error("upc12Number must be a number");
  }
  if (value.toString().length !== 12) {
    throw new Error("upc12Number must be a 12 digit number");
  }
  return true;
};
export default router;
