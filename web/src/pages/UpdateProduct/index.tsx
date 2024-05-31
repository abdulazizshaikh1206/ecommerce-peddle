import React from "react";
import ProductForm from "../../components/ProductForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/product";
import { Product } from "../../models/product";

interface UpdateProductProps {}

const UpdateProduct: React.FC<UpdateProductProps> = () => {
  const { productId } = useParams();

  const { data } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => getProduct(+(productId as string)),
  });

  return (
    <div>
      <h1 className="text-2xl mt-4">Update Product</h1>
      <div className="mt-8 max-w-[40rem] mx-auto">
        {data ? <ProductForm product={data} /> : null}
      </div>
    </div>
  );
};

export default UpdateProduct;
