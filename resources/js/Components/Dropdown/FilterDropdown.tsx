import React, { useState } from "react";
import { useShop } from "@/Contexts/ShopContext";
import { Inertia } from "@inertiajs/inertia";


const FilterDropdown: React.FC = () => {
    const { filterVisible, setFilterVisible } = useShop();

    const getCategoryFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("category") || "ALL";
    };

    const [selectedCategory, setSelectedCategory] = useState<string>(getCategoryFromUrl);
    const categories = [
        "ALL", "AGAR", "APPAREL", "BOOKS", "EQUIPMENT", "FORAGING", "GOURMET",
        "GROW KITS", "INFUSED", "MICROSCOPY", "SPAWN", "SPORES"
    ];

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        Inertia.get(route("shop"), { category, filterVisible }, { preserveState: true });
    };
    
    
    

    return (
        <div
            className={`absolute w-[10vw] h-auto top-[115%] z-30 
                ${filterVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} transition-all duration-500 ease-in-out`}
        >
            <ul className="space-y-2 w-full font-Poppins text-lg text-black dark:text-white transition-none">
                {categories.map((category) => (
                    <li
                        key={category}
                        className={`cursor-pointer px-2 py-1 relative hover:scale-110 hover:ml-5 transition-all duration-500 ease-in-out
                            ${selectedCategory === category ? 'scale-105 ml-1 underline underline-offset-[4px]' : ''}`}
                        onClick={() => handleCategorySelect(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default FilterDropdown;
