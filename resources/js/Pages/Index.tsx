import React, { useEffect, useState } from 'react';

import VideoPlayer from '../Components/Video/VideoPlayer';
import Navbar from '../Components/Nav/Menu';

import Cards from './Home/Cards';
import Section from './Home/Section';
import ScrollTop from '../Components/Buttons/ScrollToTopButton';

import CompanyInfo from './Home/CompanyInfo';


import Lenis from 'lenis';



const lenis = new Lenis({
  lerp: 0.1 , // Smoothing value
  smoothWheel: true, // Smooth scrolling with mouse wheel
});

// Use the requestAnimationFrame loop to keep Lenis running
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const logScrollPosition = ({ scroll }) => {
      setScrollY(scroll);
    };

    lenis.on('scroll', logScrollPosition);

    return () => {
      lenis.off('scroll', logScrollPosition);
    };
  }, []);


  return (
    <div className="relative flex flex-col w-full h-auto overflow-y-hidden
    
          border-2
          sm:border-red-600
          md:border-blue-500
          lg:border-purple-500
          xl:border-green-400

    ">
     
      {/* Components */}
      <Navbar />
      <ScrollTop />
      <VideoPlayer src="/assets/videos/time_lapse.mp4" />
      

      {/* Section */}
      <div className="relative">
        <CompanyInfo />
      </div>  

      {/* Section */}
      <Section title='INFUSED PRODUCTS' text="" images_folder_name='shiitake' number_of_images={268}/>
      <Section title='GOURMET'          text="" images_folder_name='yellow' number_of_images={153}/>
      <Section title='MEDICINE'         text="" images_folder_name='small' number_of_images={172}/>
      <Section title='EQUIPMENT'        text="" images_folder_name='white' number_of_images={212}/>
      <Section title='EDUCATION'        text="" images_folder_name='yellow2' number_of_images={176}/>

      

        
   


        {/*

        offset: ["start start", "end start"],

        */}

      


     
        



      <div className="relative 
                    flex flex-wrap justify-center items-center 
                    w-full h-auto
                    z-30 ">
        <Cards />
      </div>
    </div>
  );
}
