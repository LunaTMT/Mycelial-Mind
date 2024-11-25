import React from 'react';
import Card from '../../components/ui/Card';

import CardWithNamedOverlay from './Card_with_named_overlay';

// Define the type for each card item
interface CardItem {
  id: number;     // The unique identifier for the card
  src: string;    // The source URL of the image
  title: string;  // The title of the card
  text: string;   // The text content of the card
}

export default function Cards() {
  const cards = [
    { id: 1, src: "/assets/images/cultivation.png", title: "Cultivation", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 2, src: "/assets/images/infused_mushroom_products.png", title: "Infused Products", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 3, src: "/assets/images/gourmet_mushrooms.png", title: "Gourmet", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 4, src: "/assets/images/medicine.png", title: "Medicine", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 5, src: "/assets/images/equipment.png", title: "Equipment", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 6, src: "/assets/images/education.png", title: "Education", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  ];
  
  return (
    <div className="relative 
                    flex flex-wrap justify-center items-center 
                    w-full h-screen
                    z-20 
                    bg-black
                    ">
      {cards.map(item => (
        //with small width div show text as scrolling down instead of touch. Could underline it line menu on click 
        <div key={item.id} className="flex justify-center 
                                      w-full h-1/2 items-stretch
                                      
                                      
                                      md:w-1/2 md:items-center 
                                      lg:w-1/3
                                      ">
          <CardWithNamedOverlay src={item.src} title={item.title} />
        </div>
      ))}
    </div>
  );
}
