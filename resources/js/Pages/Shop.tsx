import React, { useState, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';

import FilterDropdown from "@/Components/Dropdown/FilterDropdown";
import FilterButton from "@/Components/Buttons/FilterButton";
import SortDropdown from "@/Components/Dropdown/SortDropdown";
import AddItemButton from "@/Components/Buttons/AddItemButton";
import ProductCard from "@/Components/Cards/ProductCard";



interface ShopProps {
    auth: { user: any } | null;
    items: any[];
    message: string;
}

const Shop: React.FC<ShopProps> = ({ auth, items, message }) => {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    const [filteredItems, setFilteredItems] = useState(items);
    const [showFilter, setShowFilter] = useState(false); // Add this state for showFilter
    const [sortOption, setSortOption] = useState<string>("Newest");
   
    useEffect(() => {
        if (message) {
            const messageText = typeof message === 'string' ? message : JSON.stringify(message);
            Swal.fire({
                title: "Success!",
                text: messageText,
                icon: "success",
                confirmButtonText: "OK",
            });
        }
    }, [message]);

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);


    useEffect(() => {
        let sortedItems = [...items];
        if (sortOption === "Price: Low to High") {
            sortedItems = sortedItems.sort((a, b) => a.price - b.price);
        } else if (sortOption === "Price: High to Low") {
            sortedItems = sortedItems.sort((a, b) => b.price - a.price);
        }
        setFilteredItems(sortedItems);
    }, [sortOption, items]);

    return (
        <Layout
            header={
                <div className="h-full w-full overflow-visible flex justify-between items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Shop</h2>
                    
                    <FilterDropdown showFilter={showFilter} />

                    <div className="flex items-center gap-4">
                        <FilterButton showFilter={showFilter} setShowFilter={setShowFilter} />
                        <SortDropdown setSortOption={setSortOption} />
                        <AddItemButton />
                    </div>
                </div>
            }
        >
            <Head title="Shop" />
            <div className={`grid grid-cols-3 gap-6 rounded-lg transition-all duration-300 ${showFilter ? 'ml-48' : ''}`}>
                {filteredItems.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default Shop;
