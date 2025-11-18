import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcom } from '../Context/EcomProvider';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
const CartPage = () => {

    const { cart, updateQuantity, removeItem, clearCart, user, isBusy } = useEcom();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [candidate, setCandidate] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmClearOpen, setConfirmClearOpen] = useState(false);
    const [isClearing, setIsClearing] = useState(false);
    const navigate = useNavigate();

    const openClearConfirm = () => setConfirmClearOpen(true);
    const closeClearConfirm = () => setConfirmClearOpen(false);

    const handleClearConfirmYes = async () => {
        try {
            setIsClearing(true);
            await clearCart();
            setConfirmClearOpen(false);
        } catch (err) {
            console.error('Clear cart failed', err);

        } finally {
            setIsClearing(false);
        }
    };

    useEffect(() => {
        if (!confirmOpen) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setConfirmOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [confirmOpen]);

    const openConfirm = (item) => {
        setCandidate(item);
        setConfirmOpen(true);
    };

    const handleConfirmYes = async () => {
        if (!candidate) return;
        try {
            setIsDeleting(true);
            await removeItem(candidate._id);
            setConfirmOpen(false);
            setCandidate(null);
        } catch (err) {
            console.error('Delete failed', err);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleConfirmNo = () => {
        setConfirmOpen(false);
        setCandidate(null);
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <Header />
            <main className="flex-grow container mb-15 mt-20 mx-auto p-8">

                <h2 className="text-3xl font-bold text-center mb-8">Shopping Cart</h2>
                {cart.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-600">Your cart is empty.</p>
                        <button onClick={() => navigate('/')} className="mt-4 bg-stone-800 text-amber-100 font-medium py-2 px-6 rounded-full hover:bg-stone-700 transition-colors">
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map(item => (
                                <div key={item._id} className="flex flex-col sm:flex-row items-start bg-white p-4 rounded-xl shadow-sm">

                                    <div className="w-4/5 sm:w-24 h-48 sm:h-24 flex-shrink-0 mr-8 sm:mr-4 mx-auto sm:mx-0">
                                        <img
                                            src={
                                                item.image ||
                                                `https://placehold.co/600x600/a855f7/ffffff?text=${encodeURIComponent(item.name || "Product")}`
                                            }
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>
                                    <div className="flex-1 w-full mt-3 sm:mt-0 text-center sm:text-left">
                                        <h3 className="font-semibold text-base sm:text-lg leading-snug">{item.name}</h3>
                                        <p className="text-gray-500 hidden sm:block mt-2">₹{item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="hidden sm:flex items-center space-x-2 ml-3">
                                        <button
                                            onClick={() => { if (item.quantity > 1) updateQuantity(item._id, -1); }}
                                            disabled={Number(item.quantity) <= 1}
                                            title={Number(item.quantity) <= 1 ? "Minimum quantity reached. Use Remove to delete." : "Decrease quantity"}
                                            className={`w-8 h-8 rounded-full transition-all ${Number(item.quantity) <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                            aria-label={Number(item.quantity) <= 1 ? "Minimum quantity" : "Decrease quantity"}
                                        >
                                            -
                                        </button>
                                        <span className="font-bold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, 1)}
                                            title="Increase quantity"
                                            className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>

                                        <button
                                            onClick={() => openConfirm(item)}
                                            className="ml-4 text-red-500 hover:text-red-700"
                                            aria-label={`Remove ${item.name} from cart`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex sm:hidden w-full items-center justify-between mt-3">
                                        <div className="font-semibold text-gray-800">₹{item.price.toFixed(2)}</div>

                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => { if (item.quantity > 1) updateQuantity(item._id, -1); }}
                                                disabled={Number(item.quantity) <= 1}
                                                title={Number(item.quantity) <= 1 ? "Minimum quantity reached. Use Remove to delete." : "Decrease quantity"}
                                                className={`w-8 h-8 rounded-full transition-all ${Number(item.quantity) <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                                aria-label={Number(item.quantity) <= 1 ? "Minimum quantity" : "Decrease quantity"}
                                            >
                                                -
                                            </button>
                                            <span className="font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item._id, 1)}
                                                title="Increase quantity"
                                                className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => openConfirm(item)}
                                            className="text-red-500 hover:text-red-700 p-1"
                                            aria-label={`Remove ${item.name} from cart`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}

                        </div>

                        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit">
                            <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
                            <div className="space-y-2 text-gray-700">
                                {cart.map(item => (
                                    <div key={item._id} className="flex justify-between">
                                        <span>{item.name} x{item.quantity}</span>
                                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center text-lg font-bold">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                            <div className="mt-6 flex flex-col space-y-4">
                                <button
                                    onClick={() => { user ? navigate('/checkout') : navigate('/login') }}
                                    disabled={isBusy && isBusy('checkout')}
                                    className={`w-full font-bold py-3 px-4 rounded-full transition-colors ${(isBusy && isBusy('checkout')) ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : 'bg-stone-800 text-amber-100 hover:bg-stone-700'}`}
                                >
                                    {(isBusy && isBusy('checkout')) ? 'Processing…' : 'Proceed to Checkout'}
                                </button>

                                <button
                                    onClick={openClearConfirm}
                                    disabled={cart.length === 0}
                                    className={`w-full font-bold py-3 px-4 rounded-full transition-colors ${cart.length === 0 ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'
                                        }`}
                                >
                                    Clear Cart
                                </button>

                            </div>
                        </div>
                    </div>
                )}
                {confirmOpen && candidate && (
                    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/50" onClick={handleConfirmNo} />
                        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 z-10">
                            <div className="flex items-start gap-4">
                                <img src={candidate.image || `https://placehold.co/120x120/a855f7/ffffff?text=${encodeURIComponent(candidate.name)}`} alt={candidate.name} className="w-24 h-24 object-cover rounded-md" />
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold">{candidate.name}</h3>
                                    <p className="text-sm text-gray-600 mt-2">Are you sure you want to remove this product from your cart?</p>
                                    <div className="mt-4 flex gap-3">
                                        <button
                                            onClick={handleConfirmYes}
                                            disabled={isDeleting}
                                            className={`px-4 py-2 rounded-full font-semibold ${isDeleting ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'}`}
                                            aria-label="Confirm remove"
                                        >
                                            {isDeleting ? 'Removing...' : 'Yes, remove'}
                                        </button>
                                        <button
                                            onClick={handleConfirmNo}
                                            disabled={isDeleting}
                                            className="px-4 py-2 rounded-full border font-semibold"
                                            aria-label="Cancel remove"
                                        >
                                            No, keep it
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleConfirmNo} aria-label="Close" className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">✖</button>
                        </div>
                    </div>
                )}
                {confirmClearOpen && (
                    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/50" onClick={closeClearConfirm} />
                        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 z-10">
                            <div className="flex flex-col gap-4">
                                <h3 className="text-lg font-bold">Clear cart?</h3>
                                <p className="text-sm text-gray-600">
                                    This will remove <strong>{cart.length} item{cart.length !== 1 ? 's' : ''}</strong> from your cart
                                    {cart.length > 0 && <> (Total: ₹{cart.reduce((s, it) => s + it.price * it.quantity, 0).toFixed(2)})</>}.
                                </p>
                                <div className="flex gap-3 flex-col">
                                    {cart.slice(0, 3).map(it => (
                                        <div key={it._id || it.productId} className="flex gap-4 border border-green-200 rounded-lg p-2">
                                            <img
                                                src={it.image || `https://placehold.co/80x80/a855f7/ffffff?text=${encodeURIComponent(it.name)}`}
                                                alt={it.name}
                                                className="w-16 h-16 object-cover rounded-md border"
                                            />
                                            <span className="text-sm">
                                                {it.name} <br /> Total Qty : {it.quantity}
                                            </span>
                                        </div>
                                    ))}

                                    {cart.length > 3 && <div className="flex items-center justify-center w-16 h-16 rounded-md border text-sm text-gray-600">+{cart.length - 3}</div>}
                                </div>

                                <div className="mt-4 flex gap-3">
                                    <button
                                        onClick={handleClearConfirmYes}
                                        disabled={isClearing}
                                        className={`px-4 py-2 rounded-full font-semibold ${isClearing ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'}`}
                                    >
                                        {isClearing ? 'Clearing...' : 'Yes, clear cart'}
                                    </button>
                                    <button
                                        onClick={closeClearConfirm}
                                        disabled={isClearing}
                                        className="px-4 py-2 rounded-full border font-semibold"
                                    >
                                        No, keep items
                                    </button>
                                </div>
                            </div>
                            <button onClick={closeClearConfirm} aria-label="Close" className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">✖</button>
                        </div>
                    </div>
                )}


            </main>
                
           { !cart.length==0 && <Footer/>}
        </>
    );
};

export default CartPage
