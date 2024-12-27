import React, { useState } from "react";
import Navbar from "../Components/Nav/Menu";
import SearchBar from "../Components/Searching/SearchBar";
import ShopFilter from "../Components/Login/Filter";
import TopRightNav from "@/Components/Nav/TopRightNav";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { IoFilterOutline } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import Hamburger from 'hamburger-react'

import Dropdown from '@/Components/Login/Dropdown';

const categories = [
    "All",
    "Agar",
    "Apparel",
    "Books",
    "Equipment",
    "Foraging",
    "Gourmet",
    "Grow Kits",
    "Infused Products",
    "Microscopy",
    "Spawn",
    "Spores"
];

interface ShopProps {
    auth: { user: any } | null; // Assuming 'auth' prop contains user info if logged in
}

const Shop: React.FC<ShopProps> = ({ auth }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState<boolean>(false); // Track dropdown visibility

    const handleSearch = (query: string) => {
        console.log("Search query:", query);
        // Add logic here to search for products
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        console.log("Selected Category:", category);
        // Add logic here to filter products by the selected category
    };

    // Decide layout based on authentication status
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    // Dummy data for products (you can replace this with actual product data)
    const products = [
        { id: 1, name: "Product 1", price: "$10", image: "/assets/images/products/shoes.png" },
        { id: 2, name: "Product 2", price: "$15", image: "/assets/images/products/shoes.png" },
        { id: 3, name: "Product 3", price: "$20", image: "/assets/images/products/shoes.png" },
        { id: 4, name: "Product 4", price: "$25", image: "/assets/images/products/shoes.png" },
        { id: 5, name: "Product 5", price: "$30", image: "/assets/images/products/shoes.png" },
        { id: 6, name: "Product 6", price: "$35", image: "/assets/images/products/shoes.png" }
    ];

    return (
        <Layout
            header={
                <h2 className="text-xl font-semibold leading-tight "> Shop </h2>}
        >
            <Head title="Welcome" />
            
            <div className="mx-auto p-14 w-full h-auto bg-white-50 flex items-start justify-center relative">
                {/* Filter Icon */}
                <div className="absolute top-0 right-20 z-10 flex items-center gap-5 text-white">
                    <div className="flex items-center gap-5">
                        <div
                            className="cursor-pointer flex flex-col items-center justify-center w-20 h-20 rounded-md"
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            <Hamburger size={30} toggled={showFilter} toggle={setShowFilter} />
                            <p>Show filter</p>
                        </div>

                        {/* Sort by Dropdown */}
                        <div
                            className="cursor-pointer flex flex-col items-center justify-center w-20 h-20 rounded-md"
                            onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
                        >
                            <IoIosArrowDropdown className="w-12 h-12 text-white/70 hover:text-white" />
                            <p>Sort by</p>

                            {/* Dropdown Menu */}
                            {showDropdown && (
                                <ul className="absolute top-24 w-56 bg-white  shadow-lg rounded-md border  border-gray-200 z-10">
                                    {["Newest", "Price: Low to High", "Price: High to Low"].map((option, index) => (
                                        <li
                                            key={index}
                                            className="cursor-pointer px-4 py-2 hover:bg-gray-400 text-gray-700"
                                            onClick={() => {
                                                console.log("Sort by option:", option);
                                                setShowDropdown(false); // Close dropdown after selection
                                            }}
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                {/* Filter Sidebar */}
                <div className={`absolute top-0 left-0 bg-white/10 p-5 h-full w-[15%] 
                    transform transition-transform duration-300 
                    ${showFilter ? 'translate-x-0' : '-translate-x-full'}`}>
                    
                    <ul className="space-y-2 font-bold text-white/50 ">
                        {categories.map((category) => (
                            <li
                                key={category}
                                className={`cursor-pointer hover:text-white ${category === selectedCategory ? 'text-blue-500' : ''}`}
                                onClick={() => handleCategorySelect(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Main Content */}
                <div className={`grid grid-cols-3 grid-rows-auto w-full h-auto 
                    rounded-lg
                    p-10 gap-5 [grid-auto-rows:50vh]
                    transition-all duration-300 
                    ${showFilter ? 'ml-64' : ''}`}>
                    {products.map((product) => (
                        <div key={product.id} className="flex flex-col items-center ">
                            <img
                                src={product.image}
                                alt="Product Image"
                                className="w-full h-[90%] object-cover rounded-t-md"
                            />
                            <div className="w-full h-auto bg-white/80 rounded-b-md">
                                <p className="text-center text-sky-400 ">{product.name}</p>
                                <p className="text-center text-lg font-semibold">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Shop;
