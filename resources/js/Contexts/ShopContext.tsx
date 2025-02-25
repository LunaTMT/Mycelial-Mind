import React, { createContext, useState, useContext, useEffect } from "react";

interface ShopContextProps {
    filterVisible: boolean;
    setFilterVisible: (visible: boolean) => void;
    sortOption: string;
    setSortOption: (option: string) => void;
    filteredItems: any[];
    setFilteredItems: (items: any[]) => void;
    applySorting: (items: any[]) => any[];
}

const ShopContext = createContext<ShopContextProps | undefined>(undefined);

export const ShopProvider: React.FC<{ items: any[]; children: React.ReactNode }> = ({ items, children }) => {
    
    // filter visible default state is the locally stored
    const [filterVisible, setFilterVisible] = useState(() => {
        const storedState = localStorage.getItem('filterVisible');
        return storedState ? JSON.parse(storedState) : false;
    });
    
    //As soon as filter visible has been set we store it in local storage
    useEffect(() => {
        localStorage.setItem('filterVisible', JSON.stringify(filterVisible));
    }, [filterVisible]);
    
    const [filteredItems, setFilteredItems] = useState(items);
    const [sortOption, setSortOption] = useState<string>("Newest");

    // Sort items whenever sorting option changes
    const applySorting = (items: any[]) => {
        let sortedItems = [...items];
        if (sortOption === "LOW - HIGH") {
            sortedItems.sort((a, b) => a.price - b.price);
        } else if (sortOption === "HIGH - LOW") {
            sortedItems.sort((a, b) => b.price - a.price);
        }
        return sortedItems;
    };

    useEffect(() => {
        setFilteredItems(applySorting(items));
    }, [sortOption, items]);


    

    return (
        <ShopContext.Provider
            value={{ filterVisible, setFilterVisible, sortOption, setSortOption, filteredItems, setFilteredItems, applySorting }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error("useShop must be used within a ShopProvider");
    }
    return context;
};
