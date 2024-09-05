import React from 'react';
import {  addToCart,getCart } from '../utils/shopifyCart';
import { useCart } from '../context/cartContext';
// ProductCard component accepts a product prop to display individual product details
export function ProductCard( product ) {
  const { cart } = useCart();
  
  console.log({product});
  const { 
    title, 
    description, 
    price, 
    imageUrl, 
    availableForSale,
    variantId
  } = product.product;


  
  const handleAddToCart = async () => {
    if (cart) {
      console.log(cart);
     
      const updatedCart = await addToCart(cart.id, variantId, 1); // Add 1 item to the cart
      console.log(updatedCart);
      getCart(cart.id)
    .then(carta => {
      console.log('Cart details:', carta);
    })
    .catch(error => {
      console.error('Failed to load cart:', error);
    });
    }
  };

  return (
    <div className="max-w-sm border border-red-700 rounded overflow-hidden shadow-lg bg-white m-4">
      <img
        className="w-full h-56 object-cover"
        src={imageUrl}
        alt={title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <p className={`text-lg mt-2 ${availableForSale ? 'text-green-500' : 'text-red-500'}`}>
          {availableForSale ? 'In Stock' : 'Out of Stock'}
        </p>
        <p className="text-lg font-semibold mt-4">{price}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button 
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${!availableForSale && 'opacity-50 cursor-not-allowed'}`}
          disabled={!availableForSale}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
