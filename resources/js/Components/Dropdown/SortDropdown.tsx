import React from 'react';
import ArrowIcon from "@/Components/Buttons/ArrowIcon";

interface SortDropdownProps {
    showDropdown: boolean;
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ showDropdown, setShowDropdown }) => {
    return (
        <div className="cursor-pointer flex items-center justify-center gap-2 rounded-md relative group" onClick={() => setShowDropdown(!showDropdown)}>
            <p className="text-slate-700 hover:text-black dark:text-slate-300 dark:text-white/70 dark:hover:text-white">Sort</p>
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
                        onClick={() => setShowDropdown(false)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SortDropdown;
