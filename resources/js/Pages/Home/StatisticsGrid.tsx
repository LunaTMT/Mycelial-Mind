import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function StatisticsGrid() {
    const items = [
        { id: 1, title: "REVIEWS", number: 200 },
        { id: 2, title: "SALES", number: 156 },
        { id: 8, title: "DELIVERIES", number: 420 },
        { id: 9, title: "SPORES SOLD", number: 69 },
        { id: 10, title: "KITS SOLD", number: 666 },
        { id: 11, title: "SPAWN SOLD", number: 999 },
      ];

    

  return (
    <div className="relative h-[30vh] w-full 
    bg-gradient-to-t from-yellow-100 via-transparent to-transparent
    dark:bg-gradient-to-b dark:from-slate-600 dark:to-slate-500">
      <Swiper
        effect="fade"
        slidesPerView={4}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-[80%] h-full"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="rounded-lg w-full h-full  text-black dark:text-white flex flex-col justify-center items-center">
              <div className="text-center text-4xl font-Audrey mb-2">
                {item.title}
              </div>
              <div className="text-center  font-Poppins text-5xl">
                {item.number}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
