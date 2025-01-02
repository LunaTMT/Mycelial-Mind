import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

interface CounterProps {
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
    onRemove: () => void;
}

const Counter: React.FC<CounterProps> = ({ quantity, onQuantityChange, onRemove }) => {
    return (
        <div className="flex items-center justify-center w-full h-10 bg-white border rounded-full shadow-md">
            {/* Minus Button or Delete Button */}
            <button
                className="w-8 h-full flex items-center justify-center text-black rounded-l-full focus:outline-none"
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
            <input
                type="number"
                value={quantity}
                className="w-12 h-full flex items-center justify-center text-center text-black border-none bg-transparent focus:outline-none appearance-none"
                readOnly
            />

            {/* Plus Button */}
            <button
                className="w-8 h-full flex items-center justify-center text-black rounded-r-full focus:outline-none"
                onClick={() => onQuantityChange(quantity + 1)}
            >
                +
            </button>
        </div>
    );
};

export default Counter;
