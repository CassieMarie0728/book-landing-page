import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const BOOK_COVER_URL = 'https://customer-assets.emergentagent.com/job_nobullshit-grief/artifacts/98stp0hw_book-cover-6-x-9.jpg';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const children = el.querySelectorAll('[data-animate]');
    children.forEach((child, i) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(30px)';
      child.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`;
      setTimeout(() => {
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      }, 100);
    });
  }, []);

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        backgroundImage: `url(https://static.prod-images.emergentagent.com/jobs/613089b4-8ba0-462f-abf7-19092ae23d29/images/96f9e2cb02b4ba6ad876f8a9b0e37fd7a05ad9d2cae098b8b0d71e0a54d5227b.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-abyss/85" />

      {/* Red glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blood/10 blur-[120px] rounded-full" />

      <div
        ref={heroRef}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
      >
        {/* Book Cover */}
        <div data-animate className="flex-shrink-0 perspective-[1200px]">
          <div
            data-testid="book-cover"
            className="relative w-[280px] sm:w-[320px] md:w-[360px] transform hover:rotate-y-0 transition-transform duration-700"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateY(-8deg)',
              boxShadow: '20px 20px 60px rgba(0,0,0,0.6), -5px 0 15px rgba(212,42,42,0.15)',
            }}
          >
            <img
              src={BOOK_COVER_URL}
              alt="HOLY SH*T, THEY'RE GONE - Book Cover"
              data-testid="book-cover-image"
              className="w-full h-auto block"
              style={{ display: 'block' }}
            />
            {/* Spine effect */}
            <div
              className="absolute top-0 left-0 w-[18px] h-full bg-gradient-to-r from-black/50 to-transparent"
              style={{ transform: 'translateX(-16px) rotateY(90deg)', transformOrigin: 'right' }}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
          <p
            data-animate
            className="font-marker text-blood text-base md:text-lg -rotate-2 mb-4"
          >
            A grief book that doesn't play nice
          </p>

          <h1
            data-animate
            className="font-anton text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tight text-white mb-6"
          >
            HOLY SH*T,
            <br />
            <span className="text-blood">THEY'RE</span>
            <br />
            GONE
          </h1>

          <p
            data-animate
            className="font-body text-ash text-base md:text-lg leading-relaxed mb-4 max-w-xl"
          >
            Navigating the F*cking Aftermath of Loss Without the Bullsh*t
          </p>

          <p
            data-animate
            className="font-body text-grit text-sm uppercase tracking-[0.3em] mb-8"
          >
            A Brass Knuckles Survival Guide for the Brutally Shattered
          </p>

          <div data-animate className="flex flex-col sm:flex-row gap-4">
            <a
              href="#purchase"
              data-testid="hero-cta-get-book"
              className="font-anton text-lg uppercase tracking-wider px-10 py-4 bg-blood text-white hover:bg-blood-dark transition-colors duration-200 text-center"
            >
              GET THE BOOK
            </a>
            <a
              href="#about-book"
              data-testid="hero-cta-learn-more"
              className="font-body text-sm uppercase tracking-widest px-10 py-4 border-2 border-grit text-ash hover:border-blood hover:text-white transition-all duration-200 text-center"
            >
              WHAT IS THIS?
            </a>
          </div>

          <p
            data-animate
            className="font-marker text-blood/60 text-sm mt-8 -rotate-1"
          >
            by Cassandra Crossno
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="text-grit" size={28} />
      </div>
    </section>
  );
}
