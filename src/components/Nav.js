'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center">
      {/* Logo / Name */}
      <Link href="/" className="font-serif text-xl text-white tracking-wide">
        Your Name
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex gap-10 font-sans text-sm uppercase tracking-widest text-white/70">
        <Link href="/" className="hover:text-white transition-colors">Work</Link>
        <Link href="/education" className="hover:text-white transition-colors">Education</Link>
        <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-white flex flex-col gap-1.5"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-primary border-t border-white/10 py-6 flex flex-col items-center gap-6 font-sans text-sm uppercase tracking-widest text-white/70 md:hidden">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Work</Link>
          <Link href="/education" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Education</Link>
          <Link href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors">Contact</Link>
        </div>
      )}
    </nav>
  );
}