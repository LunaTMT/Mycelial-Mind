import { MdAccountBox } from "react-icons/md";
import Dropdown from '@/Components/Login/Dropdown';
import { Inertia } from '@inertiajs/inertia';

const AccountDropdown = () => {
    const menuItems = [
        { label: "PROFILE", onClick: () => Inertia.get('/profile') },
        { label: "ORDERS", onClick: () => console.log("Orders clicked") },
        { label: "SHIPPING", onClick: () => console.log("Shipping clicked") },
        { label: "LOG OUT", onClick: () => Inertia.post('/logout', {}, { preserveScroll: true }) },
    ];

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <MdAccountBox className="w-14 h-12 text-black/75 hover:text-black hover:scale-110 dark:text-slate-300 dark:hover:text-white transition-transform duration-500" />
            </Dropdown.Trigger>

            <Dropdown.Content>
                <ul className="relative border border-black/20 dark:border-gray-600 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            className={`cursor-pointer px-4 py-2 font-Poppins hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300
                                ${index === 0 ? "rounded-t-md" : ""} 
                                ${index === menuItems.length - 1 ? "rounded-b-md" : ""}`}
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
