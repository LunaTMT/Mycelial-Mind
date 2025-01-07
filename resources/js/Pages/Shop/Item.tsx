import React, { useState } from "react";
import { Head } from '@inertiajs/react';
import { useCart } from "@/Contexts/CartContext"; // Import the cart context

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';

interface ItemProps {
    auth: { user: any } | null;
    item: { 
        id: number;
        name: string;
        price: number;
        stock: number;
        number_of_images: number;
        category: string;
    };
}

const Item: React.FC<ItemProps> = ({ auth, item }) => {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;
    const { addToCart } = useCart();

    const [selectedImage, setSelectedImage] = useState<number>(0);

    if (!item) {
        return <div>Loading...</div>; // Or return an error state
    }

    console.log(item);
    const { number_of_images, name, price, id } = item;

    const handleAddToCart = (item: { id: number; name: string; price: number }) => {
        const newItem = {
            ...item,
            quantity: 1,
            total: item.price,
            image: `${selectedImage}.png`, // Convert the index to a string like "1.jpg"
        };
        addToCart(newItem);
    };

    const renderImageElements = () => {
        const images = [];
        for (let i = 0; i < number_of_images; i++) {
            images.push(
                <img
                    key={i}
                    src={`/assets/images/products/${id}/${i}.png`}
                    alt={name}
                    className={`cursor-pointer rounded-lg w-20 aspect-square object-cover transition duration-300 ease-in-out ${
                        selectedImage === i ? 'bg-black/15 brightness-75 border border-black' : 'hover:bg-black/20 dark:hover:bg-white/30'
                    }`}
                    onMouseEnter={() => setSelectedImage(i)}
                />
            );
        }
        return images;
    };

    return (
        <Layout header={<h2 className="text-xl font-semibold leading-tight text-gray-900 dark:text-white">Items</h2>}>
            <Head title="Items" />
            <div className="relative w-full h-[78vh] p-5 flex justify-center items-start bg-white/10 dark:bg-gray-800 rounded-lg space-x-2 shadow-sm">
                <div className="w-auto h-full flex flex-col space-y-1">
                    {renderImageElements()}
                </div>
                <div className="w-auto h-full object-cover">
                    <img
                        src={`/assets/images/products/${id}/${selectedImage}.png`}
                        alt="Selected"
                        className="rounded-lg shadow-lg w-full h-full"
                    />
                </div>
                <div className="w-[30%] h-full flex flex-col space-y-6 bg-white p-6 rounded-lg shadow-lg dark:bg-gray-700 dark:text-white">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{name}</h3>
                        <p className="text-3xl font-semibold text-black dark:text-gray-200">${price}</p>
                        <button
                            onClick={() => handleAddToCart(item)}
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
