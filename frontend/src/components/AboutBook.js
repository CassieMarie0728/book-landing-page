import React from 'react';
import { Flame, Brain, Shield, HeartCrack } from 'lucide-react';

const THEMES = [
  {
    icon: HeartCrack,
    title: 'Surviving "Firsts"',
    desc: 'First holidays, birthdays, and ordinary days that feel impossible without them.',
  },
  {
    icon: Flame,
    title: 'The Rage Nobody Warns You About',
    desc: 'When sadness turns to fury and everyone around you just wants you to calm down.',
  },
  {
    icon: Brain,
    title: 'A Battle Plan for Your Brain',
    desc: 'Grief brain is real. This is the manual for when your mind checks out.',
  },
  {
    icon: Shield,
    title: 'Handling the Bullsh*t',
    desc: '"Everything happens for a reason." Here\'s how to survive the platitudes without committing arson.',
  },
];

export default function AboutBook() {
  return (
    <section
      id="about-book"
      data-testid="about-book-section"
      className="relative py-24 md:py-32 bg-surface"
    >
      {/* Top border accent */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blood to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <p
          className="font-marker text-blood text-lg md:text-xl -rotate-2 mb-4"
          data-testid="about-book-label"
        >
          If your world just exploded
        </p>

        <h2
          className="font-anton text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-8 leading-[0.95]"
          data-testid="about-book-title"
        >
          THIS ISN'T A
          <br />
          <span className="text-blood">"HEALING JOURNEY"</span>
          <br />
          BOOK
        </h2>

        <div className="max-w-3xl mb-16">
          <p className="font-body text-ash text-lg md:text-xl leading-relaxed mb-6" data-testid="about-book-text-1">
            You're not "going through a rough patch." Your entire life got napalmed.
            The people around you want you to be "okay" again because it makes <em>them</em> more comfortable.
          </p>
          <p className="font-body text-ash text-lg md:text-xl leading-relaxed mb-6" data-testid="about-book-text-2">
            This book is not for them. It's for you &mdash; the one who actually has to live in the crater.
          </p>
          <p className="font-body text-bone text-lg md:text-xl leading-relaxed font-medium" data-testid="about-book-text-3">
            776 pages of raw, unfiltered truth. No platitudes. No toxic positivity. No "stages of grief" garbage. Just a brass knuckles survival guide that meets you exactly where you are &mdash; in the shit.
          </p>
        </div>

        {/* Theme cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6" data-testid="book-themes-grid">
          {THEMES.map((t, i) => (
            <div
              key={i}
              data-testid={`theme-card-${i}`}
              className="group bg-elevated border border-grit p-6 md:p-8 hover:border-blood transition-all duration-300"
              style={{ boxShadow: '4px 4px 0 #1a1a1a' }}
            >
              <t.icon
                className="text-blood mb-4 group-hover:scale-110 transition-transform duration-300"
                size={32}
                strokeWidth={1.5}
              />
              <h3 className="font-anton text-xl md:text-2xl uppercase tracking-tight text-white mb-2">
                {t.title}
              </h3>
              <p className="font-body text-ash text-sm md:text-base leading-relaxed">
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
