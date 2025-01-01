import React, { useState } from "react";
import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react';
import { IoFilterOutline } from "react-icons/io5";
import { Select, Option } from "@material-tailwind/react";

const categories = [
    "All",
    "Agar",
    "Apparel",
    "Books",
    "Equipment",
    "Foraging",
    "Gourmet",
    "Grow Kits",
    "Infused Products",
    "Microscopy",
    "Spawn",
    "Spores"
];

interface ShopProps {
    auth: { user: any } | null; // Assuming 'auth' prop contains user info if logged in
}

const Shop: React.FC<ShopProps> = ({ auth }) => {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    const products = [
        { id: 1, name: "Product name", quantity: "$10", image: "/assets/images/products/shoes.png", total: 4.5 },
        { id: 2, name: "Product name", quantity: "$15", image: "/assets/images/products/shoes.png", total: 6.5 },
        { id: 3, name: "Product name", quantity: "$20", image: "/assets/images/products/shoes.png", total: 8.5 },
        { id: 4, name: "Product name", quantity: "$25", image: "/assets/images/products/shoes.png", total: 10.5 },
        { id: 5, name: "Product name", quantity: "$30", image: "/assets/images/products/shoes.png", total: 12.5 },
    ];

    return (
        <Layout
            header={
                <div className="h-full w-full overflow-visible grid grid-rows-1 grid-cols-4">
                    <h2 className="text-xl font-semibold leading-tight flex items-center h-auto w-full">
                        Cart
                    </h2>
                </div>
            }
        >
            <Head title="Cart" />

            <div className="relative w-full min-h-[78vh] rounded-lg flex justify-center items-start bg-white/10">
                <div className="w-full max-w-7xl p-5">
                    <div className="grid grid-cols-3 gap-6 mb-6 text-white font-semibold text-center text-lg ">
                        {/* Column Titles */}
                        <div>Product</div>
                        <div>Quantity</div>
                        <div>Total</div>
                    </div>

                    {/* Grid Items */}
                    {products.map((product) => (
                        <div key={product.id} className="grid grid-cols-3 gap-6 mb-4 items-center bg-white rounded-lg">
                            {/* Product Image and Name */}
                            <div className="flex items-center gap-4 p-2">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{product.name}</p>
                                    <p className="text-gray-500">{product.quantity}</p>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="flex justify-center items-center">
                                <input
                                    type="number"
                                    value={1}
                                    className="w-20 text-center p-2 border rounded-md shadow-sm focus:outline-none"
                                    min={1}
                                />
                            </div>

                            {/* Total */}
                            <div className="text-center">
                                <p className="font-semibold text-lg ">${product.total.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Shop;
