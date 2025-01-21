import { MdAccountBox } from "react-icons/md";
import Dropdown from '@/Components/Login/Dropdown';
import { usePage, router } from '@inertiajs/react';

const AccountDropdown = () => {
    const menuItems = [
        { label: "Profile", onClick: () => router.get('/profile') },
        { label: "Orders", onClick: () => console.log("Orders clicked") },
        { label: "Shipping", onClick: () => console.log("Shipping clicked") },
        { label: "Log Out", onClick: () => router.post('/logout', {}, { preserveScroll: true }) },
    ];

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <MdAccountBox className="w-14 h-12 text-black/75 hover:text-black hover:scale-110 dark:text-slate-300 dark:hover:text-white transition-transform duration-500" />
            </Dropdown.Trigger>


            <Dropdown.Content>
            <ul className="relative right-0 top-full mt-2 border border-gray-200 dark:border-gray-600 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                        onClick={item.onClick}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>


            </Dropdown.Content>
        </Dropdown>
    );
};

export default AccountDropdown;
