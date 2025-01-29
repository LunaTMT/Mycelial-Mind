import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

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
    description: "Everything you need to cultivate your own mushrooms at home with ease."
  },
  { 
    id: 2, 
    text: "SPORES", 
    image: "/assets/images/grid/spore_syringe2.png",
    description: "High-quality mushroom spores, perfect for microscopy and research purposes."
  },
  { 
    id: 3, 
    text: "SPAWN", 
    image: "/assets/images/grid/spawn.png",
    description: "Colonized grain spawn for reliable and efficient mushroom growth."
  },
  { 
    id: 5, 
    text: "INFUSED", 
    image: "/assets/images/grid/infused.png",
    description: "Explore our selection of infused mushroom products designed for wellness."
  },
];

export default function Products() {
    return (
      <div className="w-full h-[94vh] flex flex-col items-center justify-center  dark:bg-gradient-to-t dark:from-slate-800">
        
        <h1 className="text-7xl font-Audrey text-black  dark:text-transparent dark:bg-clip-text 
        bg-red-400
            dark:bg-gradient-to-t  dark:from-[#e7e77a] dark:to-white 
            leading-tight
            dark:text-#f5f5dc
            dark:text-shadow-beige-glow">
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
          className="mySwiper w-[50%] h-[65vh] relative bg-purple-400"
        >
          {items.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex flex-col items-center justify-center dark:text-white rounded-lg dark:bg-gradient-to-t dark:from-slate-800 via-transparent to-transparent"
            >
              {/* Image */}
              <div className="flex justify-center items-center mx-auto w-[350px] h-[350px] bg-red-400">
                <img
                  src={item.image}
                  alt={item.text}
                  className="w-full h-full object-cover"
                />
              </div>
  
              {/* Text */}
              <div className="text-center">
                <h2 className="text-4xl font-bold font-Audrey mb-4">{item.text}</h2>
                <p className="text-lg mb-7">{item.description}</p>
                <a
                  href="https://www.trustpilot.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block 
                  bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-semibold py-3 px-8 rounded-full 
                  transform hover:scale-105 transition-all duration-300 hover:shadow-[0_0_5px_#FFD700,0_0_15px_#FFD700,0_0_25px_#FFD700]"
                >
                  SHOP NOW
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
}
