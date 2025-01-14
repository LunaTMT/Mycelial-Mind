import React from 'react';
import { Link } from '@inertiajs/react';
import { IoIosAddCircleOutline } from "react-icons/io";

interface AddItemButtonProps {
    userRole: string | undefined;
}

const AddItemButton: React.FC<AddItemButtonProps> = ({ userRole }) => {
    return (
        userRole === 'admin' && (
            <Link href={route('item.add')}>
                <div className="cursor-pointer flex items-center justify-center gap-2 rounded-md relative group">
                    <p className="text-slate-700 hover:text-black dark:text-slate-300 dark:text-white/70 dark:hover:text-white">Add</p>
                    <IoIosAddCircleOutline className="cursor-pointer w-8 h-8 rounded-md text-black dark:text-white" />
                </div>
            </Link>
        )
    );
};

export default AddItemButton;
