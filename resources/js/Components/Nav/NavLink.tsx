import { InertiaLinkProps, Link } from '@inertiajs/react';

interface NavLinkProps extends InertiaLinkProps {
    active: boolean;
    name?: string;
}

export default function NavLink({
    active = false,
    className = '',
    name,
    ...props
}: NavLinkProps) {
    return (
        <Link
            {...props}
            className={`
                relative inline-flex items-center text-lg font-medium leading-5
                transition-all duration-300 ease-in-out focus:outline-none text-left
                ${className}
            `}
        >
            {name && (
                <span
                    className={`
                        relative text-slate-700 text-left dark:text-slate-300 transition-all duration-300 ease-in-out
                        ${active 
                            ? 'underline-offset-2- dark:text-blue-400 font-semibold'
                            : 'group-hover:text-white dark:group-hover:text-gray-200'
                        }
                    `}
                >
                    {/* Adding background color change on hover */}
                    <span
                        className={`
                            absolute inset-0 w-full h-full  opacity-0 transition-all duration-300 ease-in-out 
                            group-hover:opacity-10
                        `}
                    />
                    {name}
                </span>
            )}
        </Link>
    );
}
