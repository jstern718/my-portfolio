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

  let items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];


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
              <div className="max-w-5xl mt-50 mx-auto">
                <div className="bg-work/70 m-1 mb-3 pt-3 pb-3 outline-4 outline-solid outline-black rounded-xl
                border-solid border-e-olive-500 border-b-olive-500 border-t-olive-400 border-s-olive-400 border-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl
                    font-normal text-black
                    mb-2 p-3 whitespace-normal
                    text-shadow-[0.3px_0.3px_0px] text-shadow-neutral-800
                    h-[1.8em] overflow-hidden">
                    <span className="inline-block whitespace-pre">✱</span>
                    <span className="inline-block whitespace-pre"> ✱ </span>
                    <span className="text-white font-inter opacity-85 text-shadow-black [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black]">
                    To stand out,  </span>
                    <span className="text-white font-knewave text-shadow-black [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black]">
                    COMMON GOODS  </span>
                    <span className="text-white font-inter opacity-85 text-shadow-black [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black]">
                    require</span>
                    {items.map((item, index) => (
                        <span className="inline-block whitespace-pre" key={index}> ✱</span>
                    ))}
                </h1>
                <hr class="border-gray-400 border-1"/>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl
                    font-inter font-extrabold text-black
                    -mb-2 sm:-mb-3 p-4 xs:pt-4 sm:pt-4 md:pt-3 lg:pt-3 whitespace-normal
                    text-shadow-[0.3px_0.3px_0px] text-shadow-neutral-800
                    h-[1.3em] sm:h-[1.2em] md:h-[1.1em] overflow-hidden">UNCOMMON
                    <span className="text-blue-50 opacity-70 text-shadow-black [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black]"> ✱ </span>
                    <span className="text-blue-50 opacity-70 text-shadow-black [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black] inline-block whitespace-pre"> ✱</span>
                    <span className="text-blue-50 opacity-70 text-shadow-black [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black] inline-block whitespace-pre"> ✱</span>
                    <span className="text-blue-50 opacity-70 text-shadow-black [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black] inline-block whitespace-pre"> ✱</span>
                    <span className="text-blue-50 opacity-70 text-shadow-black [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black] inline-block whitespace-pre"> ✱</span>

                </h1>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl
                    font-inter font-extrabold text-black tracking-[0.1em]
                    -mb-3 p-3 sm:pt-4 md:pt-3 lg:pt-3 whitespace-normal
                    text-shadow-[0.3px_0.3px_0px] text-shadow-neutral-800
                    h-[1.3em] sm:h-[1.4em] md:h-[1.1em] overflow-hidden">
                    <span className="inline-block whitespace-pre">✱ </span>
                    <span className="text-highlight opacity-90">DESIGN</span>
                    <span className="inline-block whitespace-pre"> ✱ </span>
                    <span className="inline-block whitespace-pre">✱ </span>
                    <span className="inline-block whitespace-pre">✱ </span>
                    <span className="inline-block whitespace-pre">✱ </span>
                </h1>
                <p className="font-inter text-white font-bold tracking-[-0.04em]
                    text-3xl sm:text-4xl md:text-5xl lg:5xl xl:6xl
                    p-3 pl-4 mb-2
                    h-[1.8em] sm:h-[1.6em] md:h-[1.3em] overflow-hidden">
                    <span className="text-white opacity-50 inline-block whitespace-pre [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black]">✱</span>
                    <span className="text-white opacity-50 inline-block whitespace-pre [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black]">  ✱  </span>
                    <span className="text-black opacity-90">
                    & DEVELOPMENT
                    </span>
                    {items.map((item, index) => (
                        <span className="text-white opacity-50 inline-block whitespace-pre [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black]" key={index}>  ✱</span>
                    ))}
                </p>
                <hr class="border-gray-400 border-1 -mb-1"/>
                <h1 className="text-lg sm:text-2xl md:text-3xl
                    font-inter font-extrabold text-black tracking-[0.03em]
                    mb-1 -mt-2 p-3 s:pt-5 sm:pt-4 md:pt-3 lg:pt-3 whitespace-normal
                    text-shadow-[0.3px_0.3px_0px] text-shadow-neutral-800
                    h-[1.6em] sm:h-[1.8em] md:h-[1.3em] overflow-hidden">
                    <span className="text-black opacity-65 inline-block whitespace-pre">*</span>
                    {items.map((item, index) => (
                        <span className="text-black opacity-65 inline-block whitespace-pre" key={index}>  *</span>
                    ))}

                </h1>
                <hr class="border-gray-400 border-1"/>
                <p className="font-inter text-black font-bold tracking-[0.01em]
                    text-md sm:text-xl md:text-2xl
                    p-3 pl-4 -mb-3
                    h-[2em] sm:h-[2em] md:h-[2em] overflow-hidden">
                    <span className="text-black inline-block whitespace-pre">✱</span>
                    <span className="text-black inline-block whitespace-pre">   ✱  </span>
                    <span> helping small businesses and private</span>
                    {items.map((item, index) => (
                        <span className="text-white/97 inline-block whitespace-pre [text-shadow:.2_.2_.2px_black,-.2_-.2_.2px_black]" key={index}>  ✱ </span>
                    ))}
                </p>

                <p className="font-inter text-black font-bold tracking-[-0.01em]
                    text-md sm:text-xl md:text-2xl
                    p-3 pl-4
                    h-[2em] sm:h-[2em] md:h-[2em] overflow-hidden">
                    <span className="text-black inline-block whitespace-pre">✱  </span>
                    <span>customers to put their best foot forward</span>
                    <span className="text-black inline-block whitespace-pre">     ✱</span>
                    {items.map((item, index) => (
                        <span className="text-black inline-block whitespace-pre" key={index}> ✱ </span>
                    ))}
                </p>
              </div>
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