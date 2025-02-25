import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={`inline-block 
                bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 font-semibold py-3 px-8 rounded-full 
                transform hover:scale-105 transition-all duration-300 hover:shadow-[0_0_5px_#FFD700,0_0_15px_#FFD700,0_0_25px_#FFD700] 
                font-Poppins 
                ${disabled ? 'opacity-25' : ''} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}


