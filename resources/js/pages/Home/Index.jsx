import Navbar from '../../components/ui/Navbar'; // Ensure the path is correct
import VideoPlayer from '../../components/ui/VideoPlayer';
import Cards from '../../components/ui/Cards';
import CompanyInfo from './CompanyInfo';

import Values from './Values';

import Reveal from '../../utils/Reveal'

import VideoScroll from '../../components/ui/VideoScroll'


import React from "react";


export default function Home() {
  


  return (
    <div className="flex flex-col w-full h-auto -z-50 ">
        <Navbar />
        <VideoPlayer src={"/assets/videos/time_lapse.mp4"} />

        


        <VideoScroll src={"/assets/videos/Mushroom_Growth.mp4"} />
        


          <Reveal>
            <CompanyInfo />
          </Reveal>




        <Reveal>
          <Cards />
        </Reveal>
    

        
    </div>
  );
}
