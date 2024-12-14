import React, { useEffect, useState } from 'react';

import VideoPlayer from '../../components/ui/VideoPlayer';
import Navbar from '../../components/ui/Navbar';
import Cards from '../../components/ui/Cards';


import CompanyInfo from './CompanyInfo';
import Section from '../../components/ui/Section';

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
    <div className="relative flex flex-col w-full h-auto overflow-y-hidden">
     
      <div className={`absolute flex justify-center items-start 
        w-full h-screen 
        pt-10
        z-50 text-white border border-red-500`}>
        <Navbar />
      </div>


  
      <VideoPlayer src="/assets/videos/time_lapse.mp4" />
      
   
      <div className="relative">
        <CompanyInfo />
      </div>  

      
      <Section title='Infused Products' text="" images_folder_name='shiitake' number_of_images={268}/>
      <Section title='Gourmet'          text="" images_folder_name='yellow' number_of_images={153}/>
      <Section title='Medicine'         text="" images_folder_name='small' number_of_images={172}/>
      <Section title='Equipment'        text="" images_folder_name='white' number_of_images={212}/>
      <Section title='Education'        text="" images_folder_name='yellow2' number_of_images={176}/>

    

      
   


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
