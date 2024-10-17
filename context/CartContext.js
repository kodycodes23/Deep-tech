import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeItemFromCart = (id) => {
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
