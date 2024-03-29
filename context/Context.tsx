"use client";
import useCart from "@/hooks/useCart";
import React, { ReactNode, createContext } from "react";

interface ContextType {
  cart: any;
  handleAddToCart: any;
  setCart: any;
  handleRremovedItemFromCart: any;
  handleQuantityIncrementDecrement: any;
}

export const cart = createContext<ContextType>({
  cart: null,
  handleAddToCart: null,
  setCart: null,
  handleRremovedItemFromCart: null,
  handleQuantityIncrementDecrement: null,
});
const Context = ({ children }: { children: ReactNode }) => {
  const carContext = useCart();
  return (
    <div>
      <cart.Provider value={carContext}>{children}</cart.Provider>
    </div>
  );
};

export default Context;
