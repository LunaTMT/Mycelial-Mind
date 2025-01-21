import { Link } from '@inertiajs/react';

const NavLinks = ({ items, currentUrl }: { items: { href: string; name: string }[]; currentUrl: string }) => {
    return (
        <div className="flex gap-8 justify-center items-center font-Audrey_Normal  text-2xl">
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={currentUrl === item.href ? 'active' : ''}
                >
                    {item.name}
                </Link>
            ))}
        </div>
    );
};

export default NavLinks;
