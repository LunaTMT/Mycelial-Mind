import React from 'react';
import Hamburger from 'hamburger-react';

interface FilterButtonProps {
    showFilter: boolean;
    setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterButton: React.FC<FilterButtonProps> = ({ showFilter, setShowFilter }) => {
    return (
        <div
            className="cursor-pointer flex items-center justify-center gap-2 rounded-md"
            onClick={() => setShowFilter(!showFilter)} // Toggle filter visibility
        >
            <p className="text-slate-700 hover:text-black dark:text-slate-300 dark:text-white/70 dark:hover:text-white">Filter</p>
            <Hamburger size={20} toggled={showFilter} toggle={setShowFilter} />
        </div>
    );
};

export default FilterButton;
