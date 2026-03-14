"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=1200",
];

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-svh overflow-hidden bg-black text-white">
      {/* Background image crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={activeIndex}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: easeOut }}
        >
          <img
            src={images[activeIndex]}
            alt=""
            className="h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Grain overlay */}
      <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />

      {/* Floating side thumbnails — desktop only */}
      <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex lg:left-12">
        {images.map((img, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative h-16 w-12 overflow-hidden transition-all duration-700 ${
              i === activeIndex ? "ring-1 ring-white" : "opacity-40 hover:opacity-70"
            }`}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            <img src={img} alt="" className="h-full w-full object-cover grayscale" />
          </motion.button>
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6">
        {/* Season tag */}
        <motion.span
          className="mb-6 text-[10px] tracking-[0.5em] uppercase text-neutral-400"
          initial={{ opacity: 0, y: 20 }}
          animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: easeOut }}
        >
          Autumn / Winter 2024
        </motion.span>

        {/* Brand — letter-by-letter stagger */}
        <div className="mb-6 flex overflow-hidden">
          {"NO SIGNAL".split("").map((char, i) => (
            <motion.span
              key={i}
              className={`inline-block text-[14vw] font-extralight leading-[0.85] tracking-[-0.04em] md:text-[10vw] ${char === " " ? "w-[3vw] md:w-[2vw]" : ""}`}
              initial={{ y: "110%" }}
              animate={hasLoaded ? { y: "0%" } : {}}
              transition={{
                duration: 1.2,
                delay: 0.4 + i * 0.06,
                ease: easeOut,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Tagline with line reveal */}
        <motion.p
          className="mb-10 max-w-lg text-center text-sm font-light leading-relaxed tracking-wide text-neutral-300 md:text-base"
          initial={{ opacity: 0, y: 30 }}
          animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 1.4, ease: easeOut }}
        >
          Precision garments for those who speak in silence.
          <br />
          <span className="text-neutral-500">Constructed. Considered. Permanent.</span>
        </motion.p>

        {/* CTA with border animation */}
        <motion.a
          href="#new-arrivals"
          className="group relative overflow-hidden border border-white/30 px-14 py-4 text-[10px] tracking-[0.3em] uppercase transition-colors duration-700 hover:border-white"
          initial={{ opacity: 0, y: 20 }}
          animate={hasLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.8, ease: easeOut }}
        >
          <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
            Shop New Arrivals
          </span>
          <span className="absolute inset-0 z-0 origin-left scale-x-0 bg-white transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
        </motion.a>
      </div>

      {/* Bottom progress indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="group relative h-[1px] w-8 bg-neutral-700 overflow-hidden"
          >
            <span
              className={`absolute inset-y-0 left-0 bg-white transition-all ${
                i === activeIndex
                  ? "w-full duration-[4500ms] ease-linear"
                  : "w-0 duration-300"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-6 z-20 flex flex-col items-center gap-2 md:right-12"
        initial={{ opacity: 0 }}
        animate={hasLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-[8px] tracking-[0.3em] uppercase text-neutral-500 [writing-mode:vertical-lr]">
          Scroll
        </span>
        <motion.div
          className="h-8 w-[1px] bg-neutral-500"
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
