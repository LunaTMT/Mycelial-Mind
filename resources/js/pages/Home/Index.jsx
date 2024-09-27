import Navbar from '../../components/ui/Navbar'; // Ensure the path is correct
import VideoPlayer from '../../components/ui/VideoPlayer';
import Cards from '../../components/ui/Cards';
import Aims from '../../components/ui/Aims';
import Values from '../../components/ui/Values';

import Reveal from '../../utils/Reveal'

import Test from '../../components/ui/Test'

import React from "react";


export default function Home() {
  


  return (
    <div className="flex flex-col w-full h-auto -z-50">
        <Navbar />
        <VideoPlayer src={"/assets/videos/time_lapse.mp4"} />


        <Test>
          <Aims />
        </Test>



        <Cards />
    

        
    </div>
  );
}
