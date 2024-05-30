import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Product } from "../entities/product";

export const createPost = async (req: Request, res: Response, next: any) => {
  try {
    const validationRes = validationResult(req);
    if (!validationRes.isEmpty()) {
      return res.status(400).json({ errors: validationRes.array() });
    }

    const { name, brandName, upc12Number } = req.body;
    let product = new Product();
    product.name = name;
    product.brand = brandName;
    product.upc12Number = upc12Number;

    product = await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
