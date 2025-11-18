import React from 'react'
import { useState } from 'react';
import { useEcom } from '../Context/EcomProvider';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const CheckoutPage = () => {
    const { cart,handleCheckout, isBusy } = useEcom();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const handlePlaceOrder = async (event) => {
        event.preventDefault();
        setIsPlacingOrder(true);
        try {
           
            await handleCheckout({}); 
            setOrderPlaced(true);
            setIsPlacingOrder(false);
        } catch (err) {
            console.error('Place order failed', err);
            setIsPlacingOrder(false);
        }
    };

    if (orderPlaced) {
        return (
            <main className="flex-grow container mx-auto p-8 flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
                    <p className="text-gray-700">Thank you for your purchase. You'll be redirected to the home page shortly.</p>
                </div>
            </main>
        );
    }

    return (
        <>
        <Header/>
        <main className="flex-grow container mt-15 mx-auto p-4 sm:p-6 lg:p-8">
          
            <h2 className="text-3xl font-bold text-center mb-8">Checkout</h2>
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                    {cart.map(item => (
                        <div key={item._id} className="flex justify-between items-center py-2 border-b">
                            <span>{item.name} x{item.quantity}</span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between items-center py-2 text-xl font-bold mt-4">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
                    <form className="space-y-4">
                        <input className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700" type="text" required placeholder="FullName" />
                        <input className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700" type="text" required placeholder="Address Line 1" />
                        <input className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700" type="text" required placeholder="City, State, ZIP" />
                    </form>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Payment Details</h3>
                    <form className="space-y-4">
                        <input className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700" type="text" disabled placeholder="Card Number" />
                        <div className="flex space-x-4">
                            <input className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700" type="text" disabled placeholder="MM/YY" />
                            <input className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700" type="text" disabled placeholder="CVV" />
                        </div>
                    </form>
                </div>

                <button
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder || (isBusy && isBusy('checkout'))}
                    className="w-full bg-stone-800 text-amber-100 font-bold py-3 px-4 rounded-full hover:bg-stone-700 transition-colors disabled:opacity-50"
                >
                    {isPlacingOrder || (isBusy && isBusy('checkout')) ? 'Placing Order...' : 'Place Order'}
                </button>
            </div>
        </main>
        <Footer/> </>
    );
};

export default CheckoutPage
