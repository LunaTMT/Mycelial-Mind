import React, { useState, useEffect } from "react";
import Navbar from "../Components/Nav/Menu";
import SearchBar from "../Components/Searching/SearchBar";
import ShopFilter from "../Components/Login/Filter";
import TopRightNav from "@/Components/Nav/TopRightNav";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Swal from 'sweetalert2';
import Hamburger from 'hamburger-react';

import FilterDropdown from "@/Components/Dropdown/FilterDropdown";
import FilterButton from "@/Components/Buttons/FilterButton";
import SortDropdown from "@/Components/Dropdown/SortDropdown";
import AddItemButton from "@/Components/Buttons/AddItemButton";
import ProductCard from "@/Components/Cards/ProductCard";

const categories = [
    "All", "Agar", "Apparel", "Books", "Equipment", "Foraging", "Gourmet", 
    "Grow Kits", "Infused Products", "Microscopy", "Spawn", "Spores"
];

interface ShopProps {
    auth: { user: any } | null;
    items: any[]; 
    message: string;
}

const Shop: React.FC<ShopProps> = ({ auth, items }) => {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const { props } = usePage();
    const { message } = props;

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

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <Layout
            header={
                <div className="h-full w-full overflow-visible flex justify-between items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Shop</h2>
                    {/* Filter dropdown combined with button */}
                    <FilterDropdown 
                        categories={categories} 
                        selectedCategory={selectedCategory} 
                        handleCategorySelect={handleCategorySelect}
                        showFilter={showFilter}
                    />
                    <div className="flex items-center gap-4">
                        <FilterButton showFilter={showFilter} setShowFilter={setShowFilter} />
                        <SortDropdown showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
                        <AddItemButton userRole={auth?.user?.role} />
                    </div>
                </div>
            }
        >
            <Head title="Shop" />
            <div className={`grid grid-cols-3 gap-6 rounded-lg transition-all duration-300 ${showFilter ? 'ml-48' : ''}`}>
                {items.map((product) => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        handleRemoveItem={() => Inertia.delete(`/items/${product.id}`)} 
                        authRole={auth?.user?.role}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default Shop;
