import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Cart from "../components/Cart";
import SignUp from "../components/SignUp";
import ProductDetails from "../components/ProductDetails";
import Login from "../components/Login";
import CardDetails from "../components/CardDetails";
import Confirmation from "../components/Confirmation";

function NewRouts() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/payment" element={<CardDetails />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/items/:itemId" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default NewRouts;
