import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from '@inertiajs/react'; // Import Link from Inertia.js

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

const items = [
  { 
    id: 1, 
    text: "GROW KITS", 
    image: "/assets/images/grid/grow_kits.png",
    description: "Everything you need to cultivate your own mushrooms at home with ease.",
    category: "GROW KITS" // Added category
  },
  { 
    id: 2, 
    text: "SPORES", 
    image: "/assets/images/grid/spore_syringe2.png",
    description: "High-quality mushroom spores, perfect for microscopy and research purposes.",
    category: "SPORES" // Added category
  },
  { 
    id: 3, 
    text: "SPAWN", 
    image: "/assets/images/grid/spawn.png",
    description: "Colonized grain spawn for reliable and efficient mushroom growth.",
    category: "SPAWN" // Added category
  },
  { 
    id: 5, 
    text: "INFUSED", 
    image: "/assets/images/grid/infused.png",
    description: "Explore our selection of infused mushroom products designed for wellness.",
    category: "INFUSED" // Added category
  },
];

export default function Products() {
  return ( 
    <div className="w-full h-screen  flex flex-col items-center justify-center dark:bg-gradient-to-t dark:from-slate-500 dark:to-slate-800">
      
      {/* Move the h1 outside of Swiper */}
      <h1 className="absolute top-[38%] left-1/2  transform -translate-x-1/2 -translate-y-1/2 text-7xl font-Audrey text-black dark:text-transparent dark:bg-clip-text 
        dark:bg-gradient-to-t dark:from-[#e7e77a] dark:to-white 
        leading-tight dark:text-#f5f5dc dark:text-shadow-beige-glow">
        PRODUCTS
      </h1>

      <Swiper
        spaceBetween={0}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation={true}
        pagination={{ clickable: true }}
        loop={true} // This enables looping
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper w-[50%] h-auto relative"
      >
        {items.map((item) => (
          <SwiperSlide
            key={item.id}
            className="flex flex-col items-center justify-center  dark:text-white rounded-lg"
          >
            {/* Image */}
            <div className="flex justify-center items-center mx-auto  w-[500px] h-[500px]">
              <img
                src={item.image}
                alt={item.text}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text */}
            <div className="text-center h-auto">
              <h2 className="text-4xl font-bold font-Audrey mb-4">{item.text}</h2>
              <p className="text-lg font-Poppins mb-7">{item.description}</p>
              <Link
                href={route('shop', { category: item.category })} // Redirect to the correct category page
                className="inline-block 
                  bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-semibold py-3 px-8 rounded-full 
                  transform hover:scale-105 transition-all duration-300 hover:shadow-[0_0_5px_#FFD700,0_0_15px_#FFD700,0_0_25px_#FFD700]
                  font-Poppins"
              >
                SHOP NOW
              </Link>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
