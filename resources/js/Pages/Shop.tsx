import React, { useState } from "react";
import Navbar from "../Components/Nav/Menu";
import SearchBar from "../Components/Searching/SearchBar";
import ShopFilter from "../Components/Login/Filter";
import TopRightNav from "@/Components/Nav/TopRightNav";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { IoFilterOutline } from "react-icons/io5";

import { Select, Option } from "@material-tailwind/react";
import { IoIosAddCircleOutline } from "react-icons/io";

import { BsArrowDownSquare } from "react-icons/bs";
import Hamburger from 'hamburger-react';

import Dropdown from '@/Components/Login/Dropdown';
import ArrowIcon from "@/Components/Buttons/ArrowIcon";

import { useNav } from '@/Contexts/NavContext'

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
}

const Shop: React.FC<ShopProps> = ({ auth }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const { showNav, scrollDirection } = useNav(); 

    const handleSearch = (query: string) => {
        console.log("Search query:", query);
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        console.log("Selected Category:", category);
    };

    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    const products = [
        { id: 1, category: "Footwear", name: "Air Force 1", price: "$10", image: "/assets/images/products/air_force_1.png", rating: 4.5 },
        { id: 2, category: "Apparel", name: "Vapor MAx 2023", price: "$15", image: "/assets/images/products/AIR_VAPORMAX_2023_FK.png", rating: 4.0 },
        { id: 3, category: "Accessories", name: "Product Name", price: "$20", image: "/assets/images/products/air_max_dn.png", rating: 4.8 },
        { id: 4, category: "Footwear", name: "Product Name", price: "$25", image: "/assets/images/products/NIKE_AIR_MAX_PLUS.png", rating: 3.9 },
        { id: 5, category: "Apparel", name: "Product Name", price: "$30", image: "/assets/images/products/nike_zoom.png", rating: 4.3 },
        { id: 6, category: "Accessories", name: "Product Name", price: "$35", image: "/assets/images/products/air_max_dn.png", rating: 5.0 },
    ];

    return (
        <Layout
            header={
                <div className="h-full w-full overflow-visible flex justify-between items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Shop
                    </h2>


                    <div className="absolute top-[120%] w-full  z-50 h-[100vh] bg-white  dark:bg-slate-800 -translate-x-full"></div>    
                    
                    <div
                        className={`absolute h-full top-[120%] dark:shadow-none 
                            ${showFilter ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>

                            <div className="sticky  w-auto dark:bg-slate-800">
                                <ul className="space-y-2 w-full font-bold text-gray-700 dark:text-gray-300">
                                    {categories.map((category) => (
                                        <li
                                            key={category}
                                            className={`cursor-pointer hover:translate-x-2 transform transition-transform duration-300 ${
                                                category === selectedCategory ? 'text-black dark:text-white underline underline-offset-4' : ''
                                            }`}
                                            onClick={() => handleCategorySelect(category)}
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>



                    <div className="flex items-center gap-4 ">
                        {/* Show Filter */}
                        <div
                            className="cursor-pointer flex items-center justify-center gap-2 rounded-md"
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            <p className="text-slate-700 hover:text-black
                                          dark:text-slate-300  dark:text-white/70 dark:hover:text-white">Filter</p>
                            <Hamburger size={20} toggled={showFilter} toggle={setShowFilter} />
                        </div>

                        {/* Sort by Dropdown */}
                        <div
                            className="cursor-pointer flex items-center justify-center gap-2 rounded-md relative group"
                            onClick={() => setShowDropdown(!showDropdown)} 
                        >
                            <p className="text-slate-700 hover:text-black
                                          dark:text-slate-300  dark:text-white/70 dark:hover:text-white">Sort</p>
                            <ArrowIcon w="30" h="30" isOpen={showDropdown} />
                            <ul
                                className={`absolute right-0 top-14 w-[250%] bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-600 z-50 
                                    transform transition-all duration-300 ease-in-out ${showDropdown ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"}`}
                            >
                                {["Newest", "Price: Low to High", "Price: High to Low"].map((option, index) => (
                                    <li
                                        key={index}
                                        className="cursor-pointer px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
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

                        {/* Plus Button (Visible only for admin) */}
                        {auth?.user?.role === 'admin' && (
                            <Link href={route('cart')}>
                                <div className="cursor-pointer flex items-center justify-center gap-2 rounded-md relative group">
                                    <p className="text-slate-700 hover:text-black
                                          dark:text-slate-300  dark:text-white/70 dark:hover:text-white">Add</p>
                                    <IoIosAddCircleOutline
                                        className="cursor-pointer w-8 h-8 rounded-md text-black dark:text-white"
                                        onClick={() => {route('login')}}
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
            <div className={`grid grid-cols-3 gap-6 bg-red-400rounded-lg w-auto transition-all duration-300  bg-white dark:bg-gray-900/10 ${showFilter ? 'ml-40' : ''}`}>
                {products.map((product) => (
                    <Link href={route('item', { id: product.id })} key={product.id}>
                        <div className="flex flex-col items-start justify-start bg-white dark:bg-gray-800 rounded-md">
                            <img
                                src={product.image}
                                alt="Product Image"
                                className="w-full object-cover rounded-t-md"
                            />
                            <div className="w-full h-auto flex flex-col items-start p-2 bg-white dark:bg-slate-700/75 rounded-b-md">
                                <p className="text-center text-gray-700 dark:text-gray-300 italic">{product.category}</p>
                                <p className="text-center text-gray-800 dark:text-white">{product.name}</p>
                                <p className="text-center text-lg text-gray-900 dark:text-gray-200 font-semibold">{product.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </Layout>
    );
};

export default Shop;
