'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const categories = {
  web: {
    label: 'Web Development',
    color: 'from-green-900 to-green-700',
    accent: '#639922',
    projects: [
      { title: 'E-commerce Platform', desc: 'Next.js + Shopify', year: '2024' },
      { title: 'Portfolio Site', desc: 'React + Framer Motion', year: '2024' },
      { title: 'SaaS Dashboard', desc: 'Next.js + Tailwind', year: '2023' },
    ],
  },
  brand: {
    label: 'Brand Creation',
    color: 'from-orange-900 to-orange-700',
    accent: '#d85a30',
    projects: [
      { title: 'Startup Identity', desc: 'Logo + guidelines', year: '2024' },
      { title: 'Restaurant Brand', desc: 'Full brand system', year: '2023' },
      { title: 'Personal Brand', desc: 'Visual identity', year: '2023' },
    ],
  },
  art: {
    label: 'Original Art & Design',
    color: 'from-purple-900 to-purple-700',
    accent: '#7f77dd',
    projects: [
      { title: 'Digital Series', desc: 'Generative illustration', year: '2024' },
      { title: 'Mixed Media', desc: 'Print + digital', year: '2023' },
      { title: 'Commission Work', desc: 'Custom pieces', year: '2023' },
    ],
  },
  print: {
    label: 'Print on Demand',
    color: 'from-teal-900 to-teal-700',
    accent: '#1d9e75',
    projects: [
      { title: 'Apparel Line', desc: 'Clothing + accessories', year: '2024' },
      { title: 'Poster Series', desc: 'Limited edition prints', year: '2023' },
    ],
  },
  shop: {
    label: 'Shop Creation',
    color: 'from-amber-900 to-amber-700',
    accent: '#ba7517',
    projects: [
      { title: 'Etsy Store', desc: 'Art + merchandise', year: '2024' },
      { title: 'Shopify Build', desc: 'Full store setup', year: '2023' },
    ],
  },
};

// Grid layout definition
const gridCards = [
  { id: 'web',   category: 'web',   style: 'col-span-2 row-span-2', size: 'large' },
  { id: 'brand', category: 'brand', style: 'col-span-1 row-span-1', size: 'small' },
  { id: 'art',   category: 'art',   style: 'col-span-1 row-span-1', size: 'small' },
  { id: 'print', category: 'print', style: 'col-span-2 row-span-1', size: 'wide' },
  { id: 'shop',  category: 'shop',  style: 'col-span-1 row-span-1', size: 'small' },
];

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

  return (
    <motion.div
      ref={ref}
      className={`${card.style} relative rounded-2xl overflow-hidden cursor-pointer border border-white/10`}
      style={{ minHeight: card.size === 'large' ? 320 : card.size === 'wide' ? 140 : 160 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(card, index)}
      animate={{
        scale: isFlipped ? 1.02 : 1,
        borderColor: isActive ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)',
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-60`} />
      <div className="absolute inset-0 bg-primary/40" />

      {/* Default view — category label */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-5 z-10"
        animate={{ opacity: isFlipped ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-white/50 text-xs uppercase tracking-widest mb-1 font-sans">
          {cat.label}
        </p>
        {card.size === 'large' && (
          <p className="text-white/30 text-sm font-sans">
            {categories[card.category].projects.length} projects
          </p>
        )}
      </motion.div>

      {/* Flipped view — project list */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-start p-5 z-10"
        animate={{ opacity: isFlipped ? 1 : 0 }}
        transition={{ duration: 0.2, delay: isFlipped ? 0.15 : 0 }}
      >
        <p className="text-white/40 text-xs uppercase tracking-widest mb-3 font-sans">
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
        className="absolute top-4 right-4 w-2 h-2 rounded-full"
        style={{ backgroundColor: cat.accent }}
      />
    </motion.div>
  );
}

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [rippleIndex, setRippleIndex] = useState(null);
  const [rippleOrder, setRippleOrder] = useState(null);

  // Manhattan distance from clicked card to each other card
  const gridPositions = [
    [0, 0], [0, 2], [0, 3],
    [1, 0], [1, 2],
  ];

  const handleCardClick = (card, index) => {
    if (activeCategory === card.category) {
      // Reset
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
    <main className="min-h-screen bg-primary pt-28 pb-20 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-highlight text-xs uppercase tracking-widest font-sans mb-3 opacity-70">
            selected work
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white tracking-widest">
            PROJECTS
          </h1>
          <p className="text-white/40 font-sans text-sm mt-3">
            {activeCategory
              ? `Showing ${categories[activeCategory].label} — click again to reset`
              : 'Click any card to explore that category'}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
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