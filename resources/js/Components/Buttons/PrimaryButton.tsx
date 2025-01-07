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
            className={
                `flex justify-center items-center text-center rounded-md border border-transparent bg-gray-800 dark:bg-slate-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white dark:text-slate-100 transition duration-150 ease-in-out hover:bg-gray-700 dark:hover:bg-slate-900 hover:border-gray-600 dark:hover:border-slate-600 focus:bg-gray-700 dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-slate-900 active:bg-gray-900 dark:active:bg-slate-900 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
