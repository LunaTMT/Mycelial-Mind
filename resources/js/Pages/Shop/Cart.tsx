import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Swal from 'sweetalert2';

import { useCart } from "@/Contexts/CartContext";  // Import the context
import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import Counter from "@/Components/Buttons/Counter";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import ArrowIcon from "@/Components/Buttons/ArrowIcon";

const categories = [
    "All", "Agar", "Apparel", "Books", "Equipment", "Foraging", "Gourmet",
    "Grow Kits", "Infused Products", "Microscopy", "Spawn", "Spores",
];

interface CartProps {
    auth: { user: any } | null;
}

const Cart: React.FC<CartProps> = ({ auth }) => {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;
    
    const { cart, removeFromCart, updateQuantity } = useCart(); // Access cart context

    const [showPromoCodeDropdown, setShowPromoCodeDropdown] = useState(false);
    const [promoCode, setPromoCode] = useState("");


    const handleRemove = (id: number) => {
        removeFromCart(id); // Use removeFromCart from context
    };

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        updateQuantity(productId, newQuantity); // Use updateQuantity from context
    };

    const calculateSubtotal = () => cart.reduce((sum, product) => sum + product.total, 0);
    const estimatedDeliveryHandling = 5.0;
    const calculateTotal = () => calculateSubtotal() + estimatedDeliveryHandling;

    const renderCartItem = (product: any) => (
        <div key={product.id} className="flex flex-row justify-start w-full h-full mb-4 p-2 ">
            <div className="flex flex-col items-center justify-between">
                <img src={product.image} alt={product.name} className="w-40 aspect-square object-cover rounded-md mb-2" />
                <Counter
                    quantity={product.quantity}
                    onQuantityChange={(newQuantity) => handleQuantityChange(product.id, newQuantity)}
                    onRemove={() => handleRemove(product.id)}
                />
            </div>
            <div className="grid grid-cols-2 w-full h-full p-1">
                <div>
                    <h2 className="font-semibold text-gray-800 dark:text-gray-200">{product.name}</h2>
                    <p className="text-gray-700 dark:text-gray-400">info</p>
                </div>
                <div className="text-right">
                    <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">${product.total}</p>
                </div>
            </div>
        </div>
    );

    const renderCartSummary = () => (
        <div className="w-auto h-full max-w-7xl p-5 rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <h1 className="text-2xl font-extrabold text-black dark:text-white mb-6">Summary</h1>
            {["Subtotal", "Estimated Delivery & Handling"].map((label, index) => (
                <div key={index} className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{label}</span>
                    <span className="text-sm font-bold text-black dark:text-white">
                        {index === 0 ? `$${calculateSubtotal()}` : `$${estimatedDeliveryHandling}`}
                    </span>
                </div>
            ))}

            {/* Promo Code Dropdown */}
            <div className="relative mb-4">
                <button
                    onClick={() => setShowPromoCodeDropdown(!showPromoCodeDropdown)}
                    className="w-full text-sm text-left font-semibold text-gray-800 dark:text-gray-200 flex justify-between items-center"
                >
                    Apply Promotion Code
                    <ArrowIcon w="24" h="24" isOpen={showPromoCodeDropdown} />
                </button>

                {/* Promo Code Input Dropdown */}
                <div
                    className={`relative top-0 left-0 flex gap-3  bg-white/10 shadow-md p-4 rounded-md mt-2 overflow-hidden transition-all duration-500 ease-in-out
                    ${showPromoCodeDropdown ? "max-h-[300px] opacity-100 mb-10" : "max-h-0 opacity-0 mb-0"}`}
                >
                    <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                        className="w-[70%] px-3 py-2 border border-gray-300 rounded-md h-[40px] dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                    />
                    <button
                        onClick={() => {
                            Swal.fire({
                                title: 'Promo Code Applied!',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            });
                        }}
                        className="w-[40%] h-[40px] text-sm px-3 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Apply Code
                    </button>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-extrabold text-gray-800 dark:text-gray-200">Total</span>
                <span className="text-lg font-extrabold text-black dark:text-white">${calculateTotal()}</span>
            </div>

            <PrimaryButton className="w-full">Checkout</PrimaryButton>
        </div>
    );

    return (
        <Layout header={<h2 className="text-xl font-semibold leading-tight flex items-center h-auto w-full text-gray-800 dark:text-white">Cart</h2>}>
            <Head title="Cart" />
            <div className="relative w-full min-h-[78vh] rounded-lg flex justify-center items-start bg-white/10 gap-5">
                <div className="w-[80%] h-auto p-7 shadow-md ">
                    {cart.length ? (
                        cart.map(renderCartItem)
                    ) : (
                        <div className="text-center text-gray-500 dark:text-gray-400 mt-10 shadow-md p-2 w-1/3 mx-auto">
                            Your cart is empty.
                        </div>
                    )}
                </div>
                {renderCartSummary()}
            </div>
        </Layout>
    );
};

export default Cart;
