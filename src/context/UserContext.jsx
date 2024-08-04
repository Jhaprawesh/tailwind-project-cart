// UserContext.js
import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [nav, setNav] = useState();

  return (
    <UserContext.Provider
      value={{
        nav,
        setNav,
        cart,
        setCart,
        searchQuery,
        setSearchQuery,
        price,
        setPrice,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
