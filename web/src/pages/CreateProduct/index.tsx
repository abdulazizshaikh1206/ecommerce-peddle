import React from "react";

import ProductForm from "../../components/ProductForm";

interface CreateProductProps {}

const CreateProduct: React.FC<CreateProductProps> = () => {
  return (
    <div>
      <h1 className="text-2xl mt-4">Create New Product</h1>
      <div className="mt-8 max-w-[40rem] mx-auto">
        <ProductForm />
      </div>
    </div>
  );
};

export default CreateProduct;
