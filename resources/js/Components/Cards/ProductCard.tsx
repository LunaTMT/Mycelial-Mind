import React from 'react';
import { Link } from '@inertiajs/react';
import { AiOutlineClose } from "react-icons/ai";
import { Inertia } from '@inertiajs/inertia';

interface ProductCardProps {
    product: any;
    handleRemoveItem: (itemId: number) => void;
    authRole: string | undefined;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, handleRemoveItem, authRole }) => {
    const images = JSON.parse(product.images);
    
    return (
        <div className="relative flex flex-col items-start justify-start dark:bg-gray-800 rounded-md">
            {authRole === 'admin' && (
                <button
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    onClick={() => handleRemoveItem(product.id)}
                >
                    <AiOutlineClose size={20} />
                </button>
            )}

            <Link href={route('item', { id: product.id })}>
                <img
                    src={images && images[0] ? `/${images[0]}` : 'assets/images/missing_image.png'}
                    alt="Product Image"
                    className="w-full object-cover rounded-t-md"
                />
                <div className="w-full h-auto flex flex-col items-start p-2 bg-white dark:bg-slate-700/75 rounded-b-md">
                    <p className="text-center text-gray-700 dark:text-gray-300 italic">{product.category}</p>
                    <p className="text-center text-gray-800 dark:text-white">{product.name}</p>
                    <p className="text-center text-lg text-gray-900 dark:text-gray-200 font-semibold">{product.price}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
