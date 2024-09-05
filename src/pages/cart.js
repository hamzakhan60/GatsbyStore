import React from 'react'; 
import { useEffect, useState } from 'react';
import { useCart } from '../context/cartContext';
import { getCart } from '../utils/shopifyCart';

export default function CartPage() {
    const { cart } = useCart();
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(()=>{
        fetchCartData();
    },[cart])
    

    const fetchCartData = async () => {
        if (cart && cart.id) {
            try {
                console.log('Fetching cart:', cart);
                const cartData = await getCart(cart.id);
                console.log('Cart data:', cartData);

                // Ensure the cart data structure matches expectations
                if (cartData?.lines?.edges?.length) {
                    const items = cartData.lines.edges;
                    console.log('Cart items:', items);
                    setCartItems(items);

                    // Calculate total amount
                    const total = items.reduce((sum, { node }) => {
                        const price = parseFloat(node.merchandise.price.amount);
                        const quantity = node.quantity || 0;
                        return sum + price * quantity;
                    }, 0);

                    setTotalAmount(total);
                } else {
                    console.error('Invalid cart data:', cartData);
                    setCartItems([]);
                    setTotalAmount(0);
                }
            } catch (error) {
                console.error('Failed to fetch cart data:', error);
                setCartItems([]);
                setTotalAmount(0);
            }
        }
    };


    const handleCheckout = () => {
        console.log('Proceeding to checkout...');
        console.log(cart.checkoutUrl);
        window.open(cart.checkoutUrl);
        // Add checkout logic here
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map(({ node }) => (
                        <div key={node.id} className="flex items-center p-4 border rounded-lg shadow-sm bg-white">
                            <img
                                src={node.merchandise.images?.edges[0]?.node?.src || 'default-image-url'}
                                alt={node.merchandise.title}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="ml-4 flex-1">
                                <h2 className="text-lg font-semibold">{node.merchandise.title}</h2>
                                <p className="text-gray-700">Quantity: {node.quantity}</p>
                                <p className="text-gray-700">Price: ${node.merchandise.price.amount}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold">
                                    ${(parseFloat(node.merchandise.price.amount) * node.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="mt-6 p-4 bg-gray-100 border rounded-lg">
                        <h2 className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</h2>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
}
