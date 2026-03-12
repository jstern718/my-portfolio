'use client';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import GhostWebpage from '@/components/GhostWebpage';

export default function Home() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Text fades out as ghost builds, then fades back in
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 0.9],
    [1, 0.15, 0.15, 1]
  );

  // Arrow fades out early
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Contact button only appears after ghost is complete
  const buttonOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.85, 0.95], [20, 0]);

  // Ghost fades out completely at the very end
  const ghostOpacity = useTransform(scrollYProgress, [0.75, 0.88], [1, 0]);

  return (
    <>
      <section ref={sectionRef} className="relative min-h-[600vh] bg-primary">
        <div className="sticky top-0 h-screen flex items-center">

          {/* Ghost — absolute, behind everything */}
          <div className="absolute inset-0 pointer-events-none">
            <GhostWebpage scrollYProgress={scrollYProgress} ghostOpacity={ghostOpacity} />
          </div>

          {/* Foreground text */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="relative z-10 px-8 md:px-20 max-w-2xl w-full pt-24"
          >
            <div className="opacity-90 py-4">
              <p className="text-highlight font-sans text-sm tracking-widest mb-3 opacity-70">
                freelance consultancy
              </p>
              <h1 className="font-display text-6xl font-bold tracking-widest text-white leading-tight mb-0">
                UNCOMMON
              </h1>
              <h2 className="font-display text-4xl font-thin -tracking-tighter text-white leading-tight mb-3 pt-0">
                Design & Development
              </h2>
            </div>

            <div className="opacity-70 font-extralight">
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
                I help small businesses show their best face to the world, building beautiful digital experiences ... from websites and apps to original art and custom swag.
              </p>

              {/* Contact button — only appears after ghost completes */}
              <motion.div
                style={{ opacity: buttonOpacity, y: buttonY }}
                className="text-center max-w-md"
              >
                <button className="px-14 py-4 -ml-3 mb-3 border-2 border-white text-white font-sans font-semibold rounded-full hover:bg-white hover:text-primary transition-all duration-300">
                  Get in Touch
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll arrow — fades out after first scroll */}
          <motion.div
            style={{ opacity: arrowOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          >
            <span className="text-white/50 font-sans text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/50">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>

        </div>
      </section>
    </>
  );
}