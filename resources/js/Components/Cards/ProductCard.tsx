import React from 'react';
import { Link } from '@inertiajs/react';
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import Swal from 'sweetalert2';

import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';

interface ProductCardProps {
    product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { auth } = usePage().props as any;
    const role = auth?.user?.role;
    const images = JSON.parse(product.images);
    
    const confirmDelete = (itemId: number) => {
        Swal.fire({
            title: 'Are you sure?',
            html: "Do you really want to delete this item? <br> This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(`/items/${itemId}`);

                Swal.fire({
                    title: "Success!",
                    text: "Item removed",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
        });
    };

    return (
        <div className="relative dark:bg-gray-800 rounded-md ">
            {role === 'admin' && (
                <div className="absolute top-2 right-2 flex gap-2">
                    {/* Close/Delete Button */}
                    <button
                        className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        onClick={() => confirmDelete(product.id)}
                    >
                        <AiOutlineClose size={20} />
                    </button>


                </div>
            )}

            <Link href={route('item', { id: product.id })}>
                <img
                    src={images && images[0] ? `/${images[0]}` : 'assets/images/missing_image.png'}
                    alt="Product Image"
                    className="w-full object-cover rounded-t-md"
                />
                <div className="w-full h-auto flex flex-col items-start p-2 bg-white dark:bg-slate-700/75 rounded-b-md font-Poppins">
                    <p className="text-center text-gray-700 dark:text-gray-300 italic">{product.category}</p>
                    <p className="text-center text-gray-800 dark:text-white">{product.name}</p>
                    <p className="text-center text-lg text-gray-900 dark:text-gray-200 font-semibold">{product.price}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
