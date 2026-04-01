'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

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
  // Contact form
  const [contactOpen, setContactOpen] = useState(false);
  const [formData, setFormData]       = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted]     = useState(false);

  // Paragraph fade-ins
  const [para1Ref, para1Visible] = useFadeInOnScroll(0.3);
  const [para2Ref, para2Visible] = useFadeInOnScroll(0.3);
  const [para3Ref, para3Visible] = useFadeInOnScroll(0.3);
  const [para4Ref, para4Visible] = useFadeInOnScroll(0.3);

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

      {/* ── 2. BODY SECTION with 4 paragraphs ── */}
      <div className="px-8 md:px-20 flex flex-col items-start lg:items-center">

        {/* Para 1 */}
        <div className="max-w-md w-full flex flex-col gap-6 pb-10">
          <p
            ref={para1Ref}
            className={`text-white text-lg tracking-tight font-light ${paraBase} ${para1Visible ? paraShown : paraHidden}`}
          >
            Design is no longer optional. Every detail, from your online presence to the logo on your shirt, tells a story. But does it tell the story you need it to?
          </p>
        </div>

        {/* Para 2 */}
        <div className="max-w-md w-full flex flex-col gap-6 pb-10">
          <p
            ref={para2Ref}
            className={`text-white text-base font-light ${paraBase} ${para2Visible ? paraShown : paraHidden}`}
          >
            You have a small business. Do you really need something different? With all the tools that are now available, you might be able to make everything your business needs on your own.
          </p>
        </div>

        {/* Para 3 */}
        <div className="max-w-md w-full flex flex-col gap-6 pb-10">
          <p
            ref={para3Ref}
            className={`text-white text-base tracking-tight font-light ${paraBase} ${para3Visible ? paraShown : paraHidden}`}
          >
            But should you? Small need not be unremarkable. Common need not be commonplace. And ordinary need not be familiar.
          </p>
        </div>

        {/* Para 4 */}
        <div className="max-w-md w-full flex flex-col gap-6 pb-16">
          <p
            ref={para4Ref}
            className={`text-white text-base tracking-tight font-light ${paraBase} ${para4Visible ? paraShown : paraHidden}`}
          >
            I help small businesses show their best face to the world, building beautiful digital experiences ... from websites and apps to original art and custom swag.
          </p>
        </div>
      </div>

      {/* ── 3. CTA ── */}
      <div className="px-8 md:px-20 pb-32 flex flex-col items-start lg:items-center">
        <div className="max-w-md w-full">
          {!contactOpen && (
            <div className="flex gap-3 lg:justify-center">
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
            </div>
          )}

          {contactOpen && (
            <div className="w-full">
              {submitted ? (
                <p className="text-white/80 font-light text-base py-4">
                  Thanks! I'll be in touch soon.
                </p>
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
            </div>
          )}
        </div>
      </div>

    </div>
  );
}