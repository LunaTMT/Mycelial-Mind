import { CiShoppingCart } from "react-icons/ci";
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface CartButtonProps {
    cart: any[];
    totalItems: number;
    scaled: boolean;
}

const CartButton = ({ cart, totalItems, scaled }: CartButtonProps) => {
    return (
        <Link href={route('cart')}>
            <div className="relative">
                <CiShoppingCart
                    className={`w-14 h-10  text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white transform hover:scale-110 transition-transform duration-500 ${scaled ? 'scale-110' : ''}`}
                />
                {cart.length > 0 && (
                    <motion.div
                        className="absolute top-0 right-0 w-5 h-5 text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-xs rounded-full flex items-center justify-center transform translate-x-1/2 translate-y-[-50%] shadow-lg shadow-yellow-500/50"
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: scaled ? 1.2 : 1 }}
                        exit={{ opacity: 0, scale: 0.75 }}
                        transition={{ duration: 0.5 }}
                    >
                        {totalItems}
                    </motion.div>
                )}
            </div>
        </Link>
    );
};

export default CartButton;
