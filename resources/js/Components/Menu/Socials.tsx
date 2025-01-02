import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

import { CiFacebook } from "react-icons/ci";

export default function Socials() {
    return (
        <>   
            <FaFacebookSquare className="w-12 h-12  rounded-md text-black/70 hover:text-black" />
            <FaSquareInstagram className="w-12 h-12 rounded-md text-black/70 hover:text-black" />
            <FaSquareXTwitter className="w-12 h-12 rounded-md text-black/70 hover:text-black" />
        </>
    );
}
