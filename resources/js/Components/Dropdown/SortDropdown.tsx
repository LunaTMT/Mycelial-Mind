import React, { useState, useEffect, useRef } from "react";
import ArrowIcon from "@/Components/Buttons/ArrowIcon";

interface SortDropdownProps {
    setSortOption: (sortOption: string) => void; 
}

const SortDropdown: React.FC<SortDropdownProps> = ({ setSortOption }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown container

    const handleSortChange = (sortOption: string) => {
        setSortOption(sortOption);
        setShowDropdown(false);
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
            <p className="text-slate-700 hover:text-black dark:text-slate-300 dark:text-white/70 dark:hover:text-white">Sort</p>
            <ArrowIcon w="30" h="30" isOpen={showDropdown} />
            <ul
                className={`absolute right-0 top-14 w-[250%] bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-600 z-40 
                    transform transition-all duration-300 ease-in-out ${showDropdown ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"}`}
            >
                {["Newest", "Price: Low to High", "Price: High to Low"].map((option, index, array) => (
                    <li
                        key={index}
                        className={`cursor-pointer px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 
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
