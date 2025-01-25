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
import Breadcrumb from "@/Components/Nav/Breadcrumb"; 

interface ShopProps {
    auth: { user: any } | null;
    items: any[];
    category: string;
    message: string;
    showFilter: boolean;  // Add showFilter here
}


const Shop: React.FC<ShopProps> = ({ auth, items, category, message, showFilter=false }) => {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    const [filteredItems, setFilteredItems] = useState(items);
    const [filterVisible, setFilterVisible] = useState(showFilter);  
    const [sortOption, setSortOption] = useState<string>("Newest");

    const handleCategorySelect = (category: string) => {
        Inertia.get(route('shop'), { 
            category, 
            showFilter: true 
        });
    };

    useEffect(() => {
        console.log(showFilter);
    }, );

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
        if (sortOption === "LOW - HIGH") {
            sortedItems = sortedItems.sort((a, b) => a.price - b.price);
        } else if (sortOption === "HIGH - LOW") {
            sortedItems = sortedItems.sort((a, b) => b.price - a.price);
        }
        setFilteredItems(sortedItems);
    }, [sortOption, items]);

    return (
        <Layout
            header={
                <div className="h-[6vh] z-10 w-full overflow-visible flex justify-between items-center gap-4 ">
                    <Breadcrumb 
                        items={[
                            { label: "SHOP",   link: route('shop', {           showFilter: filterVisible }) },
                            { label: category, link: route('shop', { category, showFilter: filterVisible }) },
                        ]}
                    />

                    <FilterDropdown 
                        showFilter={filterVisible} 
                        handleCategorySelect={handleCategorySelect} 
                    />
                    <div className="flex items-center gap-4">
                        <FilterButton showFilter={filterVisible} 
                                      setShowFilter={setFilterVisible} />
                        <SortDropdown setSortOption={setSortOption} />
                        <AddItemButton />
                    </div>
                </div>
            }
        >
            <Head title="Shop" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8  ">
                {filteredItems.length === 0 ? (
                    <div className="w-full h-full shadow-2xl">
                        <img
                        src={'assets/images/background/coming_soon.png'}
                        alt="Product Image"
                        className={`w-1/2 mx-auto object-cover `}/>
                    </div>
                  
                ) : ( 
                    <div className={`grid grid-cols-3  gap-6 rounded-lg py-5 transition-all duration-500 ${filterVisible ? 'ml-48' : ''}`}>
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
