'use client';

/** ==========================================
    Import Statements
=============================================*/

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/** ==========================================
    Card Info Objects
=============================================*/

const categories = {
  web: {
    label: 'web development',
    color: 'from-green-900 to-green-700',
    accent: '#639922',
    image: '/images/websites/np_home2.jpeg',
    imageClass: 'object-cover',
    projects: [
      { title: 'E-commerce Platform', desc: 'Next.js + Shopify', year: '2024' },
      { title: 'Portfolio Site', desc: 'React + Framer Motion', year: '2024' },
      { title: 'SaaS Dashboard', desc: 'Next.js + Tailwind', year: '2023' },
    ],
  },
  brand: {
    label: 'brand creation',
    color: 'from-orange-900 to-orange-700',
    accent: '#d85a30',
    image: '/images/brand/brand_logo2.jpeg',
    imageClass: 'object-cover',
    projects: [
      { title: 'Startup Identity', desc: 'Logo + guidelines', year: '2024' },
      { title: 'Restaurant Brand', desc: 'Full brand system', year: '2023' },
      { title: 'Personal Brand', desc: 'Visual identity', year: '2023' },
    ],
  },
  design: {
    label: 'original design',
    color: 'from-purple-900 to-purple-700',
    accent: '#7f77dd',
    image: '/images/designs/design3.jpeg',
    imageClass: 'object-cover',
    projects: [
      { title: 'Digital Series', desc: 'Generative illustration', year: '2024' },
      { title: 'Mixed Media', desc: 'Print + digital', year: '2023' },
      { title: 'Commission Work', desc: 'Custom pieces', year: '2023' },
    ],
  },
  print: {
    label: 'apparel and custom merchandise',
    color: 'from-teal-900 to-teal-700',
    accent: '#1d9e75',
    image: '/images/print/print_image2.jpeg',
    imageClass: 'object-cover',
    projects: [
      { title: 'Apparel Line', desc: 'Clothing + accessories', year: '2024' },
      { title: 'Poster Series', desc: 'Limited edition prints', year: '2023' },
    ],
  },
  shop: {
    label: 'shop creation',
    color: 'from-amber-900 to-amber-700',
    accent: '#ba7517',
    image: '/images/shop/np_store2.jpeg',
    imageClass: 'object-cover',
    projects: [
      { title: 'Etsy Store', desc: 'Art + merchandise', year: '2024' },
      { title: 'Shopify Build', desc: 'Full store setup', year: '2023' },
    ],
  },
};

const gridCards = [
  { id: 'web',    category: 'web',    style: 'md:col-span-3 row-span-2', size: 'large' },
  { id: 'brand',  category: 'brand',  style: 'md:col-span-2 row-span-1', size: 'small' },
  { id: 'design', category: 'design', style: 'md:col-span-2 row-span-1', size: 'small' },
  { id: 'print',  category: 'print',  style: 'md:col-span-3 row-span-2', size: 'wide'  },
  { id: 'shop',   category: 'shop',   style: 'md:col-span-2 row-span-1', size: 'small' },
];

/** ==========================================
    Card Functions
=============================================*/

function Card({ card, index, activeCategory, onClick, rippleIndex, rippleOrder }) {
  const ref = useRef(null);
  const cat = categories[card.category];
  const isActive = activeCategory === card.category;
  const isFlipped = rippleOrder !== null && rippleOrder <= rippleIndex;

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  /** ==========================================
        Cards 1-3
    =============================================*/

  return (
    <div
      className={`
        ${card.style} relative min-h-[220px]
        ${card.size === 'large' ? 'md:min-h-[320px]' : card.size === 'wide' ? 'md:min-h-[160px]' : 'md:min-h-[120px]'}
      `}
      style={{ padding: '8px 4px 4px 8px' }}
    >

      {/**-----------------------------------------------
            3rd card — accent color, furthest back
        -----------------------------------------------*/}

      <div className='rounded-2xl border-black border-[0.08rem]'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#6e8789',
          opacity: 1
        }}
      />

      {/**----------------------------------------
            2nd card — white, middle layer
        ------------------------------------------*/}

      <div className='rounded-2xl border-gray-700 border-[0.12rem]'
        style={{
          position: 'absolute',
          top: '0.6rem',
          left: '-.2rem',
          right: '.2rem',
          bottom: '-0.6rem',
          backgroundColor: '#c9e2e4',
          opacity: 1,
        }}
      />

      {/**----------------------------------------
            Top card — fills the padding area
         ------------------------------------------*/}

      <motion.div
        ref={ref}
        className="absolute rounded-2xl overflow-hidden cursor-pointer"
        style={{
          top: '.2rem',
          left: '-.5rem',
          right: '.5rem',
          bottom: '-0.2rem',
          opacity: 1,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(card, index)}
        animate={{
          scale: isFlipped ? 1.02 : 1,
          borderColor: isActive ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)',
        }}
        transition={{ duration: 0.3 }}
      >
      {/** ==========================
       General Card Appearance
       ===========================*/}

        {/** -------------------------------------------------------------
             Background — image if available, gradient fallback */}

        {cat.image ? (
          <>
            <Image
              src={cat.image}
              alt={cat.label}
              fill
              className={cat.imageClass}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
             <div className="absolute inset-0 border-[.1rem] border-black
             rounded-2xl outline-none bg-linear-to-b from-gray-800/20 via-work/10 via-60% to-gray-900/60"/>
          </>
        ) : (
          <>
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-60`} />
            <div className="absolute inset-0 bg-black/30" />
          </>
        )}

        {/** -------------------------------------------------------------
            Default view — category label */}

        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-5 z-10"
          animate={{ opacity: isFlipped ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
         {/* Frosted glass pill behind text */}
          <div className="-mb-1 -ml-5 -mr-5 -pr-5 pt-2 pb-2
            backdrop-blur-md bg-white/25 shadow-sm shadow-neutral-500
            border-l-black border-r-black border-l-[.1rem] border-r-[.1rem]">
            <p className="text-white/97 text-md font-display font-bold edt h-[1.4rem] overflow-hidden [text-shadow:.25_.25_.25px_black,-.2_-.2_.2px_black]">
                <span className="text-white/97 text-xs inline-block whitespace-pre">  . . . . .  </span>
                <span>{cat.label}</span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">  . . . . </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. . . . </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. . . . </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
                <span className="text-white/97 text-xs inline-block whitespace-pre">. </span>
            </p>
          </div>
        </motion.div>

        {/* Flipped view — project list */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-start p-5 z-10"
          animate={{ opacity: isFlipped ? 1 : 0 }}
          transition={{ duration: 0.2, delay: isFlipped ? 0.15 : 0 }}
        >
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3 font-display">
            {cat.label}
          </p>
          <div className="flex flex-col gap-2">
            {cat.projects.map((proj, i) => (
              <div key={i} className="border-b border-white/10 pb-2 last:border-0">
                <p className="text-white text-sm font-sans font-medium leading-tight">{proj.title}</p>
                <p className="text-white/40 text-xs font-sans">{proj.desc} · {proj.year}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Accent dot */}
            <div
            className="absolute top-4 right-4 w-2 h-2 rounded-full z-20"
            style={{ backgroundColor: cat.accent }}
            />
        </motion.div>
    </div>
  );
}

// ===================================================

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [rippleIndex, setRippleIndex] = useState(null);
  const [rippleOrder, setRippleOrder] = useState(null);

  const gridPositions = [
    [0, 0], [0, 2], [0, 3],
    [1, 0], [1, 2],
  ];

  const handleCardClick = (card, index) => {
    if (activeCategory === card.category) {
      setActiveCategory(null);
      setRippleIndex(null);
      setRippleOrder(null);
      return;
    }
    setActiveCategory(card.category);
    setRippleIndex(index);
    const [ri, ci] = gridPositions[index];
    const orders = gridPositions.map(([rj, cj]) =>
      Math.abs(ri - rj) + Math.abs(ci - cj)
    );
    setRippleOrder(orders);
  };

  return (
    <main className="bg-work min-h-screen pt-28 pb-20 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="m-1 mb-3 pb-3 outline-4 outline-solid outline-black rounded-xl
          border-solid border-e-olive-500 border-b-olive-500 border-t-olive-400 border-s-olive-400 border-2">
          <h1 className="text-8xl sm:text-9xl md:text-10xl
            font-inter font-extrabold text-black
            -mb-9 p-3 whitespace-normal
            text-shadow-[0.3px_0.3px_0px] text-shadow-neutral-800
            h-[1.2em] overflow-hidden">
            <span>BEST</span>
            <span className="inline-block whitespace-pre"> ✱</span>
            <span className="inline-block whitespace-pre"> ✱</span>
            <span className="inline-block whitespace-pre"> ✱</span>
            <span className="inline-block whitespace-pre"> ✱</span>
            <span className="inline-block whitespace-pre"> ✱</span>
            <span className="inline-block whitespace-pre"> ✱</span>
        </h1>

        <h1 className="text-7xl sm:text-8xl md:text-9xl
            font-inter font-extrabold text-black
            -mb-7 p-3 xs:pt-4 sm:pt-4 md:pt-3 lg:pt-3 whitespace-normal
            text-shadow-[0.3px_0.3px_0px] text-shadow-neutral-800
            h-[1.2em] overflow-hidden">
            <span className="text-white">✱</span>
            <span>SHIRT</span>
            <span className="text-white inline-block whitespace-pre">✱</span>
            <span className="text-white inline-block whitespace-pre"> ✱</span>
            <span className="text-white inline-block whitespace-pre"> ✱</span>
            <span className="text-white inline-block whitespace-pre"> ✱</span>
            <span className="text-white inline-block whitespace-pre"> ✱</span>
            <span className="text-white inline-block whitespace-pre"> ✱</span>
            <span className="text-white inline-block whitespace-pre"> ✱</span>
          </h1>
          <h1 className="text-6xl sm:text-7xl md:text-8xl
            font-inter font-extrabold text-black tracking-[-0.09em]
            -mb-3 p-3 xs:pt-5 sm:pt-4 md:pt-3 lg:pt-3 whitespace-normal
            text-shadow-[0.3px_0.3px_0px] text-shadow-neutral-800
            h-[1.2em] overflow-hidden">
            <span>FORWARD</span>
            <span className="inline-block whitespace-pre"> ✱ </span>
            <span className="inline-block whitespace-pre"> ✱ </span>
            <span className="inline-block whitespace-pre"> ✱ </span>
            <span className="inline-block whitespace-pre"> ✱ </span>
            <span className="inline-block whitespace-pre"> ✱ </span>
            <span className="inline-block whitespace-pre"> ✱ </span>
            <span className="inline-block whitespace-pre"> ✱ </span>
            <span className="inline-block whitespace-pre"> ✱ </span>
          </h1>
          <p className="font-inter text-white font-bold tracking-wider
            text-xl sm:text-3xl md:text-4xl
            p-3 pl-4 mt-2
            h-[3.4em] sm:h-[2.9em] md:h-[2.7em] overflow-hidden">
            <span className="text-highlight opacity-75
              [text-shadow:0_0_0.5px_black,0_0_0.5px_black,0_0_0.5px_black,0_0_0.5px_black]">
              AKA
            </span>
            <span> Superior-quality, Custom-designed Clothes & Swag</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
          </p>
          <p className="font-inter text-black font-bold tracking-wider
            text-md sm:text-xl md:text-2xl
            p-3 pl-4 -mt-1
            h-[3.8em] sm:h-[3.6em] md:h-[3.4em] overflow-hidden">
            <span> HELPING SMALL BUSINESSES AND PRIVATE CUSTOMERS TO PUT THEIR BEST FOOT FORWARD</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
            <span className="text-black inline-block whitespace-pre">  ✱</span>
          </p>
        </div>

        {/* Status text */}
        <div>
          <p className="text-white/40 font-sans text-sm mt-1 mb-2">
            {activeCategory
              ? `Showing ${categories[activeCategory].label} — click again to reset`
              : 'Click any card to explore that category'}
          </p>
          <span></span>
        </div>

        {/* Grid */}
         <div className="m-1 mb-3 p-4 pl-5 pt-5 outline-4 outline-solid outline-black rounded-xl
          border-solid border-e-olive-500 border-b-olive-500 border-t-olive-400 border-s-olive-400 border-2">
            <div className="grid grid-cols-1 md:grid-cols-5 md:grid-rows-[200px_200px_200px] gap-7">
            {gridCards.map((card, index) => (
                <Card
                key={card.id}
                card={card}
                index={index}
                activeCategory={activeCategory}
                onClick={handleCardClick}
                rippleIndex={rippleIndex}
                rippleOrder={rippleOrder ? rippleOrder[index] : null}
                />
            ))}
            </div>
        </div>

        {/* Reset button */}
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => {
                setActiveCategory(null);
                setRippleIndex(null);
                setRippleOrder(null);
              }}
              className="px-8 py-3 border border-white/20 text-white/60 font-sans text-sm rounded-full hover:border-white/40 hover:text-white transition-all duration-300"
            >
              Reset grid
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}