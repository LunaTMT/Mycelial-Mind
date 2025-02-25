import React, { useState } from "react";

import { useCart, CartItem } from "@/Contexts/CartContext";
import { useDarkMode } from "@/Contexts/DarkModeContext";

import { Head, router } from "@inertiajs/react";

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import Breadcrumb from "@/Components/Nav/Breadcrumb";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ItemProps {
    auth: { user: any } | null;
    item: { 
        id: number;
        name: string;
        price: string;
        stock: number;
        category: string;
        images: string;
        description: string;
    };
}

const Item: React.FC<ItemProps> = ({ auth, item }) => {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;
    const { addToCart } = useCart();
    const { darkMode } = useDarkMode();

    const [selectedImage, setSelectedImage] = useState<string>(JSON.parse(item.images)[0]);
    const [quantity, setQuantity] = useState<number>(1);
    const [currentStock, setCurrentStock] = useState<number>(item.stock);
    const images = JSON.parse(item.images);

    const handleAddToCart = () => {
        if (currentStock >= quantity) {
            const newItem = {
                id: item.id,
                name: item.name,
                price: parseFloat(item.price),
                quantity,
                total: parseFloat(item.price) * quantity,
                image: selectedImage,
            };
    
            addToCart(newItem);
    
            setCurrentStock(prevStock => prevStock - quantity); // Reduce stock
            setQuantity(prev => Math.min(prev, currentStock - quantity)); // Ensure quantity never exceeds stock
    
            router.post(route('item.update', { id: item.id }), { stock: currentStock - quantity }, 
            {
                onSuccess: () => {
                    toast.success(`${quantity} x ${item.name} added to cart!`);
                },
                onError: () => {
                    setCurrentStock(prevStock => prevStock + quantity); // Rollback stock if request fails
                    toast.error("Failed to update stock. Please try again.");
                }
            });
    
        } else {
            toast.error("Not enough stock available.");
        }
    };
    
    
    return (
        <Layout header={
            <div className="h-[6vh] w-full flex justify-between items-center gap-4">
                <Breadcrumb 
                    items={[
                        { label: "SHOP", link: route('shop') },
                        { label: item.category, link: route('shop', { category: item.category }) },
                        { label: item.name },
                    ]}
                />
            </div> 
        }>
            <Head title={`${item.category}/${item.name}`} />

            <div className="relative w-full h-[78vh] p-5 flex justify-center items-center rounded-lg mx-auto max-w-7xl sm:px-6 lg:px-8 space-x-4">
                {/* Image Gallery */}
                <div className="w-[10%] h-full flex flex-col space-y-2 rounded-md overflow-hidden dark:bg-gray-700/30">
                    {images.map((src: string, index: number) => (
                        <img
                            key={index}
                            src={`/${src}`}
                            alt={item.name}
                            className={`cursor-pointer rounded-lg h-1/6 object-cover transition duration-300 ${
                                selectedImage === src ? 'bg-black/15 brightness-75 border border-black' : 'hover:bg-black/20 dark:hover:bg-white/30'
                            }`}
                            onMouseEnter={() => setSelectedImage(src)}
                        />
                    ))}
                </div>

                {/* Main Image */}
                <div className="w-[60%] h-full dark:bg-gray-700/30">
                    <img src={`/${selectedImage}`} alt="Selected" className="rounded-lg w-full h-full object-cover" />
                </div>

                {/* Product Info */}
                <div className="w-[30%] h-full flex flex-col items-center justify-start gap-5 p-6 rounded-lg font-Poppins dark:bg-gray-700/30 dark:text-white">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{item.name}</h2>
                    <p className="text-xl font-medium text-black dark:text-gray-300">{item.description}</p>

                    {/* Quantity Selector */}
                    <div className="flex flex-col gap-2 items-center">
                        <div className="flex">
                            <button 
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                className="px-3 py-2 text-black font-bold"
                            >
                                -
                            </button>
                            <p className="w-12 text-center py-2">
                                {Math.min(quantity, currentStock)} {/* Ensure it never displays more than stock */}
                            </p>
                            <button 
                                onClick={() => setQuantity(prev => Math.min(currentStock, prev + 1))}
                                className="px-3 py-2 text-black font-bold"
                                disabled={quantity >= currentStock}
                            >
                                +
                            </button>
                        </div>

                        {/* Price & Stock */}
                        <p className="text-3xl font-semibold text-black dark:text-gray-200">
                            £{(parseFloat(item.price) * Math.min(quantity, currentStock)).toFixed(2)}
                        </p>
                        <p className="text-md text-gray-500 dark:text-gray-400">
                            {currentStock} in stock
                        </p>
                    </div>


                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={currentStock === 0}
                        className={`w-full py-3 text-black font-semibold rounded-full transition-all duration-500 
                            ${currentStock > 0 ? 'bg-yellow-400 hover:scale-105 hover:shadow-[0_0_5px_#FFD700,0_0_15px_#FFD700]' 
                            : 'bg-gray-400 text-white cursor-not-allowed'}
                        `}
                    >
                        {currentStock > 0 ? "Add to Cart" : "Out of Stock"}
                    </button>
                </div>
            </div>

            {/* Toast Notifications */}
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick={false}
                pauseOnHover
                draggable
                theme={darkMode ? "dark" : "light"}
                style={{ zIndex: 9999 }}
            />
        </Layout>
    );
};

export default Item;
