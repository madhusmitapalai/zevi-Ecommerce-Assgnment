import React from "react";
import Home from "./Components/Home/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Products from "./Components/Products/Products";
import Items from "./Components/Products/Items";
import NotFoundPage from "./Components/NodataFound/NoDataFound";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/items" element={<Items />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
