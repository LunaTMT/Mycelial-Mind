import React, { useState } from "react";
import Navbar from "../Components/Nav/Menu";
import SearchBar from "../Components/Searching/SearchBar";
import ShopFilter from "../Components/Login/Filter";
import TopRightNav from "@/Components/Nav/TopRightNav";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { IoFilterOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsArrowDownSquare } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Hamburger from 'hamburger-react';
import { Inertia } from '@inertiajs/inertia';

import Dropdown from '@/Components/Login/Dropdown';
import ArrowIcon from "@/Components/Buttons/ArrowIcon";
import { useNav } from '@/Contexts/NavContext';

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
    auth: { user: any } | null;
    items: any[]; // Inertia passes this prop with the fetched items
}

const Shop: React.FC<ShopProps> = ({ auth, items }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    
    const { showNav, scrollDirection } = useNav();

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
    };

    const handleRemoveItem = (itemId: number) => {
        Inertia.delete(`/items/${itemId}`, {
            onSuccess: () => {
                Inertia.visit('/shop');  // Navigate to /shop without forcing a full page reload
            },
            onError: (error) => {
                console.error("Error removing item:", error);
            },
        });
    };
    

    

    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout
            header={
                <div className="h-full w-full overflow-visible flex justify-between items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Shop</h2>

                    <div
                        className={`absolute w-[10vw] h-auto top-[115%]  rounded-md   z-30
                            ${showFilter ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} transition-all duration-300 ease-in-out`}
                    >
                       <ul className="space-y-2 w-full font-medium text-gray-700 dark:text-gray-300 ">
                            {categories.map((category) => (
                                <li
                                    key={category}
                                    className="cursor-pointer px-2 py-1  hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 "
                                    onClick={() => handleCategorySelect(category)}
                                >
                                    {category}
    
                                </li>
                            ))}
                        </ul>

                    </div>


                    {/* Head buttons right side */}
                    <div className="flex items-center gap-4">
                        {/* Show Filter */}
                        <div
                            className="cursor-pointer flex items-center justify-center gap-2 rounded-md"
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            <p className="text-slate-700 hover:text-black dark:text-slate-300 dark:text-white/70 dark:hover:text-white">Filter</p>
                            <Hamburger size={20} toggled={showFilter} toggle={setShowFilter} />
                        </div>

                        {/* Sort by Dropdown */}
                        <div
                            className="cursor-pointer flex items-center justify-center gap-2 rounded-md relative group"
                            onClick={() => setShowDropdown(!showDropdown)} 
                        >
                            <p className="text-slate-700 hover:text-black dark:text-slate-300 dark:text-white/70 dark:hover:text-white">
                                Sort
                            </p>
                            <ArrowIcon w="30" h="30" isOpen={showDropdown} />
                            <ul
                                className={`absolute right-0 top-14 w-[250%] bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-600 z-50 
                                    transform transition-all duration-300 ease-in-out ${showDropdown ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"}`}
                            >
                                {["Newest", "Price: Low to High", "Price: High to Low"].map((option, index, array) => (
                                    <li
                                        key={index}
                                        className={`cursor-pointer px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 
                                            ${index === 0 ? "rounded-t-md" : ""} 
                                            ${index === array.length - 1 ? "rounded-b-md" : ""}`}
                                        onClick={() => {
                                            console.log("Sort by option:", option);
                                            setShowDropdown(false);
                                        }}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Add Item Button */}
                        {auth?.user?.role === 'admin' && (
                            <Link href={route('item.add')}>
                                <div className="cursor-pointer flex items-center justify-center gap-2 rounded-md relative group">
                                    <p className="text-slate-700 hover:text-black
                                          dark:text-slate-300  dark:text-white/70 dark:hover:text-white">Add</p>
                                    <IoIosAddCircleOutline
                                        className="cursor-pointer w-8 h-8 rounded-md text-black dark:text-white"
                                    />
                                </div>
                            </Link>
                        )}
                    </div>

                </div>
            }
        >
            <Head title="Shop" />
            {/* Main Content */}
            <div className={`grid grid-cols-3 gap-6 rounded-lg  transition-all duration-300  ${showFilter ? 'ml-48' : ''}`}>
                {items.map((product) => {
                    const images = JSON.parse(product.images);

                    return (
                        <div key={product.id} className="relative flex flex-col items-start justify-start  dark:bg-gray-800  rounded-md">
                            {/* Red Cross */}
                            {auth?.user?.role === 'admin' && (
                                <button
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    onClick={() => handleRemoveItem(product.id)}
                                >
                                    <AiOutlineClose size={20} />
                                </button>
                            )}

                            {/* Product Image */}
                            <Link href={route('item', { id: product.id })}>
                                <img
                                     src={`/${images[0]}`}
                                    alt="Product Image"
                                    className="w-full object-cover rounded-t-md"
                                />
                                <div className="w-full h-auto flex flex-col items-start p-2 bg-white dark:bg-slate-700/75 rounded-b-md">
                                    <p className="text-center text-gray-700 dark:text-gray-300 italic">{product.category}</p>
                                    <p className="text-center text-gray-800 dark:text-white">{product.name}</p>
                                    <p className="text-center text-lg text-gray-900 dark:text-gray-200 font-semibold">{product.price}</p>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
};

export default Shop;
