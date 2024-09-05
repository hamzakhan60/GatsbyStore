// CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { createCart } from '../utils/shopifyCart';

// Create the Cart Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const initializeCart = async () => {
      try {
        // Check if a cart already exists; create a new one only if necessary
        if (!cart) {
          const newCart = await createCart();
          console.log('New cart created:', newCart.id);
          setCart(newCart);
        }
      } catch (error) {
        console.error('Error initializing cart:', error);
      }
    };

    // Call initializeCart once when the component mounts
    initializeCart();
  }, [cart]); // Empty dependency array ensures this effect runs only once

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};


// Custom Hook to use Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

