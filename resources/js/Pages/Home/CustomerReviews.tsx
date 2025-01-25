import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import StarsGrid from "./StarsGrid";

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
    <section className="min-h-screen h-[94vh] font-Poppins w-full flex flex-col justify-center items-center 
    dark:bg-gradient-to-b dark:from-slate-400 dark:to-slate-800 ">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-7xl font-Audrey text-black dark:text-white">CUSTOMER REVIEWS</h1>
        <p className="font-Poppins text-gray-600 dark:text-gray-400">Verified reviews from real customers.</p>
      </div>

      {/* Reviews Swiper or Placeholder */}
      {reviews.length > 0 ? (
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          centeredSlides={false}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          modules={[Autoplay]} // Only Autoplay module is used
          className="mySwiper w-[90%] h-1/3 "
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col justify-between h-full dark:bg-gradient-to-b dark:from-transparent dark:to-slate-800">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{review.customerName}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{review.reviewText}</p>
                <div className="flex justify-center items-center mt-4">{renderStars(review.rating)}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-col justify-center items-center m-32">
          <p className="text-gray-600 dark:text-gray-400 text-xl font-Poppins">
            There are currently no reviews. Be the first to leave one!
          </p>
        </div>
      )}

     
      <StarsGrid />
        

      {/* Trustpilot Badge */}
      <div className="flex justify-center items-center flex-col mt-8">
        <a
          href="https://www.trustpilot.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-yellow-500"
        >
          Leave a Review on Trustpilot
        </a>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">Powered by Trustpilot</p>
      </div>
    </section>
  );
};

export default CustomerReviews;
