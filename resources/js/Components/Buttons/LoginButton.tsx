import { CiLogin } from "react-icons/ci";
import { Link } from '@inertiajs/react';

const LoginButton = () => {
    return (
        <Link
            href="/login"
            className="text-sm font-medium text-slate-700 hover:text-black dark:text-slate-300 dark:hover:text-white"
        >
            <CiLogin className="w-14 h-10" />
        </Link>
    );
};

export default LoginButton;
