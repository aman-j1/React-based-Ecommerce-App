import React from "react";
import Header from "./Components/Header";
import Products from "./Components/Products/Products";
import { Routes, Route } from "react-router";
import Home from "./Page/Home";
import Cart from "./Page/Cart";
import Wishlist from "./Page/Wishlist";
import ProductDetail from "./Components/Products/ProductDetails";
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/wishlist" element={<Wishlist />}/>
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
};

export default App;
