"use client"
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    name: "Oversized Wool Coat",
    price: "$890",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000",
  },
  {
    name: "Structured Blazer",
    price: "$1,200",
    category: "Tailoring",
    image: "https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=1000",
  },
  {
    name: "Technical Trouser",
    price: "$450",
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=1000",
  },
  {
    name: "Cashmere Knit",
    price: "$680",
    category: "Knitwear",
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&q=80&w=1000",
  },
  {
    name: "Silk Drape Shirt",
    price: "$520",
    category: "Tops",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1000",
  },
  {
    name: "Leather Tote",
    price: "$1,400",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000",
  },
];

const NewArrivalsSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="new-arrivals" className="bg-black px-6 py-32 text-white md:px-12">
      <div className="mb-16 flex items-end justify-between border-b border-neutral-800 pb-8">
        <h2 className="text-[10px] tracking-[0.3em] uppercase">New Arrivals</h2>
        <a
          href="#"
          className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 transition-colors duration-300 hover:text-white"
        >
          View All
        </a>
      </div>

      {/* Horizontal scroll carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.name}
            layout
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            className="group relative flex-shrink-0 cursor-pointer"
            animate={{
              width: activeIndex === index ? 420 : 260,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
              <motion.img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
                animate={{
                  filter: activeIndex === index ? "grayscale(0)" : "grayscale(1)",
                  scale: activeIndex === index ? 1.05 : 1,
                }}
                whileHover={{ scale: 1.03, filter: "grayscale(0)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                loading="lazy"
              />

              {/* Overlay on active */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                        className="mb-1 text-[9px] tracking-[0.3em] uppercase text-neutral-400"
                      >
                        {product.category}
                      </motion.p>
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="mb-2 text-sm tracking-[0.1em] uppercase"
                      >
                        {product.name}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.4 }}
                        className="mb-4 text-xs text-neutral-300"
                      >
                        {product.price}
                      </motion.p>
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="border border-white px-6 py-2 text-[9px] tracking-[0.3em] uppercase transition-colors duration-300 hover:bg-white hover:text-black"
                      >
                        Add to Bag
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Label below card when not active */}
            <AnimatePresence>
              {activeIndex !== index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex justify-between text-[10px] tracking-[0.1em] uppercase"
                >
                  <span>{product.name}</span>
                  <span className="text-neutral-500">{product.price}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="mt-6 flex items-center justify-end gap-2 text-[9px] tracking-[0.3em] uppercase text-neutral-600">
        <span>Scroll</span>
        <motion.div
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          →
        </motion.div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
