import { InertiaLinkProps, Link } from '@inertiajs/react';

interface NavLinkProps extends InertiaLinkProps {
    active: boolean;
    icon: JSX.Element; // The icon to display
    name: string; // The name to display on hover
}

export default function NavLink({
    active = false,
    className = '',
    icon,
    name,
    ...props
}: NavLinkProps) {
    return (
        <Link
            {...props}
            className={`
                relative inline-flex w-[30%] items-center flex-col gap-2 px-1 pt-1 text-sm font-medium leading-5
                transition duration-150 ease-in-out focus:outline-none 
                
                ${className}
            `}
            
        >
            {/* Wrap both icon and name in a group */}
            <div
                className={`group inline-flex flex-col items-center gap-1 `}
            >
                {/* Render the icon */}
                <div
                    className={`w-10 h-10 transition duration-150 ${
                        active ? 'text-white' : 'text-white/70 group-hover:text-white'
                    }`}
                >
                    {icon}
                </div>

                {/* Name below the icon, shown only on hover */}
                <span
                    className="text-sm text-white/70 group-hover:text-white "
                >
                    {name}
                </span>
            </div>
        </Link>
    );
}
