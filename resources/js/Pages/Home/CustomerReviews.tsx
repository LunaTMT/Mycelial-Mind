import React from "react";

interface Review {
    customerName: string;
    reviewText: string;
    rating: number; // Out of 5
    date: string;
}

const reviews: Review[] = [
    {
        customerName: "John Doe",
        reviewText: "Amazing experience! The product quality was outstanding, and the customer support was exceptional.",
        rating: 5,
        date: "January 15, 2025",
    },
    {
        customerName: "Jane Smith",
        reviewText: "The delivery was fast, and the product exceeded my expectations. Highly recommend!",
        rating: 4,
        date: "January 10, 2025",
    },
    {
        customerName: "Alice Brown",
        reviewText: "Good quality product, but the packaging could be improved. Overall, a great purchase.",
        rating: 4,
        date: "January 8, 2025",
    },
];

const CustomerReviews: React.FC = () => {
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={i < rating ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-5 h-5 ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 17.75L7.605 20.508l.84-4.897L4.833 11.99l4.922-.715L12 6.745l2.245 4.531 4.922.715-3.612 3.621.84 4.897L12 17.75z"
                    />
                </svg>
            );
        }
        return stars;
    };

    return (
        <section className="min-h-[85vh] w-full  rounded-lg ">
            
            <div className="max-w-6xl p-5 mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        What Our Customers Say
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Verified reviews from real customers.
                    </p>
                </div>

                {/* Reviews */}
                <div className="space-y-6 w-ful">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    {review.customerName}
                                </h3>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {review.date}
                                </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                {review.reviewText}
                            </p>
                            <div className="flex items-center">{renderStars(review.rating)}</div>
                        </div>
                    ))}
                </div>

                {/* Trustpilot Badge */}
                <div className="flex justify-center items-center flex-col mt-12 ">
                    <a
                        href="https://www.trustpilot.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full transition duration-300"
                    >
                        Leave a Review on Trustpilot
                    </a>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Powered by Trustpilot
                    </p>



                </div>
            </div>
        </section>
    );
};

export default CustomerReviews;
