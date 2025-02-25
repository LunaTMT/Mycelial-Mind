import React from 'react';
import Hamburger from 'hamburger-react';
import { useShop } from "@/Contexts/ShopContext";

const FilterButton: React.FC = () => {
    const { filterVisible, setFilterVisible } = useShop();

    return (
        <div
            className="cursor-pointer flex items-center justify-center gap-2 rounded-md"
            onClick={() => setFilterVisible(!filterVisible)} // Directly toggling the state
        >
            <p className="text-slate-700 font-Poppins hover:text-black dark:text-slate-300 dark:text-white/70 dark:hover:text-white">
                FILTER
            </p>
            <Hamburger size={20} toggled={filterVisible} />
        </div>
    );
};

export default FilterButton;
