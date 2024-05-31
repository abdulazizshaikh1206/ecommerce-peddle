import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { Product } from "../models/product";
import {
  createProduct as createProductHelper,
  updateProduct as updateProductHelper,
} from "../services/product";

interface ProductFormProps {
  product?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  const validationSchema = Yup.object().shape({
    brandName: Yup.string().required("Brand Name is required"),
    name: Yup.string().required("Product Name is required"),
    upc12Number: Yup.string()
      .required("UPC12 Number is required")
      .length(12, "UPC12 Number must be of 12 digit"),
  });

  const { mutate: createProduct, isPending } = useMutation<
    Product,
    Error,
    { name: string; brandName: string; upc12Number: number }
  >({
    mutationFn: ({ name, brandName, upc12Number }) =>
      createProductHelper(name, brandName, upc12Number),
  });

  const { mutate: updateProduct, isPending: isUpdatePending } = useMutation<
    Product,
    Error,
    { id: number; name?: string; brandName?: string; upc12Number?: number }
  >({
    mutationFn: ({ id, name, brandName, upc12Number }) =>
      updateProductHelper(id, name, brandName, upc12Number),
  });

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={
        product
          ? {
              brandName: product.brand,
              name: product.name,
              upc12Number: product.upc12Number,
            }
          : {
              brandName: "",
              name: "",
              upc12Number: "",
            }
      }
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const valuesToSend = { ...values, upc12Number: +values.upc12Number };
        if (product) {
          updateProduct(
            { id: product.id, ...valuesToSend },
            {
              onSuccess() {
                navigate("/products");
              },
            }
          );
        } else {
          createProduct(valuesToSend, {
            onSuccess() {
              navigate("/products");
            },
          });
        }
      }}
    >
      <Form>
        <div className="mb-8">
          <InputField name="brandName" label="Brand Name" />
        </div>
        <div className="mb-8">
          <InputField label="Name" name="name" />
        </div>
        <div className="mb-8">
          <InputField type="number" label="UPC12 Number" name="upc12Number" />
        </div>
        <div className="mt-8 flex justify-center">
          <Button type="submit" className="w-32" variant="contained">
            {isPending || isUpdatePending ? "Loading" : "Save"}
          </Button>
          {product && (
            <div className="ml-6">
              <Button
                onClick={() => navigate("/products")}
                type="submit"
                className="w-32"
                variant="outlined"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </Form>
    </Formik>
  );
};

export default ProductForm;
