'use client';
import { useTransform, motion } from 'framer-motion';

export default function GhostWebpage({ scrollYProgress, ghostOpacity }) {

  const chromeOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const navBgOpacity = useTransform(scrollYProgress, [0.05, 0.1], [0, 1]);
  const navLogoOpacity = useTransform(scrollYProgress, [0.08, 0.13], [0, 1]);
  const navLink1Opacity = useTransform(scrollYProgress, [0.11, 0.16], [0, 1]);
  const navLink2Opacity = useTransform(scrollYProgress, [0.14, 0.19], [0, 1]);
  const navLink3Opacity = useTransform(scrollYProgress, [0.17, 0.22], [0, 1]);
  const navButtonOpacity = useTransform(scrollYProgress, [0.20, 0.25], [0, 1]);
  const heroTaglineOpacity = useTransform(scrollYProgress, [0.25, 0.30], [0, 1]);
  const heroTaglineX = useTransform(scrollYProgress, [0.25, 0.30], [-20, 0]);
  const heroH1Opacity = useTransform(scrollYProgress, [0.29, 0.34], [0, 1]);
  const heroH1X = useTransform(scrollYProgress, [0.29, 0.34], [-20, 0]);
  const heroH2Opacity = useTransform(scrollYProgress, [0.33, 0.38], [0, 1]);
  const heroH2X = useTransform(scrollYProgress, [0.33, 0.38], [-20, 0]);
  const heroSubOpacity = useTransform(scrollYProgress, [0.37, 0.42], [0, 1]);
  const heroCTAOpacity = useTransform(scrollYProgress, [0.41, 0.46], [0, 1]);
  const heroImageOpacity = useTransform(scrollYProgress, [0.44, 0.49], [0, 1]);
  const cardsTitleOpacity = useTransform(scrollYProgress, [0.49, 0.53], [0, 1]);
  const card1Opacity = useTransform(scrollYProgress, [0.52, 0.57], [0, 1]);
  const card1Y = useTransform(scrollYProgress, [0.52, 0.57], [15, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.56, 0.61], [0, 1]);
  const card2Y = useTransform(scrollYProgress, [0.56, 0.61], [15, 0]);
  const card3Opacity = useTransform(scrollYProgress, [0.60, 0.65], [0, 1]);
  const card3Y = useTransform(scrollYProgress, [0.60, 0.65], [15, 0]);
  const textTitleOpacity = useTransform(scrollYProgress, [0.65, 0.69], [0, 1]);
  const textLine1Opacity = useTransform(scrollYProgress, [0.68, 0.72], [0, 1]);
  const textLine2Opacity = useTransform(scrollYProgress, [0.71, 0.75], [0, 1]);
  const textLine3Opacity = useTransform(scrollYProgress, [0.74, 0.78], [0, 1]);
  const textImageOpacity = useTransform(scrollYProgress, [0.77, 0.81], [0, 1]);
  const footerBgOpacity = useTransform(scrollYProgress, [0.81, 0.85], [0, 1]);
  const footerLogo = useTransform(scrollYProgress, [0.84, 0.88], [0, 1]);
  const footerLinks = useTransform(scrollYProgress, [0.87, 0.92], [0, 1]);
  const footerCopy = useTransform(scrollYProgress, [0.91, 0.96], [0, 1]);

  const NavContent = () => (
    <motion.div style={{ opacity: navBgOpacity }} className="px-4 py-2.5 flex justify-between items-center border-b border-white/10">
      <motion.div style={{ opacity: navLogoOpacity }} className="w-12 h-2 bg-white/50 rounded" />
      <div className="flex gap-2 items-center">
        <motion.div style={{ opacity: navLink1Opacity }} className="w-6 h-1.5 bg-white/30 rounded" />
        <motion.div style={{ opacity: navLink2Opacity }} className="w-6 h-1.5 bg-white/30 rounded" />
        <motion.div style={{ opacity: navButtonOpacity }} className="w-12 h-4 bg-white/20 rounded-full" />
      </div>
    </motion.div>
  );

  const HeroContent = () => (
    <div className="px-4 py-4 border-b border-white/10 flex flex-col gap-2">
      <motion.div style={{ opacity: heroTaglineOpacity, x: heroTaglineX }} className="w-16 h-1.5 bg-white/30 rounded" />
      <motion.div style={{ opacity: heroH1Opacity, x: heroH1X }} className="w-full h-4 bg-white/50 rounded" />
      <motion.div style={{ opacity: heroH2Opacity, x: heroH2X }} className="w-3/4 h-3 bg-white/40 rounded" />
      <motion.div style={{ opacity: heroSubOpacity }} className="flex flex-col gap-1 mt-1">
        <div className="w-full h-1.5 bg-white/20 rounded" />
        <div className="w-5/6 h-1.5 bg-white/20 rounded" />
      </motion.div>
      <motion.div style={{ opacity: heroImageOpacity }} className="w-full h-16 bg-white/15 rounded-lg mt-1 md:hidden" />
      <motion.div style={{ opacity: heroCTAOpacity }} className="w-20 h-6 bg-white/25 rounded-full mt-1 mx-auto" />
    </div>
  );

  const FooterContent = () => (
    <motion.div style={{ opacity: footerBgOpacity }} className="px-4 py-3 flex justify-between items-center">
      <motion.div style={{ opacity: footerLogo }} className="w-10 h-1.5 bg-white/30 rounded" />
      <motion.div style={{ opacity: footerLinks }} className="flex gap-2">
        <div className="w-5 h-1.5 bg-white/20 rounded" />
        <div className="w-5 h-1.5 bg-white/20 rounded" />
      </motion.div>
      <motion.div style={{ opacity: footerCopy }} className="w-16 h-1.5 bg-white/15 rounded" />
    </motion.div>
  );

  return (
    // ghostOpacity controls the entire ghost fading out at the end
    <motion.div
      style={{ opacity: ghostOpacity }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      {/* MOBILE: phone frame */}
      <motion.div
        style={{ opacity: chromeOpacity }}
        className="
          flex md:hidden
          w-[70vw] max-w-xs
          opacity-20 flex-col
          rounded-[2rem] overflow-hidden
          border-4 border-white/30
          shadow-2xl bg-white/5
          absolute top-[42%] left-1/2 -translate-x-1/2
        "
      >
        <div className="flex justify-center pt-2 pb-1 shrink-0">
          <div className="w-16 h-4 bg-white/20 rounded-full" />
        </div>
        <NavContent />
        <HeroContent />
        <div className="px-3 py-3 border-b border-white/10">
          <motion.div style={{ opacity: cardsTitleOpacity }} className="w-16 h-2 bg-white/35 rounded mb-2" />
          <div className="flex flex-col gap-1.5">
            {[
              { opacity: card1Opacity, y: card1Y },
              { opacity: card2Opacity, y: card2Y },
              { opacity: card3Opacity, y: card3Y },
            ].map((card, i) => (
              <motion.div key={i} style={{ opacity: card.opacity, y: card.y }}
                className="bg-white/10 rounded-lg p-2 flex gap-2 items-center"
              >
                <div className="w-8 h-8 bg-white/20 rounded shrink-0" />
                <div className="flex flex-col gap-1 flex-1">
                  <div className="w-3/4 h-1.5 bg-white/25 rounded" />
                  <div className="w-1/2 h-1 bg-white/15 rounded" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="px-3 py-3 border-b border-white/10 flex flex-col gap-1.5">
          <motion.div style={{ opacity: textTitleOpacity }} className="w-20 h-2 bg-white/35 rounded" />
          <motion.div style={{ opacity: textLine1Opacity }} className="w-full h-1.5 bg-white/20 rounded" />
          <motion.div style={{ opacity: textLine2Opacity }} className="w-5/6 h-1.5 bg-white/20 rounded" />
          <motion.div style={{ opacity: textLine3Opacity }} className="w-4/6 h-1.5 bg-white/15 rounded" />
        </div>
        <FooterContent />
        <div className="flex justify-center py-2 shrink-0">
          <div className="w-20 h-1 bg-white/30 rounded-full" />
        </div>
      </motion.div>

      {/* DESKTOP: browser window */}
      <motion.div
        style={{ opacity: chromeOpacity }}
        className="
          hidden md:flex
          w-[55%] max-w-2xl
          opacity-25 flex-col
          rounded-xl overflow-hidden
          border border-white/20
          shadow-2xl
          absolute top-[38%] left-1/2 -translate-x-1/2
        "
      >
        <div className="bg-white/15 px-4 py-2 flex items-center gap-2 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
          <div className="ml-3 flex-1 bg-white/10 rounded-full h-3 flex items-center px-2">
            <div className="w-24 h-1.5 bg-white/20 rounded-full" />
          </div>
        </div>
        <NavContent />
        <HeroContent />
        <div className="px-5 py-4 border-b border-white/10">
          <motion.div style={{ opacity: cardsTitleOpacity }} className="w-24 h-2.5 bg-white/35 rounded mb-3" />
          <div className="grid grid-cols-3 gap-2">
            {[
              { opacity: card1Opacity, y: card1Y },
              { opacity: card2Opacity, y: card2Y },
              { opacity: card3Opacity, y: card3Y },
            ].map((card, i) => (
              <motion.div key={i} style={{ opacity: card.opacity, y: card.y }}
                className="bg-white/10 rounded-lg p-2 flex flex-col gap-1.5"
              >
                <div className="w-full h-10 bg-white/20 rounded" />
                <div className="w-3/4 h-1.5 bg-white/25 rounded" />
                <div className="w-1/2 h-1.5 bg-white/15 rounded" />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="px-5 py-4 border-b border-white/10 flex gap-4">
          <motion.div style={{ opacity: textImageOpacity }} className="w-16 h-16 bg-white/15 rounded-lg shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <motion.div style={{ opacity: textTitleOpacity }} className="w-28 h-2.5 bg-white/35 rounded" />
            <motion.div style={{ opacity: textLine1Opacity }} className="w-full h-1.5 bg-white/20 rounded" />
            <motion.div style={{ opacity: textLine2Opacity }} className="w-5/6 h-1.5 bg-white/20 rounded" />
            <motion.div style={{ opacity: textLine3Opacity }} className="w-4/6 h-1.5 bg-white/15 rounded" />
          </div>
        </div>
        <FooterContent />
      </motion.div>
    </motion.div>
  );
}