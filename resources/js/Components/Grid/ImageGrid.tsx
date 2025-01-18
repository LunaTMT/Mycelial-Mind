import { motion } from 'framer-motion';

export default function ImageGrid() {
    const items = [
        { id: 1, text: "Grow Kits",         image: "/assets/images/grid/grow_kits.png" },
        { id: 2, text: "Spores",            image: "/assets/images/grid/spore_syringe.png" },
        { id: 3, text: "Spawn",             image: "/assets/images/grid/spawn.png" },
        { id: 4, text: "Gourmet",           image: "/assets/images/grid/gourmet.png" },
        { id: 5, text: "Infused Products",  image: "/assets/images/grid/infused.png" },
        { id: 6, text: "Medicinal",         image: "/assets/images/grid/medicinal.png" },
        { id: 7, text: "Foraging",          image: "/assets/images/grid/foraging.png" },
        { id: 8, text: "Microscopy",        image: "/assets/images/grid/microscopy.png" },
        { id: 9, text: "Paraphernalia",     image: "/assets/images/grid/paraphernalia.png" },
    ];

    return (
        <div className="grid grid-cols-3 gap-2 w-full min-h-[85vh]">
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    className="relative overflow-hidden rounded-lg h-[28vh] group bg-white"
                    initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly translated down
                    whileInView={{ opacity: 1, y: 0 }} // Animate to full opacity and original position
                    viewport={{ once: true, amount: 0.5 }} // Trigger when 80% of the element is in view
                    transition={{ duration: 0.5, delay: index * 0.2 }} // Delay staggered animation for each item
                >
                    {/* Image with scale on hover */}
                    <motion.img
                        src={item.image}
                        alt={item.text}
                        className="w-full h-full object-contain"
                    />
                    {/* Hover text */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-white text-4xl font-Aileron_Thin">{item.text}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
