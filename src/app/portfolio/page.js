'use client';

/** ==========================================
    Import Statements
=============================================*/

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/** ==========================================
    Data — Parent Categories

    Each key is a category used throughout the
    grid. 'children' are the subcategory cards
    that appear when a parent is selected.
    Placeholder titles and colors are used until
    real images and names are chosen.
=============================================*/

const categories = {
  web: {
    label: 'web development',
    color: 'from-green-900 to-green-700',
    image: '/images/websites/np_home2.jpeg',
    imageClass: 'object-cover',
    children: [
      { title: 'Placeholder A', color: 'from-emerald-800 to-emerald-600' },
      { title: 'Placeholder B', color: 'from-teal-800 to-teal-600' },
      { title: 'Placeholder C', color: 'from-cyan-800 to-cyan-600' },
    ],
  },
  brand: {
    label: 'brand creation',
    color: 'from-orange-900 to-orange-700',
    image: '/images/brand/brand_logo2.jpeg',
    imageClass: 'object-cover',
    children: [
      { title: 'Placeholder A', color: 'from-red-800 to-red-600' },
      { title: 'Placeholder B', color: 'from-rose-800 to-rose-600' },
      { title: 'Placeholder C', color: 'from-pink-800 to-pink-600' },
    ],
  },
  design: {
    label: 'original design',
    color: 'from-purple-900 to-purple-700',
    image: '/images/designs/design3.jpeg',
    imageClass: 'object-cover',
    children: [
      { title: 'Placeholder A', color: 'from-violet-800 to-violet-600' },
      { title: 'Placeholder B', color: 'from-purple-800 to-purple-600' },
      { title: 'Placeholder C', color: 'from-indigo-800 to-indigo-600' },
    ],
  },
  print: {
    label: 'apparel and custom merchandise',
    color: 'from-teal-900 to-teal-700',
    image: '/images/print/print_image2.jpeg',
    imageClass: 'object-cover',
    children: [
      { title: 'Placeholder A', color: 'from-sky-800 to-sky-600' },
      { title: 'Placeholder B', color: 'from-blue-800 to-blue-600' },
      { title: 'Placeholder C', color: 'from-slate-800 to-slate-600' },
    ],
  },
  shop: {
    label: 'shop creation',
    color: 'from-amber-900 to-amber-700',
    image: '/images/shop/np_store2.jpeg',
    imageClass: 'object-cover',
    children: [
      { title: 'Placeholder A', color: 'from-amber-800 to-amber-600' },
      { title: 'Placeholder B', color: 'from-yellow-800 to-yellow-600' },
      { title: 'Placeholder C', color: 'from-orange-800 to-orange-600' },
    ],
  },
};

/** ==========================================
    Data — Grid Card Layout

    Each entry maps a card to its CSS grid
    span classes and its category key.
    Order here determines render order and
    matches the index used in gridPositions.
=============================================*/

const gridCards = [
  { id: 'web',    category: 'web',    style: 'md:col-span-3 row-span-2', size: 'large' },
  { id: 'brand',  category: 'brand',  style: 'md:col-span-2 row-span-1', size: 'small' },
  { id: 'design', category: 'design', style: 'md:col-span-2 row-span-1', size: 'small' },
  { id: 'print',  category: 'print',  style: 'md:col-span-3 row-span-2', size: 'wide'  },
  { id: 'shop',   category: 'shop',   style: 'md:col-span-2 row-span-1', size: 'small' },
];

/** ==========================================
    Data — Grid Positions

    [row, col] logical coordinates per card,
    used to compute Manhattan distance between
    cards when assigning child roles.
    Must stay in sync with gridCards order.
=============================================*/

const gridPositions = [
  [0, 0], // web
  [0, 2], // brand
  [0, 3], // design
  [1, 0], // print
  [1, 2], // shop
];

/** ==========================================
    Helper — computeRoles

    Given an active parent category key,
    returns a { categoryKey → role } map for
    all 5 cards.

    Roles:
      'parent'  — the selected card
      'child-1' — closest non-parent card
      'child-2' — second closest
      'child-3' — third closest
      'grayed'  — furthest card, visually muted

    Children are sorted by Manhattan distance
    from parent in the grid coordinate space.
=============================================*/

function computeRoles(activeParent) {
  if (!activeParent) return {};

  const parentIndex = gridCards.findIndex(c => c.category === activeParent);
  const [pr, pc] = gridPositions[parentIndex];

  // Sort all non-parent cards by distance from the parent
  const others = gridCards
    .map((card, i) => ({
      category: card.category,
      dist: Math.abs(gridPositions[i][0] - pr) + Math.abs(gridPositions[i][1] - pc),
    }))
    .filter(item => item.category !== activeParent)
    .sort((a, b) => a.dist - b.dist);

  const roles = { [activeParent]: 'parent' };

  // First 3 by distance become children; remainder (1 card) is grayed
  others.forEach((item, idx) => {
    roles[item.category] = idx < 3 ? `child-${idx + 1}` : 'grayed';
  });

  return roles;
}

/** ==========================================
    Component — Card

    Renders a single card in one of 5 states:
      idle    — no parent selected, shows label
      parent  — selected card, shows badge overlay
      child-N — transformed with child content
      grayed  — muted, clickable to reset

    The tilt-on-hover effect is only active
    for idle and parent cards since children
    and grayed cards signal different intent.
=============================================*/

function Card({ card, role, activeParent, onSelect, onReset }) {
  const ref = useRef(null);
  const cat = categories[card.category];
  const parentCat = activeParent ? categories[activeParent] : null;

  /**-----------------------------------------------
        Derive state booleans from role string
    -----------------------------------------------*/

  const isIdle   = !role;
  const isParent = role === 'parent';
  const isGrayed = role === 'grayed';
  const childIndex = role?.startsWith('child-') ? parseInt(role.split('-')[1]) - 1 : null;
  const isChild  = childIndex !== null;
  const childData = isChild && parentCat ? parentCat.children[childIndex] : null;

  /**-----------------------------------------------
        Mouse tilt — only active on idle/parent
    -----------------------------------------------*/

  const handleMouseMove = (e) => {
    if (!ref.current || isChild || isGrayed) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  /**-----------------------------------------------
        Click routing by role
    -----------------------------------------------*/

  const handleClick = () => {
    if (isIdle)   return onSelect(card.category);
    if (isParent) return onReset();
    if (isGrayed) return onReset();
    // child clicks: reserved for detail navigation later
  };

  /** ==========================================
       Render
  =============================================*/

  return (
    <div
      className={`
        ${card.style} relative min-h-[220px]
        ${card.size === 'large' ? 'md:min-h-[320px]' : card.size === 'wide' ? 'md:min-h-[160px]' : 'md:min-h-[120px]'}
      `}
      style={{ padding: '8px 4px 4px 8px', margin: '8px 4px 8px 4px' }}
    >

      {/**-----------------------------------------------
            Shadow layer 3 — furthest back
        -----------------------------------------------*/}

      <div className='rounded-2xl border-black border-[0.06rem] outline-1 outline-gray-300/30'
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#afd4d7' }}
      />

      {/**-----------------------------------------------
            Shadow layer 2 — middle
        -----------------------------------------------*/}

      <div className='rounded-2xl border-black border-[0.06rem] outline-1 outline-gray-300/30'
        style={{ position: 'absolute', top: '-.5rem', left: '-.35rem', right: '.2rem', bottom: '.2rem', backgroundColor: '#899fa1' }}
      />

      {/**-----------------------------------------------
            Shadow layer 1 — closest to top card
        -----------------------------------------------*/}

      <div className='rounded-2xl border-black border-[0.06rem] outline-1 outline-gray-300/30'
        style={{ position: 'absolute', top: '-1rem', left: '-.7rem', right: '.4rem', bottom: '.4rem', backgroundColor: '#c9e2e4' }}
      />

      {/**-----------------------------------------------
            Top card — the interactive surface
        -----------------------------------------------*/}

      <motion.div
        ref={ref}
        className="absolute rounded-2xl overflow-hidden cursor-pointer"
        style={{ top: '-1.4rem', left: '-1rem', right: '.6rem', bottom: '0.6rem' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        animate={{ scale: isParent ? 1.01 : 1 }}
        transition={{ duration: 0.3 }}
      >

        {/** ==========================
             Background

             Child cards use a solid gradient
             (image to be swapped in later).
             All other states use the original
             category image with a dark gradient.
        ===========================*/}

        {isChild ? (
          <div className={`absolute inset-0 bg-linear-to-br ${childData.color}`} />
        ) : (
          <>
            {cat.image && (
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className={cat.imageClass}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
            <div className="absolute inset-0 border-black border-[0.08rem] rounded-2xl bg-linear-to-b from-gray-800/20 via-work/10 via-60% to-gray-900/60" />
          </>
        )}

        {/** ==========================
             Grayed overlay

             Dark semi-transparent layer drawn
             on top of the card image. Fades in
             when this card has the 'grayed' role.
        ===========================*/}

        <AnimatePresence>
          {isGrayed && (
            <motion.div
              className="absolute inset-0 bg-black/65 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        {/** ==========================
             Idle label

             Frosted pill at the bottom showing
             the category name. Visible only when
             no parent is selected (idle state).
             Extra dot spans overflow the container
             to create a trailing dots effect.
        ===========================*/}

        <AnimatePresence>
          {isIdle && (
            <motion.div
              className="absolute inset-0 flex flex-col justify-end z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="-mb-1 -ml-5 -mr-5 pt-2 pb-2
                backdrop-blur-md bg-white/25 shadow-sm shadow-neutral-500
                border-l-black border-r-black border-l-[.08rem] border-r-[.08rem]">
                <p className="text-white/97 text-md font-display font-bold edt h-[1.4rem] overflow-hidden [text-shadow:.25_.25_.25px_black,-.2_-.2_.2px_black] px-5">
                  <span className="text-white/97 text-xs inline-block whitespace-pre">  . . . . .  </span>
                  <span>{cat.label}</span>
                  <span className="text-white/97 text-xs inline-block whitespace-pre">  . . . . </span>
                  <span className="text-white/97 text-xs inline-block whitespace-pre">. . . . </span>
                  <span className="text-white/97 text-xs inline-block whitespace-pre">. . . . </span>
                  <span className="text-white/97 text-xs inline-block whitespace-pre">. . . . </span>
                  <span className="text-white/97 text-xs inline-block whitespace-pre">. . . . </span>
                  <span className="text-white/97 text-xs inline-block whitespace-pre">. . . . </span>
                  <span className="text-white/97 text-xs inline-block whitespace-pre">. . . . </span>
                  <span className="text-white/97 text-xs inline-block whitespace-pre">. . . . </span>
                  <span className="text-white/97 text-xs inline-block whitespace-pre">. . . . </span>
                  <span className="text-white/97 text-xs inline-block whitespace-pre">. . . . </span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/** ==========================
             Parent overlay badge

             Slides up from the bottom of the
             card when it becomes the active parent.
             Shows the category name prominently
             plus a child count hint.
        ===========================*/}

        <AnimatePresence>
          {isParent && (
            <motion.div
              className="absolute inset-x-0 bottom-0 z-10 p-4
                backdrop-blur-md bg-black/45 border-t border-white/20"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <p className="text-white/50 text-xs uppercase tracking-widest font-display mb-1">
                exploring
              </p>
              <p className="text-white font-display font-bold text-lg leading-tight [text-shadow:.25_.25_.25px_black]">
                {cat.label}
              </p>
              <p className="text-white/50 text-xs font-sans mt-1">
                {cat.children.length} items ↓
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/** ==========================
             Child card content

             Shown when this card is displaying
             a subcategory. Title and parent label
             fade in over the child background.
        ===========================*/}

        <AnimatePresence>
          {isChild && childData && (
            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-5 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
            >
              <p className="text-white/50 text-xs uppercase tracking-widest font-display mb-1">
                {parentCat.label}
              </p>
              <p className="text-white font-display font-bold text-lg leading-tight [text-shadow:.25_.25_.25px_black]">
                {childData.title}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}

/** ==========================================
    Component — BackCard

    Card-styled reset button rendered below the
    grid on desktop when a parent is active.
    Hidden on mobile (md:flex) — mobile uses
    the back button inside MobileOverlay instead.
=============================================*/

function BackCard({ onReset }) {
  return (
    <motion.div
      className="hidden md:flex items-center justify-center
        cursor-pointer rounded-2xl border border-black/40
        bg-mauve-500/20 backdrop-blur-sm hover:bg-white/10
        transition-colors duration-200 min-h-14 mt-6 mx-1
        bg-[linear-gradient(to_right,#4d4d4d21_1px,transparent_1px),linear-gradient(to_bottom,#668dd130_1px,transparent_1px)] bg-[size:2px_2px]"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
      onClick={onReset}
    >
      <span className="text-white font-rubik text-xl tracking-wide [text-shadow:.25_.25_.25px_black]">
        ← back to all categories
      </span>
    </motion.div>
  );
}

/** ==========================================
    Component — MobileOverlay

    Full-screen takeover shown only on mobile
    (hidden at md breakpoint) when a parent is
    active. Replaces the grid transformation
    entirely since spatial proximity has no
    meaning in a single-column layout.

    Structure:
      - Parent card as a hero image at the top
      - Child count label
      - Children stacked as cards with staggered entrance
      - Back button pinned at the bottom
=============================================*/

function MobileOverlay({ activeParent, onReset }) {
  if (!activeParent) return null;
  const cat = categories[activeParent];

  return (
    <motion.div
      className="fixed inset-0 z-50 md:hidden bg-primary overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col min-h-full p-6 gap-4">

        {/**-----------------------------------------------
              Parent hero — top of the overlay
              Shows the category image and name so
              the user always knows what they're in.
          -----------------------------------------------*/}

        <div className="relative rounded-2xl overflow-hidden min-h-50 shrink-0">
          {cat.image && (
            <Image src={cat.image} alt={cat.label} fill className={cat.imageClass} sizes="100vw" />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-gray-800/20 to-gray-900/70" />
          <div className="absolute inset-x-0 bottom-0 p-4 backdrop-blur-md bg-black/45 border-t border-white/20">
            <p className="text-white/50 text-xs uppercase tracking-widest font-display mb-1">exploring</p>
            <p className="text-white font-display font-bold text-xl [text-shadow:.25_.25_.25px_black]">
              {cat.label}
            </p>
          </div>
        </div>

        {/**-----------------------------------------------
              Item count label
          -----------------------------------------------*/}

        <p className="text-white/40 font-sans text-xs uppercase tracking-widest">
          {cat.children.length} items in this category
        </p>

        {/**-----------------------------------------------
              Child cards — staggered entrance animation
          -----------------------------------------------*/}

        {cat.children.map((child, i) => (
          <motion.div
            key={i}
            className={`relative rounded-2xl overflow-hidden min-h-30 bg-linear-to-br ${child.color} cursor-pointer`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <p className="text-white/50 text-xs uppercase tracking-widest font-display mb-1">
                {cat.label}
              </p>
              <p className="text-white font-display font-bold text-lg [text-shadow:.25_.25_.25px_black]">
                {child.title}
              </p>
            </div>
          </motion.div>
        ))}

        {/**-----------------------------------------------
              Back button — bottom of overlay
              mt-auto pushes it to the bottom
              so the user doesn't need to scroll to find it.
          -----------------------------------------------*/}

        <motion.button
          className="mt-auto py-4 rounded-2xl border border-white/20 bg-white/5
            text-white/60 font-sans text-sm tracking-wide
            hover:bg-white/10 transition-colors duration-200"
          onClick={onReset}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.28 }}
        >
          ← back to all categories
        </motion.button>

      </div>
    </motion.div>
  );
}

/** ==========================================
    Page — WorkPage

    Manages activeParent state and passes roles
    down to each Card. When activeParent is set,
    computeRoles assigns each card a role based
    on its distance from the parent in the grid.
=============================================*/

export default function WorkPage() {
  const [activeParent, setActiveParent] = useState(null);

  const roles = computeRoles(activeParent);

  /**-----------------------------------------------
        Handlers
    -----------------------------------------------*/

  // Toggle off if clicking the already-active parent; otherwise select new
  const handleSelect = (category) => {
    setActiveParent(prev => prev === category ? null : category);
  };

  const handleReset = () => setActiveParent(null);

  /** ==========================================
       Render
  =============================================*/

  return (
    <main className="bg-primary min-h-screen
    bg-[linear-gradient(to_right,#4d4d4d21_1px,transparent_1px),linear-gradient(to_bottom,#668dd130_1px,transparent_1px)] bg-[size:2px_2px]">
     <div className="max-w max-h pt-28 pb-20 px-6 md:px-10 bg-[linear-gradient(to_right,#113b7833_1px,transparent_1px),linear-gradient(to_bottom,#c595cb0D_1px,transparent_1px)] bg-[size:24px_24px]">
      <div className="max-w-5xl mx-auto">

        {/**-----------------------------------------------
              Header
          -----------------------------------------------*/}

        <div className="bg-work m-1 mb-3 pb-3 outline-4 outline-solid outline-black rounded-xl
          border-solid border-e-olive-500 border-b-olive-500 border-t-olive-400 border-s-olive-400 border-2">
          <h1 className="text-6xl sm:text-7xl md:text-8xl
            font-inter font-extrabold text-black tracking-[-0.07em]
            mb-px p-3 whitespace-normal
            text-shadow-[0.3px_0.3px_0px] text-shadow-neutral-800
            h-[1.1em] overflow-hidden">
            <span>PORTFOLIO</span>
            <span className="inline-block whitespace-pre"> ✱</span>
            <span className="inline-block whitespace-pre"> ✱</span>
            <span className="inline-block whitespace-pre"> ✱</span>
            <span className="inline-block whitespace-pre"> ✱</span>
            <span className="inline-block whitespace-pre"> ✱</span>
            <span className="inline-block whitespace-pre"> ✱</span>
            <span className="inline-block whitespace-pre"> ✱</span>
          </h1>
          <p className="font-inter text-black font-bold tracking-wider
            text-lg sm:text-2xl md:text-3xl
            p-3 pl-4 -mt-3
            h-[1.8em] overflow-hidden">
            <span className="text-highlight opacity-75
              [text-shadow:0_0_0.5px_black,0_0_0.5px_black,0_0_0.5px_black,0_0_0.5px_black]">
              selected
            </span>
            <span> items from our body of work</span>
            <span className="inline-block whitespace-pre">  ✱</span>
            <span className="inline-block whitespace-pre">  ✱</span>
            <span className="inline-block whitespace-pre">  ✱</span>
            <span className="inline-block whitespace-pre">  ✱</span>
            <span className="inline-block whitespace-pre">  ✱</span>
            <span className="inline-block whitespace-pre">  ✱</span>
            <span className="inline-block whitespace-pre">  ✱</span>
            <span className="inline-block whitespace-pre">  ✱</span>
            <span className="inline-block whitespace-pre">  ✱</span>
            <span className="inline-block whitespace-pre">  ✱</span>
          </p>
        </div>

        {/**-----------------------------------------------
              Status text
              Updates to reflect the current interaction state.
          -----------------------------------------------*/}

        <div>
          <p className="text-white/40 font-sans text-sm mt-1 mb-2 ml-5">
            {activeParent
              ? `exploring ${categories[activeParent].label} — click the card or any grayed card to go back`
              : 'click any card to explore that category'}
          </p>
        </div>

        {/**-----------------------------------------------
              Card grid
          -----------------------------------------------*/}

        <div className="bg-work m-1 mt-1 mb-3 pl-9 pt-11 pr-6 pb-7 outline-4 outline-solid outline-black rounded-xl
          border-solid border-e-olive-500 border-b-olive-500 border-t-olive-400 border-s-olive-400 border-2
          bg-[linear-gradient(to_right,#94A9CB80_1px,transparent_1px),linear-gradient(to_bottom,#176bfc40_1px,transparent_1px)] bg-size-[16px_16px]">
          <div className="grid grid-cols-1 md:grid-cols-5 md:grid-rows-[200px_200px_200px] gap-7">
            {gridCards.map((card) => (
              <Card
                key={card.id}
                card={card}
                role={roles[card.category] ?? null}
                activeParent={activeParent}
                onSelect={handleSelect}
                onReset={handleReset}
              />
            ))}
          </div>

          {/**-----------------------------------------------
                Back card — desktop only, below the grid.
                AnimatePresence handles the mount/unmount
                animation when activeParent toggles.
            -----------------------------------------------*/}

          <AnimatePresence>
            {activeParent && <BackCard onReset={handleReset} />}
          </AnimatePresence>

        </div>

        {/**-----------------------------------------------
              Mobile overlay
              Full-screen takeover on small viewports.
              Conditionally rendered via AnimatePresence
              so the exit animation plays on reset.
          -----------------------------------------------*/}

        <AnimatePresence>
          {activeParent && (
            <MobileOverlay activeParent={activeParent} onReset={handleReset} />
          )}
        </AnimatePresence>

      </div>
     </div>
    </main>
  );
}
