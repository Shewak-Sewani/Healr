import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (drug) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex(
        (item) =>
          item.openfda?.brand_name?.[0] === drug.openfda?.brand_name?.[0]
      );

      if (index > -1) {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[index];
        const newQuantity = existingItem.quantity + 1;
        const basePrice = existingItem.basePrice || drug.price;

        updatedCart[index] = {
          ...existingItem,
          quantity: newQuantity,
          price: basePrice * newQuantity,
          basePrice,
        };

        return updatedCart;
      } else {
        return [
          ...prevCart,
          {
            ...drug,
            quantity: 1,
            price: drug.price,
            basePrice: drug.price,
          },
        ];
      }
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart.splice(index, 1);
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
