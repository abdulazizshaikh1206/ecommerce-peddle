import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import CreateProduct from "./pages/CreateProduct";
import ProductList from "./pages/ProductList";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<CreateProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
