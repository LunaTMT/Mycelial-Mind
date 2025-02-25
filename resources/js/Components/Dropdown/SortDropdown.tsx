import React, { useState, useEffect, useRef } from "react";
import { useShop } from "@/Contexts/ShopContext"; // Import the ShopContext
import ArrowIcon from "@/Components/Buttons/ArrowIcon";

const SortDropdown: React.FC = () => {
    const { sortOption, setSortOption } = useShop(); // Destructure the state and setter from context
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSortChange = (option: string) => {
        setSortOption(option); // Update sort option via context
        setShowDropdown(false); // Close the dropdown
    };

    // Close dropdown if a click is detected outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            className="cursor-pointer flex items-center justify-center gap-2 rounded-md relative group"
            onClick={() => setShowDropdown(!showDropdown)}
            ref={dropdownRef}
        >
            <p className="font-Poppins text-slate-700 hover:text-black dark:text-slate-300 dark:text-white/70 dark:hover:text-white">
                SORT
            </p>
            <ArrowIcon w="30" h="30" isOpen={showDropdown} />
            <ul
                className={`absolute right-0 top-14 w-[250%] bg-gradient-to-b from-[#f5f5dc] via-white to-[#f5f5dc] dark:bg-none dark:bg-gray-800 shadow-lg rounded-md border border-black/20 dark:border-gray-600 z-40 
                    transform transition-all duration-300 ease-in-out ${showDropdown ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"}`}
            >
                {["NEWEST", "LOW - HIGH", "HIGH - LOW"].map((option, index, array) => (
                    <li
                        key={index}
                        className={`cursor-pointer px-4 py-2 font-Poppins hover:bg-gray-400/50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 
                            ${index === 0 ? "rounded-t-md" : ""} 
                            ${index === array.length - 1 ? "rounded-b-md" : ""}`}
                        onClick={() => handleSortChange(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SortDropdown;
