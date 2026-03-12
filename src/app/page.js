'use client';
import { useScroll } from 'framer-motion';
import { useRef } from 'react';
import GhostWebpage from '@/components/GhostWebpage';

export default function Home() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <>
      {/* Page 1 - Hero */}
      <section ref={sectionRef} className="relative min-h-[400vh] bg-primary">
        {/* Sticky container so content stays while scrolling */}
        <div className="sticky top-5 h-screen flex items-center">
          {/* Ghost webpage assembles behind */}
          <GhostWebpage scrollYProgress={scrollYProgress} />
          {/* Foreground content */}
          <div>
            <div className="relative z-10 px-8 md:px-20 max-w-2xl opacity-90">
              <p className="text-highlight font-sans text-sm tracking-widest mb-3 opacity-70">
                freelance consultancy
              </p>
              <h1 className="font-display text-6xl md:text-6xl font-bold tracking-widest text-shadow-lg/20 text-white leading-13 mb-0">
                UNCOMMON
              </h1>
              <h2 className="font-display text-4xl md:text-4xl font-thin -tracking-tighter text-shadow-lg/20 text-white leading-13 mb-3 pt-0">
                Design & Development
              </h2>
            </div>
            <div className="relative z-10 px-8 md:px-20 max-w-2xl opacity-70 font-extralight">
              <p className="text-white/70 text-lg tracking-tight font-light mb-3 max-w-md">
                Design is no longer optional. Every detail, from your online presence to the logo on your shirt, tells a story. But does it tell the story you need it to?
              </p>
              <p className="text-white/70 text-base mb-3 max-w-md">
                You have a small business. Do you really need something different? With all the tools that are now available, you might be able to make everything your business needs on your own.
              </p>
              <p className="text-white/70 text-base tracking-tight mb-3 max-w-md">
                But should you? Small need not be unremarkable. Common need not be commonplace. And ordinary need not be familiar.
              </p>
              <p className="text-white/70 text-base tracking-tight mb-6 max-w-md">
                I help small businesses show their best face to world, building beautiful digital experiences ... from websites and apps to original art and custom swag.
              </p>
              <div className="text-center max-w-md">
                <button className="px-14 py-4 -ml-3 mb-3 border-2 border-white text-white font-sans font-semibold rounded-full hover:bg-white hover:text-primary transition-all duration-300">
                  Get in Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}