import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Swal from "sweetalert2";

import { useCart, CartItem } from "@/Contexts/CartContext";
import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import Counter from "@/Components/Buttons/Counter";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import ArrowIcon from "@/Components/Buttons/ArrowIcon";
import { Inertia } from "@inertiajs/inertia";

const categories = [
    "All", "Agar", "Apparel", "Books", "Equipment", "Foraging", "Gourmet",
    "Grow Kits", "Infused Products", "Microscopy", "Spawn", "Spores",
];

interface CartProps {
    auth: { user: any } | null;
}

const Cart: React.FC<CartProps> = ({ auth }) => {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    const { cart, removeFromCart, updateQuantity } = useCart();
    const [showPromoCodeDropdown, setShowPromoCodeDropdown] = useState(false);
    const [promoCode, setPromoCode] = useState("");

    const handleRemove = (id: number) => {
        removeFromCart(id);
    };

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        updateQuantity(productId, newQuantity);
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            Swal.fire("Error", "Your cart is empty.", "error");
            return;
        }
    
        Inertia.post(
            route("checkout.process"),
            {
                cart: JSON.stringify(cart),
                promoCode,
            },
            {
                onSuccess: (response) => {
                    const { url } = response.props; // Check if `url` exists and is a string
                    console.log(url);
                    if (typeof url === 'string' && url) {
                        // Redirect the user to the Stripe checkout page
                        window.location.href = url;
                    } else {
                        Swal.fire("Error", "Unexpected response from server.", "error");
                    }
                },
                onError: (errors) => {
                    Swal.fire("Error", errors.message || "Failed to checkout.", "error");
                },
            }
        );
    };
    
    
    
    

    const calculateSubtotal = () => {
        return cart.reduce((sum, product) => sum + product.total, 0).toFixed(2);
    };

    const estimatedDeliveryHandling = 5.0;
    const calculateTotal = () => {
        return (parseFloat(calculateSubtotal()) + estimatedDeliveryHandling).toFixed(2);
    };

    const renderCartItem = (product: CartItem) => (
        <div
            key={product.id}
            className="flex flex-row justify-start w-full h-full rounded-lg p-4 gap-3 dark:bg-slate-700/75"
        >
            <img
                src={`/${product.image}`}
                alt={product.name}
                className="w-40 aspect-square object-cover rounded-md"
            />
            <div className="flex w-full flex-col justify-between">
                <div className="grid grid-cols-2 w-full h-auto p-1">
                    <div>
                        <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                            {product.name}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-400">info</p>
                    </div>
                    <p className="font-semibold text-right text-lg text-gray-800 dark:text-gray-200">
                        ${product.total.toFixed(2)}
                    </p>
                </div>

                <div className="w-36">
                    <Counter
                        quantity={product.quantity}
                        onQuantityChange={(newQuantity) =>
                            handleQuantityChange(product.id, newQuantity)
                        }
                        onRemove={() => handleRemove(product.id)}
                    />
                </div>
            </div>
        </div>
    );

    const renderCartSummary = () => (
        <div className="w-[35%] h-full max-w-7xl p-5 rounded-lg shadow-lg bg-white dark:bg-slate-700/75">
            <h1 className="text-2xl font-extrabold text-black dark:text-white mb-6">Summary</h1>
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Subtotal
                </span>
                <span className="text-sm font-bold text-black dark:text-white">
                    ${calculateSubtotal()}
                </span>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Estimated Delivery & Handling
                </span>
                <span className="text-sm font-bold text-black dark:text-white">
                    ${estimatedDeliveryHandling.toFixed(2)}
                </span>
            </div>

            <div className="relative mb-4">
                <button
                    onClick={() => setShowPromoCodeDropdown(!showPromoCodeDropdown)}
                    className="w-full text-sm text-left font-semibold text-gray-800 dark:text-gray-200 flex justify-between items-center"
                >
                    Apply Promotion Code
                    <ArrowIcon w="24" h="24" isOpen={showPromoCodeDropdown} />
                </button>
                <div
                    className={`relative top-0 left-0 flex gap-3 bg-white/10 shadow-md p-4 rounded-md mt-2 overflow-hidden transition-all duration-500 ease-in-out ${
                        showPromoCodeDropdown ? "max-h-[300px] opacity-100 mb-10" : "max-h-0 opacity-0 mb-0"
                    }`}
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
                                title: "Promo Code Applied!",
                                icon: "success",
                                confirmButtonText: "OK",
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

            <PrimaryButton className="w-full" onClick={() => { console.log("Clicked checkout"); handleCheckout(); }}>
                Checkout
            </PrimaryButton>
        </div>
    );

    return (
        <Layout
            header={
                <h2 className="text-xl font-semibold leading-tight flex items-center h-auto w-full text-gray-800 dark:text-white">
                    Cart
                </h2>
            }
        >
            <Head title="Cart" />
            <div className="min-h-[85vh] w-full p-5 flex gap-5 justify-center items-start dark:bg-slate-700/20 rounded-lg shadow-lg dark:shadow-xl">
                <div className="w-[65%] flex flex-col gap-5">
                    {cart.length ? (
                        cart.map(renderCartItem)
                    ) : (
                        <div className="flex flex-row justify-center  min-h-[80vh] rounded-lg p-4 gap-3 dark:bg-slate-700/75 text-lg font-extrabold text-gray-800 dark:text-gray-200">
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
