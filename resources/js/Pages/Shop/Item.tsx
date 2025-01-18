import React, { useState } from "react";
import { Head } from '@inertiajs/react';
import { useCart, CartItem } from "@/Contexts/CartContext"; // Import the cart context

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';

interface ItemProps {
    auth: { user: any } | null;
    item: { 
        id: number;
        name: string;
        price: string;
        stock: number;
        number_of_images: number;
        category: string;
        images: string;
    };
}

const Item: React.FC<ItemProps> = ({ auth, item }) => {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;
    const { addToCart } = useCart();
    
    const [selectedImage, setSelectedImage] = useState<string>(item.images ? JSON.parse(item.images)[0] : "");
    const [quantity, setQuantity] = useState<number>(1); // Add state for quantity
    const images = JSON.parse(item.images);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            id: item.id,
            name: item.name,
            price: parseFloat(item.price),  // Convert price to number here as well
            quantity: quantity,
            total: parseFloat(item.price) * quantity,  // Calculate total based on quantity
            image: selectedImage,  // Use the selected image directly
        };
        addToCart(newItem);  // Add the item to the cart and trigger scaling
    };



    return (
        <Layout header={
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{`${item.category} - ${item.name}`}</h2>
        }>
            <Head title={`${item.category}/${item.name}`} />
            <div className="relative w-full h-[78vh] p-5 flex justify-center items-center bg-white/10 dark:bg-gray-800  rounded-lg space-x-2 shadow-sm ">
               
                <div className="w-[10%] h-full flex flex-col space-y-1 rounded-md dark:bg-gray-700 overflow-hidden">
                    {images.map((src: string, index: number) => (
                        <img
                            key={index}
                            src={`/${src}`}
                            alt={item.name}
                            className={`cursor-pointer rounded-lg h-1/6 object-cover transition duration-300 ease-in-out ${
                                selectedImage === src ? 'bg-black/15 brightness-75 border border-black' : 'hover:bg-black/20 dark:hover:bg-white/30'
                            }`}
                            onMouseEnter={() => setSelectedImage(src)} // Set the image when hovered
                        />
                    ))}
                </div>


                <div className="w-[60%] h-full">
                    {selectedImage && (
                        <img
                            src={`/${selectedImage}`} 
                            alt="Selected"
                            className="rounded-lg shadow-lg w-full h-full object-cover"
                        />
                    )}
                </div>

                <div className="w-[30%] h-full flex flex-col space-y-6 bg-white p-6 rounded-lg shadow-lg dark:bg-gray-700 dark:text-white">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{item.name}</h2>
                        <p className="text-3xl font-semibold text-black dark:text-gray-200">${item.price}</p>
                        <p className="text-xl font-medium text-black dark:text-gray-300">In Stock: {item.stock}</p>



                        <button
                            onClick={handleAddToCart}
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-transform transform hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Item;
