import { sortOrder } from "../types";

const baseUrl = import.meta.env.VITE_API_BACKEND_URL;

export const getProducts = async (
  page: number,
  size: number,
  searchKey: string = "",
  sortOrder: sortOrder = "ASC",
  sortBy: "name" | "brand" = "name"
) => {
  try {
    const res = await fetch(
      `${baseUrl}/products?searchKey=${searchKey}&sortOrder=${sortOrder}&sortBy=${sortBy}&page=${page}&size=${size}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const createProduct = async (
  name: string,
  brandName: string,
  upc12Number: number
) => {
  try {
    const res = await fetch(`${baseUrl}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name,
        brandName,
        upc12Number,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
};
