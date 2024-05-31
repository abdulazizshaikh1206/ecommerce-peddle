import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import InputField from "../components/InputField";
import { createProduct as createProductHelper } from "../services/product";
import { Product } from "../models/product";
import { useNavigate } from "react-router-dom";

interface ProductFormProps {}

const ProductForm: React.FC<ProductFormProps> = () => {
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
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        brandName: "",
        name: "",
        upc12Number: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        createProduct(
          { ...values, upc12Number: +values.upc12Number },
          {
            onSuccess() {
              navigate("/products");
            },
          }
        );
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
        <div className="mt-8 text-center">
          <Button type="submit" className="w-32" variant="contained">
            {isPending ? "Loading" : "Save"}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default ProductForm;
