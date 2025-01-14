import { MdAccountBox } from "react-icons/md";
import Dropdown from '@/Components/Login/Dropdown';

interface AccountDropdownProps {
    handleProfileClick: () => void;
    handleLogout: () => void;
}

const AccountDropdown = ({ handleProfileClick, handleLogout }: AccountDropdownProps) => {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <MdAccountBox className="w-14 h-12 text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white" />
            </Dropdown.Trigger>

            <Dropdown.Content>
                <ul className="absolute right-0 top-full mt-2 border border-gray-200 dark:border-gray-600 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
                    <li
                        className="cursor-pointer px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                        onClick={handleProfileClick}
                    >
                        Profile
                    </li>
                    <li
                        className="cursor-pointer px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                        onClick={handleLogout}
                    >
                        Log Out
                    </li>
                </ul>
            </Dropdown.Content>
        </Dropdown>
    );
};

export default AccountDropdown;
