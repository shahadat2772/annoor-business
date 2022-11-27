import React, { createContext } from "react";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.init";

export const AnnoorContext = createContext();

const AnnoorContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    let newCart = [];
    if (exists) {
      newCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      const item = { ...product, quantity: 1 };
      newCart = [...cart, item];
    }
    setCart(newCart);
  };

  const removeFromCart = (product) => {
    const item = cart.find((item) => item.id === product.id);
    if (!item) {
      return;
    }
    let newCart = [];
    if (item.quantity > 1) {
      newCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    } else {
      newCart = cart.filter((item) => item.id !== product.id);
    }
    setCart(newCart);
  };

  const deleteFromCart = (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
  };

  const handleSignOut = () => {
    signOut(auth);
    window.localStorage.removeItem("accessToken");
  };

  return (
    <AnnoorContext.Provider
      value={{
        setCart,
        cart,
        addToCart,
        removeFromCart,
        deleteFromCart,
        handleSignOut,
      }}
    >
      {children}
    </AnnoorContext.Provider>
  );
};

export default AnnoorContextProvider;
