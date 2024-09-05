import './src/styles/global.css'
import React from 'react';
import { CartProvider } from './src/context/cartContext'; // Adjust the import path

export const wrapRootElement = ({ element }) => {
 
  return <CartProvider>{element}</CartProvider>;
};
