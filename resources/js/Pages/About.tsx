import React from "react";
import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import Section from '@/Pages/About/Section';

import DownwardArrow from "./About/DownwardArrow";

interface AboutProps {
    auth: { user: any } | null;
}

const About: React.FC<AboutProps> = ({ auth }) => {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    const sections = [
        {
            title: "MYCENIC",
            subtitle: "A newly established company committed to delivering the highest level of professionalism in the field of mycology.",
            content: ""
        },
        {
            title: "WHO ARE WE?",
            subtitle: "We are a passionate and emerging company dedicated to the fascinating world of mycology.",
            content: "At our core, we are driven by a deep respect for fungi and the scientific and creative potential they hold for humanity."
        },
        {
            title: "WHAT DO WE DO?",
            subtitle: "We are dedicated to offering premium products and services to enthusiasts and professionals alike.",
            content: "Whether you're a curious beginner or an experienced mycologist, we aim to provide top-quality products and expert resources that inspire and support your mycological journey. Currently, we specialize in selling high-quality spores for a variety of mycological applications."
        },
        {
            title: "FUTURE PLANS",
            subtitle: "Our vision is to become the leading and most trusted company in the UK for all types of mycological supplies.",
            content: "In the near future, we plan to expand our product range to include medicinal and gourmet mushrooms, infused products, a broad selection of spores from many different species, comprehensive grow kits ranging from simple setups to large-scale, our own self-produced substrate, agar, and affordable laminar flow hoods."
        }
    ];

    return (
        <Layout>
            <Head title="About" />

            <div className="min-h-screen relative w-full flex flex-col justify-center items-center  ">
                

                

               

                
                

                {/* Sections */}
                {sections.map((section, index) => (
                    <Section
                        key={index}
                        index={index} // Pass index to determine animation behavior
                        title={section.title}
                        subtitle={section.subtitle}
                        content={section.content}
                    />
                ))}
            </div>
        </Layout>
    );
};

export default About;
