import { Request, Response } from "express";
import { ILike } from "typeorm";
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

export const updateProduct = async (req: Request, res: Response, next: any) => {
  try {
    const validationRes = validationResult(req);
    if (!validationRes.isEmpty()) {
      return res.status(400).json({ errors: validationRes.array() });
    }

    const { productId } = req.params;

    let product = await Product.findOne({ where: { id: +productId } });
    if (!product) {
      return res
        .status(404)
        .json({ message: `product with id ${productId} not found` });
    }

    const { name, brandName, upc12Number } = req.body;
    if (name) {
      product.name = name;
    }
    if (brandName) {
      product.brand = brandName;
    }
    if (upc12Number) {
      product.upc12Number = upc12Number;
    }
    product = await product.save();

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getProducts = async (req: Request, res: Response, next: any) => {
  try {
    const validationRes = validationResult(req);
    if (!validationRes.isEmpty()) {
      return res.status(400).json({ errors: validationRes.array() });
    }

    const { sortBy = "name", sortOrder = "ASC", searchKey = "" } = req.query;
    let page = 1;
    let size = 10;
    if (req.query.page) {
      page = +req.query.page;
    }
    if (req.query.size) {
      size = +req.query.size;
    }
    const [products, totalCount] = await Product.findAndCount({
      where: [
        { name: ILike(`%${searchKey}%`) },
        { brand: ILike(`%${searchKey}%`) },
      ],
      order: {
        [sortBy as string]: sortOrder as "ASC" | "DESC",
      },
      take: size,
      skip: (page - 1) * size,
    });
    res.status(200).json({
      products,
      total: totalCount,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getProduct = async (req: Request, res: Response, next: any) => {
  try {
    const validationRes = validationResult(req);
    if (!validationRes.isEmpty()) {
      return res.status(400).json({ errors: validationRes.array() });
    }

    const { productId } = req.params;
    const product = await Product.findOne({
      where: {
        id: +(productId as string),
      },
    });
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with id ${productId} not found` });
    }
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
