import React, { useState } from 'react';
import CardWithNamedOverlay from './Card_with_named_overlay';


// Define the type for each card item
interface CardItem {
  id: number;     // The unique identifier for the card
  src: string;    // The source URL of the image
  title: string;  // The title of the card
  text: string;   // The text content of the card
}

export default function Cards() {
  const [clickedCardId, setClickedCardId] = useState<number | null>(null); // State to track the clicked card

  const cards = [
    { id: 1, src: "/assets/images/cultivation.png", title: "Cultivation", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 2, src: "/assets/images/infused_mushroom_products.png", title: "Infused Products", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 3, src: "/assets/images/gourmet_mushrooms.png", title: "Gourmet", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 4, src: "/assets/images/medicine.png", title: "Medicine", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 5, src: "/assets/images/equipment.png", title: "Equipment", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 6, src: "/assets/images/education.png", title: "Education", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  ];

  // Function to handle card click
  const handleCardClick = (id: number) => {
    setClickedCardId((prevId) => (prevId === id ? null : id)); // Toggle the clicked card
  };

  return (
    <>
      {cards.map(item => (
          <div
              key={item.id}
              className="flex justify-center items-center 
                        w-[50vw] h-[50vh] 
                        sm:w-full
                        lg:w-1/3"
                          // Adjust width for medium screens
          >
              <CardWithNamedOverlay
                  src={item.src}
                  title={item.title}
                  isClicked={clickedCardId === item.id}
                  onClick={() => handleCardClick(item.id)}
              />
          </div>
      ))}
    </>
  );
}

