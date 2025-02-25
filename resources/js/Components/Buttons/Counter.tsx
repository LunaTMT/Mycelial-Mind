import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

interface CounterProps {
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
    onRemove: () => void;
}

const Counter: React.FC<CounterProps> = ({ quantity, onQuantityChange, onRemove }) => {
    return (
        <div className="flex items-center justify-center font-Poppins w-full h-full text-xl dark:text-white rounded-full ">
            {/* Minus Button or Delete Button */}
            <button
                className="w-full h-full flex items-center justify-center  rounded-l-full focus:outline-none"
                onClick={() => {
                    if (quantity > 1) {
                        onQuantityChange(quantity - 1); // Decrease quantity
                    } else {
                        onRemove(); // Remove product if quantity is 1
                    }
                }}
            >
                {quantity > 1 ? (
                    '-'
                ) : (
                    <RiDeleteBin6Line />
                )}
            </button>

            {/* Quantity Value */}
            <div className="flex items-center justify-center w-full h-full bg-transparent">
                <span className="">{quantity}</span>
            </div>



            {/* Plus Button */}
            <button
                className="w-full h-full flex items-center justify-center  rounded-r-full focus:outline-none"
                onClick={() => {
                    // Ensure quantity doesn't exceed stock
                    onQuantityChange(quantity + 1);
                }}
            >
                +
            </button>
        </div>
    );
};


export default Counter;
