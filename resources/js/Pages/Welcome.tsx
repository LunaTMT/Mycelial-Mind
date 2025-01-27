import React from "react";
import { Head } from '@inertiajs/react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';


import { IoHomeOutline } from 'react-icons/io5';
import { TbTruckDelivery } from "react-icons/tb";
import { PiHandCoins } from "react-icons/pi";
import { TbPigMoney } from "react-icons/tb";

import VideoPlayer from "@/Components/Video/VideoPlayer";
import CustomerReviews from "./Home/CustomerReviews";
import FadeInOut from "@/Components/Animations/FadeInOut";
import ProductCarousel from "@/Pages/Home/ProductCarousel";
import StatisticsGrid from "./Home/StatisticsGrid";
import StarsGrid from "./Home/StarsGrid";



// Define the types for the page props
interface WelcomeProps {
  auth: { user: any };
  laravelVersion: string;
  phpVersion: string;
}

const Welcome: React.FC<WelcomeProps> = ({
  auth,
  laravelVersion,
  phpVersion,
}) => {
  const IconClass = "w-full p-5 h-auto";

  // Define slide data
  const slides = [
    { icon: <TbTruckDelivery className={IconClass} />, text: "Free Deliveries" },
    { icon: <PiHandCoins className={IconClass} />, text: "Money back guaranteed" },
    { icon: <TbPigMoney className={IconClass} />, text: "Lowest prices in the UK" },
    { icon: <IoHomeOutline className={IconClass} />, text: "All products make in the UK" },
  ];

  const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;




  return (
    <>
      <Layout header={<></>}>
        <Head title="Welcome" />
       
          <VideoPlayer src="/assets/videos/time_lapse.mp4" />
      

 
        
          <ProductCarousel  />
        

 
          <StatisticsGrid />
     
      

      
          <CustomerReviews />
       

  
      </Layout>
    </>
  );
};

export default Welcome;
