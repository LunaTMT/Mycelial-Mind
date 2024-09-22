import Card from '../../components/ui/Card';

export default function Cards() {
    const cards = [
        { id: 1, src: "/assets/images/mushroom_cultivation_card.png", title: "Cultivation", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 2, src: "/assets/images/infused_mushroom_products.png", title: "Infused Products", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 3, src: "/assets/images/gourmet_mushrooms_card.png", title: "Gourmet", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 4, src: "/assets/images/medicine_card.png", title: "Medicine", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 5, src: "/assets/images/paraphernalia_card.png", title: "Paraphernalia", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
    ];

    return (
        <div className='flex flex-wrap justify-evenly w-full max-w-screen-lg mx-auto p-5'> {/* Adjust max-width for larger screens */}
            {cards.map(item => (
                <div key={item.id} className='w-full sm:w-1/2  md:w-1/3 lg:w-1/3 p-2'>
                    <Card src={item.src} title={item.title} text={item.text} />
                </div>
            ))}
        </div>
    );
}
