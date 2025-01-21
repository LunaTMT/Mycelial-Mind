import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/Login/ApplicationLogo';
import MouseColorChanger from '@/Components/Background/LightCircles';
import CompanyInfo from '@/Pages/Home/CompanyInfo';
import WelcomeCard from "@/Components/Cards/WelcomeCard";
import Navbar from '@/Components/Nav/Menu';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import VideoPlayer from "@/Components/Video/VideoPlayer";
import { CiLogin } from 'react-icons/ci';
import { IoHomeOutline } from 'react-icons/io5';
import { BsShop } from "react-icons/bs";
import { GrResources } from "react-icons/gr";
import { FaInfoCircle } from "react-icons/fa";
import CustomerReviews from "./Home/CustomerReviews";
import FadeInOut from "@/Components/Animations/FadeInOut";
import FreeDelivery from "./Home/FreeDelivery";
import MoneyBackGuarantee from "./Home/MoneyBackGuarantee";
import ImageGrid from "@/Components/Grid/ImageGrid";
import EmblaCarousel from "@/Components/Carousel/statistics";
import { EmblaOptionsType } from 'embla-carousel';

import { TbTruckDelivery } from "react-icons/tb";
import { PiHandCoins } from "react-icons/pi";
import { TbPigMoney } from "react-icons/tb";

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
  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = slides.length;

  return (
    <>
      <Layout header={<></>}>
        <Head title="Welcome" />
        <FadeInOut>
          <VideoPlayer src="/assets/videos/time_lapse.mp4" />
        </FadeInOut>

        <FadeInOut>
          <ImageGrid />
        </FadeInOut>



        <EmblaCarousel slides={slides} options={OPTIONS} />

        <FadeInOut>
          <CustomerReviews />
        </FadeInOut>
      </Layout>
    </>
  );
};

export default Welcome;
