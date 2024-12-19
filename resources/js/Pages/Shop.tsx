import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import SearchBar from "../Components/Searching/SearchBar";
import ShopFilter from "../Components/Login/Filter";

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
  

const Shop = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const handleSearch = (query: string) => {
        console.log("Search query:", query);
        // Add logic here to search for products
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        console.log("Selected Category:", category);
        // Add logic here to filter products by the selected category
    };

    return (
        <div
            className="relative flex flex-col w-full h-screen 
            justify-center items-center 
            overflow-y-auto bg-white 
            bg-gradient-to-r from-sky-500 to-slate-950"
        >
            {/* Navbar <Navbar /> */}
            <Navbar />
            
            {/* Content */}
            <div className="w-full h-full
                flex flex-col justify-center items-center 
                gap-[2%]">

                {/* Top Search Bar */}
                <div className="w-full flex justify-center">
                    <SearchBar placeholder="Search..." onSearch={handleSearch} />
                </div>


                {/* Shop Filter */}
                <div className="w-[95%] h-[70%] bg-white flex flew-col">
                    
                    {/* Left Sidebar Filter */}
                    <div className="hidden h-auto 
                        md:flex md:w-[15vw] md:h-[75vh] 
                        bg-white shadow-md border 
                        ">
                        <ShopFilter
                            categories={categories}

                        />
                    </div>

                    {/* Right Items */}
                    <div className="w-full md:w-[85vw] md:h-[75vh] 
                    bg-white border  shadow-md">
                        Insert items
                    </div>
                </div>

            </div>

            
        </div>
    );
};

export default Shop;
