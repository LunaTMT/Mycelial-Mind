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

    import { BsArrowDownSquare } from "react-icons/bs";
    import Hamburger from 'hamburger-react'

    import Dropdown from '@/Components/Login/Dropdown';
    import ArrowIcon from "@/Components/Buttons/ArrowIcon";

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
            { id: 1, category: "Footwear", name: "Air Force 1", price: "$10", image: "/assets/images/products/air_force_1.png", rating: 4.5 },
            { id: 2, category: "Apparel", name: "Vapor MAx 2023", price: "$15", image: "/assets/images/products/AIR_VAPORMAX_2023_FK.png", rating: 4.0 },
            { id: 3, category: "Accessories", name: "Product Name", price: "$20", image: "/assets/images/products/NIKE_P_6000.png", rating: 4.8 },
            { id: 4, category: "Footwear", name: "Product Name", price: "$25", image: "/assets/images/products/NIKE_AIR_MAX_PLUS.png", rating: 3.9 },
            { id: 5, category: "Apparel", name: "Product Name", price: "$30", image: "/assets/images/products/nike_zoom.png", rating: 4.3 },
            { id: 6, category: "Accessories", name: "Product Name", price: "$35", image: "/assets/images/products/air_max_dn.png", rating: 5.0 },

        ];
        
        


        return (
            <Layout
                header={
                    <div className="h-full w-full overflow-visible grid grid-rows-1 grid-cols-4 ">
                        
        
                        <h2 className="text-xl font-semibold leading-tight flex items-center h-full w-full">
                        Shop
                        </h2>

                        {/* header div */}
                        <div className="grid grid-rows-1 grid-cols-2  text-black col-start-5">
    
                            {/* Show Filter */}
                            <div
                                className="cursor-pointer flex flex-grow items-center justify-center  rounded-md"
                                onClick={() => setShowFilter(!showFilter)}
                            >
                                <p className="text-right">Filter</p>
                                <Hamburger size={25} toggled={showFilter} toggle={setShowFilter} />
                            </div>

                            {/* Sort by Dropdown */}
                            <div
                                className="cursor-pointer flex items-center justify-center gap-2 rounded-md relative group"
                                onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
                            >
                                <p>Sort</p>
                                <ArrowIcon w="30" h="30" isOpen={showDropdown} />

                                {/* Dropdown Menu */}
                                <ul
                                    className={`absolute right-0 top-14 w-[200%] bg-white shadow-lg rounded-md border border-gray-200 z-50 
                                        transform transition-all duration-300 ease-in-out ${
                                        showDropdown ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
                                    }`} // Add transition classes for smooth slide down
                                >
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
                            </div>


                        </div>
                    </div>

        
                    }
            >
                <Head title="Shop" />
                    
                
                        
                <div className={`absolute h-full top-0 shadow-lg 
                    ${showFilter ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 ease-in-out`}>

                    <div className={`sticky top-0 left-0   pt-16  w-auto   `}>
                        <ul className="space-y-2 w-full font-bold text-black/80">
                            {categories.map((category) => (
                                <li
                                    key={category}
                                    className={`cursor-pointer   text-gray-700 hover:text-black hover:translate-x-2 transform transition-transform duration-300 ${category === selectedCategory ? 'text-black underline underline-offset-4' : ''}`}
                                    onClick={() => handleCategorySelect(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="absolute top-0 left-8  w-full h-full  bg-white -translate-x-full"></div>    


                {/* Main Content */}
                <div className={`grid grid-cols-3 gap-6 rounded-lg w-auto transition-all duration-300 p-5 bg-white/10  ${showFilter ? 'ml-48' : ''}`}>
                    {products.map((product) => (
                        <Link href={route('item', { id: product.id })} key={product.id}>
                            <div className="flex flex-col items-start justify-start">
                                <img
                                    src={product.image}
                                    alt="Product Image"
                                    className="w-full object-cover rounded-t-md"
                                />
                                <div className="w-full h-auto flex flex-col items-start pl-5 p-2 bg-white rounded-b-md">
                                    <p className="text-center text-black italic">{product.category}</p>
                                    <p className="text-center text-black">{product.name}</p>
                                    <p className="text-center text-lg text-black font-semibold">{product.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>


                   
                
            </Layout>
        );
    };

    export default Shop;
