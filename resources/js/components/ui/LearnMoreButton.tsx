import { motion } from "motion/react"


const LearnMoreButton : React.FC = () => {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInQuart" }}
            className={`
                inline-flex items-center justify-center 
                px-5 py-3 my-5  
                text-2xl font-medium text-center text-white 
                bg-black rounded-lg border-2
                hover:bg-white hover:border-black hover:text-black hover:scale-110
                transform transition-all duration-300 ease-in-out
            `}
        >
            Learn more
            <svg
                className={`
                    w-6 h-6 ms-2 rtl:rotate-180 
                    transition-all duration-300 ease-in-out
                    group-hover:scale-150
                `}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                />
            </svg>
        </motion.button>
    )
}

export default LearnMoreButton;