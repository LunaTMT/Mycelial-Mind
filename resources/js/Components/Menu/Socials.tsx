import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Socials() {
    return (
        <>   
            <FaFacebookSquare className="w-12 h-12 rounded-md text-gray-800 dark:text-white hover:filter hover:brightness-125 transition-all" />
            <FaSquareInstagram className="w-12 h-12 rounded-md text-gray-800 dark:text-white hover:filter hover:brightness-125 transition-all" />
            <FaSquareXTwitter className="w-12 h-12 rounded-md text-gray-800 dark:text-white hover:filter hover:brightness-125 transition-all" />
        </>
    );
}
