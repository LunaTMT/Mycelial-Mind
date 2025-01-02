import React, { useState } from "react";

import { Head, Link } from '@inertiajs/react';
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";

import Hamburger from 'hamburger-react';
import Dropdown from '@/Components/Login/Dropdown';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';

import { useCart } from "@/Contexts/CartContext"; // Import the cart context

interface ItemProps {
    auth: { user: any } | null; // Assuming 'auth' prop contains user info if logged in
}

const Item: React.FC<ItemProps> = ({ auth }) => {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;
    const { addToCart } = useCart(); // Get the addToCart function from context

    // Mock data for the images
    const images = [
        "assets/images/products/shoes-blue.png",
        "assets/images/products/shoes-grey.png",
        "assets/images/products/shoes.png",
    ];

    const [selectedImage, setSelectedImage] = useState(images[0]);

    const handleAddToCart = () => {
        const newItem = {
            id: 1, // Ensure this ID is unique for each product
            name: "Product Name",
            quantity: 1,
            image: selectedImage,
            price: 49.99,
            total: 49.99, // Calculate the total price (price * quantity)
        };
        addToCart(newItem); // Add item to the cart context
    };

    return (
        <Layout header={<h2 className="text-xl font-semibold leading-tight">Item</h2>}>
            <Head title="Item" />
            {/* Main Content */}
            <div className="relative w-full h-[78vh] p-5 flex justify-center items-start bg-white/10 rounded-lg space-x-2 shadow-sm">
                {/* Left Photo Carousel (10% width) */}
                <div className="w-auto h-full flex flex-col space-y-1">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className={`cursor-pointer rounded-lg w-20 aspect-square object-cover ${
                                selectedImage === image ? "bg-black/15 brightness-75 border border-black" : ""
                            }`}
                            onMouseEnter={() => setSelectedImage(image)}
                        />
                    ))}
                </div>

                {/* Center Photo (80% width) */}
                <div className="w-auto h-full object-cover">
                    <img
                        src={selectedImage}
                        alt="Selected"
                        className="rounded-lg shadow-lg w-full h-full"
                    />
                </div>

                {/* Product Info and Add to Cart Button */}
                <div className="w-[30%] h-full flex flex-col space-y-6 bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-800">Product Name</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Discover the features and benefits of this amazing product. A detailed description goes here to entice customers.
                    </p>
                    <p className="text-3xl font-semibold text-black">$49.99</p>
                    <button
                        onClick={handleAddToCart} // Trigger the add to cart action
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-transform transform hover:scale-105"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Item;
