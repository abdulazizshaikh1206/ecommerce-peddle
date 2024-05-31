import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
