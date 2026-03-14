const PhilosophySection = () => {
  return (
    <section id="editorial" className="flex flex-col items-center justify-center bg-black px-6 py-32 text-white md:px-12">
      <div className="grid w-full max-w-7xl grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
        <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-900 transition-transform duration-1000 hover:scale-[1.02]">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
            alt="Editorial fashion photograph"
            className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col space-y-8">
          <h2 className="text-4xl font-light leading-tight tracking-tighter md:text-6xl">
            The luxury of <br />
            <span className="italic">absolute silence.</span>
          </h2>
          <p className="max-w-md text-sm leading-loose text-neutral-400">
            We believe in the permanence of form. Our garments are constructed in limited runs using ethically sourced Japanese textiles and Italian craftsmanship. No logos. No noise. Just signal.
          </p>
          <a
            href="#"
            className="w-fit border-b border-neutral-700 pb-1 text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 hover:border-white"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
