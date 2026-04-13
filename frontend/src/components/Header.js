import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'The Book', href: '#about-book' },
  { label: 'Author', href: '#about-author' },
  { label: 'Get It', href: '#purchase' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-testid="header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-abyss/95 backdrop-blur-sm border-b border-grit' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        <a
          href="#hero"
          data-testid="header-logo"
          className="font-heading text-blood text-xl md:text-2xl tracking-wide hover:opacity-80 transition-opacity"
        >
          ASHES & WHISKEY
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              className="font-heading text-sm uppercase tracking-widest text-ash hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#purchase"
            data-testid="nav-cta-get-book"
            className="font-heading text-sm uppercase tracking-wider px-6 py-2.5 bg-blood text-white hover:bg-blood-dark transition-colors duration-200"
          >
            GET THE BOOK
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          data-testid="mobile-menu-toggle"
          className="md:hidden text-bone"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          data-testid="mobile-menu"
          className="md:hidden bg-abyss/98 backdrop-blur-md border-t border-grit"
        >
          <nav className="flex flex-col items-center gap-6 py-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-lg uppercase tracking-widest text-ash hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#purchase"
              data-testid="mobile-nav-cta"
              onClick={() => setMenuOpen(false)}
              className="font-heading text-lg uppercase tracking-wider px-8 py-3 bg-blood text-white"
            >
              GET THE BOOK
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
