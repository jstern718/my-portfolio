'use client';
import { useTransform, motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import GhostWebpage from '@/components/GhostWebpage';

// Fades in a paragraph when it enters the viewport (one-way)
function useFadeInOnScroll(threshold = 0.3) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export default function Home() {
  // Manual progress value 0→1 driven by wheel/touch during hijack
  const ghostProgress = useMotionValue(0);

  const sentinelRef = useRef(null); // marks where hijack should begin
  const hijackRef   = useRef(false);
  const progressRef = useRef(0);
  const touchStartY = useRef(null);

  const [hijacking, setHijacking] = useState(false);

  // Contact form
  const [contactOpen, setContactOpen] = useState(false);
  const [formData, setFormData]       = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted]     = useState(false);

  // Paragraph fade-ins for below-ghost paras (after hijack ends)
  const [para3Ref, para3Visible] = useFadeInOnScroll(0.3);
  const [para4Ref, para4Visible] = useFadeInOnScroll(0.3);

  // Top paras fade slightly as ghost grows
  const topParaOpacity = useTransform(ghostProgress, [0, 0.5, 1], [1, 0.55, 0.4]);

  // Ghost scale — desktop and mobile variants
  const ghostScaleDesktop = useTransform(ghostProgress, [0, 1], [0.58, 1]);
  const ghostScaleMobile  = useTransform(ghostProgress, [0, 1], [0.38, 0.78]);

  // Ghost opacity fades out near the end of its build
  const ghostOpacity = useTransform(ghostProgress, [0.75, 0.95], [1, 0]);

  // Bottom paras ungray as ghost completes
  const bottomParaOpacity = useTransform(ghostProgress, [0.7, 1], [0.3, 1]);
  const bottomParaFilter  = useTransform(ghostProgress, [0.7, 1], ['blur(1px)', 'blur(0px)']);

  // ── Scroll hijack ────────────────────────────────────────────────────────

  const releaseHijack = useCallback(() => {
    hijackRef.current = false;
    setHijacking(false);
    document.body.style.overflow = '';
  }, []);

  const advanceProgress = useCallback((delta) => {
    const next = Math.min(1, Math.max(0, progressRef.current + delta));
    progressRef.current = next;
    ghostProgress.set(next);

    if (next >= 1) {
      releaseHijack();
      requestAnimationFrame(() => window.scrollBy({ top: 2 }));
    }
    if (next <= 0 && delta < 0) {
      releaseHijack();
    }
  }, [ghostProgress, releaseHijack]);

  const onWheel = useCallback((e) => {
    if (!hijackRef.current) return;
    e.preventDefault();
    advanceProgress(e.deltaY / 800);
  }, [advanceProgress]);

  const onTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchMove = useCallback((e) => {
    if (!hijackRef.current) return;
    e.preventDefault();
    const dy = touchStartY.current - e.touches[0].clientY;
    touchStartY.current = e.touches[0].clientY;
    advanceProgress(dy / 400);
  }, [advanceProgress]);

  // Sentinel observer — engages hijack when sentinel reaches top ~20% of viewport
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hijackRef.current && progressRef.current < 1) {
          hijackRef.current = true;
          setHijacking(true);
          document.body.style.overflow = 'hidden';
        } else if (!entry.isIntersecting && hijackRef.current) {
          releaseHijack();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -80% 0px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [releaseHijack]);

  // Attach event listeners
  useEffect(() => {
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [onWheel, onTouchStart, onTouchMove]);

  useEffect(() => () => { document.body.style.overflow = ''; }, []);

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  const items = Array.from({ length: 31 }, (_, i) => i);

  const paraBase   = 'transition-[opacity,filter] duration-700 ease-out';
  const paraHidden = 'opacity-30 blur-[1px]';
  const paraShown  = 'opacity-100 blur-0';

  return (
    <div className="bg-primary">

      {/* ── 1. HEADER — normal flow, scrolls away ── */}
      <div className="px-8 md:px-20 pt-24 pb-16 flex flex-col items-start lg:items-center lg:text-center">
        <div className="max-w-5xl mx-auto">
          <div className="bg-work/70 m-1 mb-3 pt-3 pb-3 outline-4 outline-solid outline-black rounded-xl
              border-solid border-e-olive-500 border-b-olive-500 border-t-olive-400 border-s-olive-400 border-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-normal text-black mb-2 p-3 whitespace-normal
                text-shadow-[0.3px_0.3px_0px] text-shadow-neutral-800 h-[1.8em] overflow-hidden">
              <span className="inline-block whitespace-pre">✱</span>
              <span className="inline-block whitespace-pre"> ✱ </span>
              <span className="text-white font-inter opacity-85 text-shadow-black [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black]">To stand out,  </span>
              <span className="text-white font-knewave text-shadow-black [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black]">COMMON GOODS  </span>
              <span className="text-white font-inter opacity-85 text-shadow-black [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black]">require</span>
              {items.map((_, i) => <span className="inline-block whitespace-pre" key={i}> ✱</span>)}
            </h1>
            <hr className="border-gray-400 border-1"/>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-inter font-extrabold text-black
                -mb-2 sm:-mb-3 p-4 xs:pt-4 sm:pt-4 md:pt-3 lg:pt-3 whitespace-normal
                text-shadow-[0.3px_0.3px_0px] text-shadow-neutral-800 h-[1.3em] sm:h-[1.2em] md:h-[1.1em] overflow-hidden">
              UNCOMMON
              <span className="text-blue-50 opacity-70 text-shadow-black [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black]"> ✱ </span>
              <span className="text-blue-50 opacity-70 text-shadow-black [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black] inline-block whitespace-pre"> ✱</span>
              <span className="text-blue-50 opacity-70 text-shadow-black [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black] inline-block whitespace-pre"> ✱</span>
              <span className="text-blue-50 opacity-70 text-shadow-black [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black] inline-block whitespace-pre"> ✱</span>
              <span className="text-blue-50 opacity-70 text-shadow-black [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black] inline-block whitespace-pre"> ✱</span>
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-inter font-extrabold text-black tracking-[0.1em]
                -mb-3 p-3 sm:pt-4 md:pt-3 lg:pt-3 whitespace-normal
                text-shadow-[0.3px_0.3px_0px] text-shadow-neutral-800 h-[1.3em] sm:h-[1.4em] md:h-[1.1em] overflow-hidden">
              <span className="inline-block whitespace-pre">✱ </span>
              <span className="text-highlight opacity-90">DESIGN</span>
              <span className="inline-block whitespace-pre"> ✱ </span>
              <span className="inline-block whitespace-pre">✱ </span>
              <span className="inline-block whitespace-pre">✱ </span>
              <span className="inline-block whitespace-pre">✱ </span>
            </h1>
            <p className="font-inter text-white font-bold tracking-[-0.04em] text-3xl sm:text-4xl md:text-5xl
                p-3 pl-4 mb-2 h-[1.8em] sm:h-[1.6em] md:h-[1.3em] overflow-hidden">
              <span className="text-white opacity-50 inline-block whitespace-pre [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black]">✱</span>
              <span className="text-white opacity-50 inline-block whitespace-pre [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black]">  ✱  </span>
              <span className="text-black opacity-90">& DEVELOPMENT</span>
              {items.map((_, i) => <span className="text-white opacity-50 inline-block whitespace-pre [text-shadow:.5_.5_.5px_black,-.5_-.5_.5px_black]" key={i}>  ✱</span>)}
            </p>
            <hr className="border-gray-400 border-1 -mb-1"/>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-inter font-extrabold text-black tracking-[0.03em]
                mb-1 -mt-2 p-3 sm:pt-4 md:pt-3 lg:pt-3 whitespace-normal
                text-shadow-[0.3px_0.3px_0px] text-shadow-neutral-800 h-[1.6em] sm:h-[1.8em] md:h-[1.3em] overflow-hidden">
              <span className="text-black opacity-65 inline-block whitespace-pre">*</span>
              {items.map((_, i) => <span className="text-black opacity-65 inline-block whitespace-pre" key={i}>  *</span>)}
            </h1>
            <hr className="border-gray-400 border-1"/>
            <p className="font-inter text-black font-bold tracking-[0.01em] text-md sm:text-xl md:text-2xl
                p-3 pl-4 -mb-3 h-[2em] sm:h-[2em] md:h-[2em] overflow-hidden">
              <span className="text-black inline-block whitespace-pre">✱</span>
              <span className="text-black inline-block whitespace-pre">   ✱  </span>
              <span> helping small businesses and private</span>
              {items.map((_, i) => <span className="text-white/97 inline-block whitespace-pre [text-shadow:.2_.2_.2px_black,-.2_-.2_.2px_black]" key={i}>  ✱ </span>)}
            </p>
            <p className="font-inter text-black font-bold tracking-[-0.01em] text-md sm:text-xl md:text-2xl
                p-3 pl-4 h-[2em] sm:h-[2em] md:h-[2em] overflow-hidden">
              <span className="text-black inline-block whitespace-pre">✱  </span>
              <span>customers to put their best foot forward</span>
              <span className="text-black inline-block whitespace-pre">     ✱</span>
              {items.map((_, i) => <span className="text-black inline-block whitespace-pre" key={i}> ✱ </span>)}
            </p>
          </div>
        </div>
      </div>

      {/* ── 2. BODY SECTION with sentinel + ghost ── */}
      <div className="relative px-8 md:px-20 flex flex-col items-start lg:items-center">

        {/* Sentinel: hijack fires when this hits the top ~20% of the screen */}
        <div ref={sentinelRef} className="absolute top-0 left-0 w-full h-px pointer-events-none" />

        {/* Paras 1 & 2 — visible in normal flow; hidden during hijack (overlay shows them instead) */}
        <div className={`max-w-md w-full flex flex-col gap-6 pb-10 ${hijacking ? 'invisible' : 'visible'}`}>
          <p className="text-white text-lg tracking-tight font-light">
            Design is no longer optional. Every detail, from your online presence to the logo on your shirt, tells a story. But does it tell the story you need it to?
          </p>
          <p className="text-white text-base font-light">
            You have a small business. Do you really need something different? With all the tools that are now available, you might be able to make everything your business needs on your own.
          </p>
        </div>

        {/* Ghost placeholder — holds layout height; actual ghost rendered in fixed overlay */}
        <div className="w-full h-[55vh] md:h-[65vh]" />

        {/* Paras 3 & 4 — visible in normal flow after hijack; IntersectionObserver fades them in */}
        <div className={`max-w-md w-full flex flex-col gap-6 pt-10 pb-16 ${hijacking ? 'invisible' : 'visible'}`}>
          <p
            ref={para3Ref}
            className={`text-white text-base tracking-tight font-light ${paraBase} ${para3Visible ? paraShown : paraHidden}`}
          >
            But should you? Small need not be unremarkable. Common need not be commonplace. And ordinary need not be familiar.
          </p>
          <p
            ref={para4Ref}
            className={`text-white text-base tracking-tight font-light ${paraBase} ${para4Visible ? paraShown : paraHidden}`}
          >
            I help small businesses show their best face to the world, building beautiful digital experiences ... from websites and apps to original art and custom swag.
          </p>
        </div>
      </div>

      {/* ── Fixed overlay: shown only during hijack ── */}
      <AnimatePresence>
        {hijacking && (
          <motion.div
            key="hijack-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 flex flex-col bg-primary px-8 md:px-20 py-10 pointer-events-none"
          >
            {/* Top: paras 1 & 2 */}
            <motion.div
              style={{ opacity: topParaOpacity }}
              className="max-w-md w-full flex flex-col gap-4 shrink-0"
            >
              <p className="text-white text-lg tracking-tight font-light">
                Design is no longer optional. Every detail, from your online presence to the logo on your shirt, tells a story. But does it tell the story you need it to?
              </p>
              <p className="text-white text-base font-light">
                You have a small business. Do you really need something different? With all the tools that are now available, you might be able to make everything your business needs on your own.
              </p>
            </motion.div>

            {/* Middle: Ghost — grows as progress advances */}
            <div className="flex-1 relative overflow-hidden">
              {/* Desktop */}
              <motion.div
                style={{ scale: ghostScaleDesktop, opacity: ghostOpacity }}
                className="hidden md:block absolute inset-0 pointer-events-none origin-center"
              >
                <GhostWebpage scrollYProgress={ghostProgress} ghostOpacity={ghostOpacity} />
              </motion.div>
              {/* Mobile */}
              <motion.div
                style={{ scale: ghostScaleMobile, opacity: ghostOpacity }}
                className="block md:hidden absolute inset-0 pointer-events-none origin-center"
              >
                <GhostWebpage scrollYProgress={ghostProgress} ghostOpacity={ghostOpacity} />
              </motion.div>
            </div>

            {/* Bottom: paras 3 & 4, clearing as ghost completes */}
            <motion.div
              style={{ opacity: bottomParaOpacity, filter: bottomParaFilter }}
              className="max-w-md w-full flex flex-col gap-4 shrink-0"
            >
              <p className="text-white text-base tracking-tight font-light">
                But should you? Small need not be unremarkable. Common need not be commonplace. And ordinary need not be familiar.
              </p>
              <p className="text-white text-base tracking-tight font-light">
                I help small businesses show their best face to the world, building beautiful digital experiences ... from websites and apps to original art and custom swag.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3. CTA ── */}
      <div className="px-8 md:px-20 pb-32 flex flex-col items-start lg:items-center">
        <div className="max-w-md w-full">
          <AnimatePresence>
            {!contactOpen && (
              <motion.div
                key="cta-buttons"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="flex gap-3 lg:justify-center"
              >
                <Link
                  href="/portfolio"
                  className="px-7 py-3 bg-white/10 border border-white/30 text-white font-sans font-semibold rounded-full hover:bg-white/20 transition-all duration-300 text-sm"
                >
                  See Our Work
                </Link>
                <button
                  onClick={() => setContactOpen(true)}
                  className="px-7 py-3 bg-white text-primary font-sans font-semibold rounded-full hover:bg-white/90 transition-all duration-300 text-sm"
                >
                  Get in Touch
                </button>
              </motion.div>
            )}
          </AnimatePresence>

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
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      type="text" placeholder="Name" required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-white placeholder-white/40 font-light text-sm focus:outline-none focus:border-white/70 transition-colors duration-200"
                    />
                    <input
                      type="email" placeholder="Email" required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-white placeholder-white/40 font-light text-sm focus:outline-none focus:border-white/70 transition-colors duration-200"
                    />
                    <textarea
                      placeholder="What should we know? How can we help?"
                      required rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-white/10 border border-white/30 rounded-xl px-4 py-2.5 text-white placeholder-white/40 font-light text-sm focus:outline-none focus:border-white/70 transition-colors duration-200 resize-none"
                    />
                    <div className="flex gap-3 lg:justify-center">
                      <button type="submit"
                        className="px-7 py-3 bg-white text-primary font-sans font-semibold rounded-full hover:bg-white/90 transition-all duration-300 text-sm">
                        Send
                      </button>
                      <button type="button" onClick={() => setContactOpen(false)}
                        className="px-7 py-3 border-2 border-white/40 text-white/60 font-sans font-semibold rounded-full hover:border-white/70 hover:text-white/80 transition-all duration-300 text-sm">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}