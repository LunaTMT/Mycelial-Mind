import React, { useState, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react'; // Import the Inertia hook
import Swal from 'sweetalert2';

import FilterDropdown from "@/Components/Dropdown/FilterDropdown";
import FilterButton from "@/Components/Buttons/FilterButton";
import SortDropdown from "@/Components/Dropdown/SortDropdown";
import AddItemButton from "@/Components/Buttons/AddItemButton";
import ProductCard from "@/Components/Cards/ProductCard";
import Breadcrumb from "@/Components/Nav/Breadcrumb"; // Import Breadcrumb component

interface ShopProps {
    auth: { user: any } | null;
    items: any[];
    category: string;  // Add category as a prop
    message: string;
}

const Shop: React.FC<ShopProps> = ({ auth, items, category, message }) => {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    const [filteredItems, setFilteredItems] = useState(items);
    const [showFilter, setShowFilter] = useState(false);
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
                <div className="h-[6vh] w-full overflow-visible flex justify-between items-center gap-4 ">
                    <Breadcrumb 
                        items={[
                            { label: "Shop", link: "/shop" }, // Link to shop
                            { label: category, link: `/shop?category=${category}` }, // Link to category page
                        ]}
                    />
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
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 ">
                {/* Check if there are no items */}
                {filteredItems.length === 0 ? (
                    <h1 className="text-center text-3xl font-semibold text-gray-800 dark:text-white">
                        Unfortunately, we do not have this item currently available.
                    </h1>
                ) : (
                    <div className={`grid grid-cols-3 gap-6 rounded-lg py-5 transition-all duration-500 ${showFilter ? 'ml-48' : ''}`}>
                        {filteredItems.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Shop;
