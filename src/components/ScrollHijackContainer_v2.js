'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useMotionValue } from 'framer-motion';
import GhostWebpage from './GhostWebpage';

export default function ScrollHijackContainer() {
  const containerRef = useRef(null);
  const [ghostProgress, setGhostProgress] = useState(0);
  const [isHijacking, setIsHijacking] = useState(false);

  const scrollYProgress = useMotionValue(0);
  const ghostOpacity = useMotionValue(1);

  // Refs mirror state so event handlers always read current values (avoids stale closures)
  const isHijackingRef = useRef(false);
  const ghostProgressRef = useRef(0);

  // The document scroll-Y we lock to while hijacking (set when hijack activates)
  const lockedScrollYRef = useRef(null);

  // Adaptive post-hijack cooldown: swallows wheel events until deltaY decays to
  // near-zero AND a minimum time has passed, draining trackpad momentum naturally.
  const cooldownActiveRef = useRef(false);
  const cooldownStartRef  = useRef(0);

  // Touch tracking for mobile
  const lastTouchYRef = useRef(0);
  const touchIDRef = useRef(null);

  const clamp = (v) => Math.max(0, Math.min(1, v));

  // --- Hijack activation / deactivation ---

  const activateHijack = useCallback((scrollY) => {
    lockedScrollYRef.current = scrollY;
    isHijackingRef.current = true;
    setIsHijacking(true);
    // No hard snap — preventDefault on subsequent wheel events stops momentum
    // naturally, avoiding a jarring sudden-wall feeling on entry.
  }, []);

  const deactivateHijack = useCallback(() => {
    // Start adaptive cooldown — wheel events are swallowed until deltaY decays
    cooldownActiveRef.current = true;
    cooldownStartRef.current  = Date.now();
    lockedScrollYRef.current  = null;
    isHijackingRef.current    = false;
    setIsHijacking(false);
  }, []);

  // --- Progress ---

  // Advances animation by delta pixels. Negative delta is ignored — no rewind.
  // Deactivates hijacking inline when complete, avoiding a cascading useEffect.
  const updateProgress = useCallback((delta) => {
    if (delta <= 0) return;
    // Compute next value from ref (synchronous) so we can check completion immediately
    const next = clamp(ghostProgressRef.current + (delta / 2000) * 0.1);
    ghostProgressRef.current = next;
    setGhostProgress(next);
    if (next >= 1) deactivateHijack();
  }, [deactivateHijack]);

  // Correct significant viewport drift during hijacking — small offsets are left
  // alone so entry feels like a deceleration rather than a hard wall.
  const hardLockScroll = useCallback(() => {
    if (lockedScrollYRef.current === null) return;
    const drift = Math.abs(window.scrollY - lockedScrollYRef.current);
    if (drift > 20) window.scrollTo(0, lockedScrollYRef.current);
  }, []);

  // --- Wheel handler (desktop) ---

  const handleWheel = useCallback((e) => {
    if (!isHijackingRef.current) return;
    e.preventDefault();
    // deltaY > 0 = "scroll down" intent on all platforms, natural scrolling or not —
    // the browser normalizes this before the event fires, so no detection is needed.
    updateProgress(e.deltaY);
    requestAnimationFrame(hardLockScroll);
  }, [updateProgress, hardLockScroll]);

  // --- Touch handlers (mobile) ---

  const handleTouchStart = useCallback((e) => {
    // Record the touch even if hijacking hasn't activated yet, so touchmove
    // works immediately if hijacking starts mid-gesture.
    const touch = e.touches[0];
    lastTouchYRef.current = touch.clientY;
    touchIDRef.current = touch.identifier;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isHijackingRef.current || touchIDRef.current === null) return;
    let touch = null;
    for (let i = 0; i < e.touches.length; i++) {
      if (e.touches[i].identifier === touchIDRef.current) { touch = e.touches[i]; break; }
    }
    if (!touch) return;
    e.preventDefault();
    // Swipe up (finger Y decreases) = positive delta = scroll-down intent (natural scrolling)
    const delta = lastTouchYRef.current - touch.clientY;
    updateProgress(delta);
    lastTouchYRef.current = touch.clientY;
    requestAnimationFrame(hardLockScroll);
  }, [updateProgress, hardLockScroll]);

  const handleTouchEnd = useCallback((e) => {
    let touchEnded = true;
    for (let i = 0; i < e.touches.length; i++) {
      if (e.touches[i].identifier === touchIDRef.current) { touchEnded = false; break; }
    }
    if (touchEnded) touchIDRef.current = null;
  }, []);

  // --- Scroll listener: activate hijacking when the box center hits the viewport center ---

  useEffect(() => {
    const onScroll = () => {
      if (isHijackingRef.current || ghostProgressRef.current >= 1) return;
      const container = containerRef.current;
      if (!container) return;

      // Scroll-Y at which box center === viewport center:
      //   boxDocTop + boxHeight/2 = scrollY + viewportHeight/2
      //   → scrollY = boxDocTop + boxHeight/2 − viewportHeight/2
      const boxDocTop = container.getBoundingClientRect().top + window.scrollY;
      const centerScrollY = boxDocTop + container.offsetHeight / 2 - window.innerHeight / 2;

      if (window.scrollY >= centerScrollY) {
        activateHijack(centerScrollY);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [activateHijack]);

  // --- Document-level wheel / touch listeners ---

  useEffect(() => {
    const onWheel = (e) => {
      if (isHijackingRef.current) {
        handleWheel(e);
      } else if (cooldownActiveRef.current) {
        // Swallow residual trackpad momentum after hijacking ends.
        // Release only once deltaY has decayed to near-zero AND 200ms have passed —
        // this adapts to how hard the user was scrolling when the animation finished.
        e.preventDefault();
        const elapsed = Date.now() - cooldownStartRef.current;
        if (elapsed >= 200 && Math.abs(e.deltaY) < 3) {
          cooldownActiveRef.current = false;
        }
      }
    };

    const onTouchStart = (e) => {
      // Only track touches that start over the container
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const { clientX, clientY } = e.touches[0];
      if (clientX >= rect.left && clientX <= rect.right &&
          clientY >= rect.top && clientY <= rect.bottom) {
        handleTouchStart(e);
      }
    };

    const onTouchMove = (e) => { if (isHijackingRef.current) handleTouchMove(e); };
    const onTouchEnd  = (e) => { if (isHijackingRef.current) handleTouchEnd(e); };

    document.addEventListener('wheel',      onWheel,      { passive: false });
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove',  onTouchMove,  { passive: false });
    document.addEventListener('touchend',   onTouchEnd);

    return () => {
      document.removeEventListener('wheel',      onWheel);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove',  onTouchMove);
      document.removeEventListener('touchend',   onTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Sync progress to framer-motion MotionValue
  useEffect(() => {
    scrollYProgress.set(ghostProgress);
  }, [ghostProgress, scrollYProgress]);

  const handleReset = () => {
    ghostProgressRef.current  = 0;
    cooldownActiveRef.current = false;
    setGhostProgress(0);
    deactivateHijack();
  };

  return (
    // To resize the box, change 70vh. min(70vh,90vw) keeps it from overflowing on narrow screens.
    <div
      ref={containerRef}
      className="bg-white/12 mb-10 w-[min(70vh,90vw)] aspect-square flex flex-col gap-6 mx-auto
      border-2 border-white/40 relative overflow-hidden"
    >
      <GhostWebpage
        scrollYProgress={scrollYProgress}
        ghostOpacity={ghostOpacity}
      />

      {/* "Scroll down" hint — visible before hijacking and through the first 15% of
          the animation so the user knows what's happening. Fades out after that. */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
        z-50 pointer-events-none transition-opacity duration-500"
        style={{ opacity: ghostProgress >= 0.15 ? 0 : 1 }}
      >
        <span className="text-black/60 text-xs font-sans whitespace-nowrap tracking-wide">
          scroll down to see more
        </span>
        <span className="text-black/60 text-xs">↓</span>
      </div>

      {/* Progress indicator — shown only while hijacking is active */}
      {isHijacking && ghostProgress > 0 && (
        <div className="absolute bottom-4 left-4 text-white/40 text-xs font-mono z-50 pointer-events-none">
          {(ghostProgress * 100).toFixed(1)}%
        </div>
      )}

      {/* Reset button (dev tool — remove in production) */}
      {ghostProgress > 0 && (
        <button
          onClick={handleReset}
          className="absolute bottom-4 right-4 px-3 py-1 text-xs bg-white/10 border border-white/30
          rounded text-white/60 hover:text-white hover:bg-white/20 transition-all z-50 pointer-events-auto"
        >
          Reset
        </button>
      )}
    </div>
  );
}
