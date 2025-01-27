import { Link } from '@inertiajs/react';

const NavLinks = ({ items, currentUrl }: { items: { href: string; name: string }[]; currentUrl: string }) => {
    return (
        <div className="flex gap-8 justify-center items-center font-Audrey leading-none text-2xl">
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`relative group ${currentUrl === item.href ? 'active' : ''}`}
                >
                    <span className="text-shadow-beige-glow">{item.name}</span>
                    <span
                        className={`absolute left-0 bottom-0 h-[1px] bg-gradient-to-r rounded-full 
                        from-yellow-400/50 via-yellow-400 to-yellow-400/50
                        dark:from-slate-700 dark:via-white dark:to-slate-700
                        transition-all duration-300 ${currentUrl === item.href ? 'w-full' : ''}`}
                    ></span>
                </Link>
            ))}
        </div>
    );
};

export default NavLinks;
