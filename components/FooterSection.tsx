const footerLinks = {
  Shop: ["New Arrivals", "Best Sellers", "Outerwear", "Knitwear", "Accessories", "Sale"],
  // About: ["Our Story", "Sustainability", "Craftsmanship", "Press", "Careers"],
  Help: ["Contact Us", "Shipping & Returns", "Size Guide", "FAQs", "Order Tracking"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"],
};

const FooterSection = () => {
  return (
    <footer className="bg-black text-white">
      {/* Main footer */}
      <div className="px-6 pt-20 pb-12 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5 lg:gap-16">
          {/* Brand column */}
          <div className="col-span-2 mb-6 md:col-span-1 md:mb-0">
            <div className="text-sm font-bold tracking-[0.3em] uppercase mb-6">No Signal</div>
            <p className="text-[11px] leading-relaxed tracking-wide text-neutral-500 max-w-[220px]">
              Quiet luxury for those who speak through silence. Crafted with intention, worn with purpose.
            </p>
            <div className="mt-8 flex space-x-5">
              {["Instagram", "Pinterest", "TikTok"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-[10px] tracking-[0.15em] uppercase text-neutral-500 transition-colors duration-300 hover:text-white"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-neutral-400 mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[11px] tracking-wide text-neutral-500 transition-colors duration-300 hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter mini + currency */}
        <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-neutral-800 pt-10 md:flex-row md:items-end">
          {/* <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-3">
              Stay in the loop
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent border-b border-neutral-700 px-0 py-2 text-[11px] tracking-wide text-white placeholder:text-neutral-600 outline-none w-52 transition-colors focus:border-white"
              />
              <button className="ml-4 text-[10px] tracking-[0.2em] uppercase text-neutral-400 transition-colors duration-300 hover:text-white">
                Subscribe
              </button>
            </div>
          </div> */}

          <div className="flex items-center gap-6 text-[10px] tracking-[0.15em] uppercase text-neutral-600">
            <span>USD $ | NGN ₦</span>
            <span className="text-neutral-800">|</span>
            <span>English</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-900 px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <span className="text-[10px] tracking-[0.15em] uppercase text-neutral-600">
            &copy; 2026 No Signal. All Rights Reserved.
          </span>
          <div className="flex gap-6 text-[10px] tracking-[0.15em] uppercase text-neutral-600">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
