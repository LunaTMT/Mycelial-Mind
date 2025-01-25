import React, { useState, useEffect } from "react";

interface FilterDropdownProps {
    showFilter: boolean;
    handleCategorySelect: (category: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ showFilter, handleCategorySelect }) => {
    const getCategoryFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("category") || "ALL";
    };

    const [selectedCategory, setSelectedCategory] = useState<string>(getCategoryFromUrl);
    const categories = [
        "ALL", "AGAR", "APPAREL", "BOOKS", "EQUIPMENT", "FORAGING", "GOURMET",
        "GROW KITS", "INFUSED", "MICROSCOPY", "SPAWN", "SPORES"
    ];

    useEffect(() => {
        const handleUrlChange = () => {
            setSelectedCategory(getCategoryFromUrl());
        };

        window.addEventListener('popstate', handleUrlChange);
        return () => {
            window.removeEventListener('popstate', handleUrlChange);
        };
    }, []);

    return (
        <div
            className={`absolute w-[10vw] h-auto top-[115%]  z-30 
                ${showFilter ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} transition-all duration-500 ease-in-out`}
        >
            <ul className="space-y-2 w-full font-Poppins text-lg text-black dark:text-gray-300">
                {categories.map((category) => (
                    <li
                        key={category}
                        className={`cursor-pointer px-2 py-1 relative hover:scale-110 hover:ml-5 transition-all duration-500 ease-in-out
                            ${selectedCategory === category ? 'scale-105 ml-1 underline underline-offset-[4px]' : ''}`}
                        onClick={() => {
                            setSelectedCategory(category);
                            handleCategorySelect(category);
                        }}
                    >
                        {category}

                
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterDropdown;
