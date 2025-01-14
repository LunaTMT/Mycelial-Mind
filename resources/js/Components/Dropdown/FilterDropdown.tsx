import React, { useState, useEffect } from "react";
import { Inertia } from '@inertiajs/inertia';

interface FilterDropdownProps {
    showFilter: boolean;
    
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ showFilter }) => {

    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const categories = [
        "All", "Agar", "Apparel", "Books", "Equipment", "Foraging", "Gourmet",
        "Grow Kits", "Infused Products", "Microscopy", "Spawn", "Spores"
    ];

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category); // Update selected category
        Inertia.get(route('shop'), { category }); // Fetch data for selected category
    };

    return (
        <div
            className={`absolute w-[10vw] h-auto top-[115%] rounded-md z-30
                ${showFilter ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} transition-all duration-300 ease-in-out`}
        >
            <ul className="space-y-2 w-full font-medium text-gray-700 dark:text-gray-300">
                {categories.map((category) => (
                    <li
                        key={category}
                        className="cursor-pointer px-2 py-1 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
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
