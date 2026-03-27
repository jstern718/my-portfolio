'use client';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import GhostWebpage from '@/components/GhostWebpage';

export default function Home() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const [ctaVisible, setCtaVisible] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Text fades out as ghost builds, then fades back in
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 0.9],
    [1, 0.15, 0.15, 1]
  );

  // Arrow fades out early
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Buttons: visible on load, fade out with text, reappear after ghost completes
  const buttonOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 0.95],
    [1, 0, 0, 1]
  );
  const buttonY = useTransform(
    scrollYProgress,
    [0.85, 0.95],
    [20, 0]
  );

  // Ghost fades out completely at the very end
  const ghostOpacity = useTransform(scrollYProgress, [0.75, 0.88], [1, 0]);

  // Reset CTA when user scrolls back to top or hasn't scrolled yet
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      if (v < 0.05) {
        setCtaVisible(true);
        setContactOpen(false);
        setSubmitted(false);
      }
    });
  }, [scrollYProgress]);

  const handleLearnMore = () => {
    setCtaVisible(false);
    setContactOpen(false);
  };

  const handleGetInTouch = () => {
    setContactOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section ref={sectionRef} className="relative min-h-[600vh] bg-primary">
        <div className="sticky top-0 h-screen flex items-center">

          {/* Ghost — absolute, behind everything */}
          <div className="absolute inset-0 pointer-events-none">
            <GhostWebpage scrollYProgress={scrollYProgress} ghostOpacity={ghostOpacity} />
          </div>

          {/* Foreground text — left-aligned on mobile, centered on large screens */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="relative z-10 px-8 md:px-20 w-full pt-24 flex flex-col items-start lg:items-center lg:text-center"
          >
            {/* Header block */}
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

            {/* Body text */}
            <div className="opacity-70 font-extralight max-w-md">
              <p className="text-white/70 text-lg tracking-tight font-light mb-3">
                Design is no longer optional. Every detail, from your online presence to the logo on your shirt, tells a story. But does it tell the story you need it to?
              </p>
              <p className="text-white/70 text-base mb-3">
                You have a small business. Do you really need something different? With all the tools that are now available, you might be able to make everything your business needs on your own.
              </p>
              <p className="text-white/70 text-base tracking-tight mb-3">
                But should you? Small need not be unremarkable. Common need not be commonplace. And ordinary need not be familiar.
              </p>
              <p className="text-white/70 text-base tracking-tight mb-6">
                I help small businesses show their best face to the world, building beautiful digital experiences ... from websites and apps to original art and custom swag.
              </p>
            </div>
          </motion.div>

          {/* CTA buttons — independent opacity: visible on load, fade out during scroll, reappear at end */}
          <motion.div
            style={{ opacity: buttonOpacity, y: buttonY, bottom: '18%' }}
            className="absolute z-10 px-8 md:px-20 w-full flex flex-col items-start lg:items-center"
          >
            <div className="max-w-md w-full">
              {/* Dual pill buttons */}
              <AnimatePresence>
                {ctaVisible && !contactOpen && (
                  <motion.div
                    key="cta-buttons"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="flex gap-3 mb-3 lg:justify-center"
                  >
                    {/* Learn More — solid white */}
                    <button
                      onClick={handleLearnMore}
                      className="px-7 py-3 bg-white text-primary font-sans font-semibold rounded-full hover:bg-white/90 transition-all duration-300 text-sm"
                    >
                      Learn More
                    </button>

                    {/* Get in Touch — outline */}
                    <button
                      onClick={handleGetInTouch}
                      className="px-7 py-3 border-2 border-white text-white font-sans font-semibold rounded-full hover:bg-white/10 transition-all duration-300 text-sm"
                    >
                      Get in Touch
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Inline contact form */}
              <AnimatePresence>
                {contactOpen && (
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                  >
                    {submitted ? (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white/80 font-light text-base py-4"
                      >
                        Thanks! I'll be in touch soon.
                      </motion.p>
                    ) : (
                      <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3"
                      >
                        <input
                          type="text"
                          placeholder="Name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-white placeholder-white/40 font-light text-sm focus:outline-none focus:border-white/70 transition-colors duration-200"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-white placeholder-white/40 font-light text-sm focus:outline-none focus:border-white/70 transition-colors duration-200"
                        />
                        <textarea
                          placeholder="What should we know? How can we help?"
                          required
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-white placeholder-white/40 font-light text-sm focus:outline-none focus:border-white/70 transition-colors duration-200 resize-none"
                        />
                        <div className="flex gap-3 lg:justify-center">
                          <button
                            type="submit"
                            className="px-7 py-3 bg-white text-primary font-sans font-semibold rounded-full hover:bg-white/90 transition-all duration-300 text-sm"
                          >
                            Send
                          </button>
                          <button
                            type="button"
                            onClick={() => setContactOpen(false)}
                            className="px-7 py-3 border-2 border-white/40 text-white/60 font-sans font-semibold rounded-full hover:border-white/70 hover:text-white/80 transition-all duration-300 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
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
