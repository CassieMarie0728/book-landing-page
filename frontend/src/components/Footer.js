import React from 'react';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="bg-surface border-t border-grit py-12 md:py-16"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-heading text-blood text-xl mb-2" data-testid="footer-brand">
              ASHES & WHISKEY
            </p>
            <p className="font-body text-ash/60 text-sm" data-testid="footer-copyright">
              &copy; 2026 Ashes & Whiskey &mdash; Crafted with fire, fury, and zero f*cks given.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8" data-testid="footer-links">
            <a
              href="https://cassandracrossno.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-link-main-site"
              className="font-heading text-sm uppercase tracking-widest text-ash hover:text-blood transition-colors duration-200"
            >
              Main Site
            </a>
            <a
              href="https://nobullshitgrief.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-link-blog"
              className="font-heading text-sm uppercase tracking-widest text-ash hover:text-blood transition-colors duration-200"
            >
              The Blog
            </a>
            <a
              href="#purchase"
              data-testid="footer-link-buy"
              className="font-heading text-sm uppercase tracking-widest text-ash hover:text-blood transition-colors duration-200"
            >
              Buy
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-[1px] bg-grit/50" />

        {/* Bottom */}
        <div className="text-center">
          <p className="font-body text-ash/30 text-xs leading-relaxed max-w-2xl mx-auto" data-testid="footer-disclaimer">
            This site is not a substitute for professional medical, psychological, or legal advice.
            If you are in crisis, please reach out to the{' '}
            <a
              href="https://988lifeline.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blood/60 hover:text-blood underline underline-offset-2"
              data-testid="footer-crisis-link"
            >
              988 Suicide & Crisis Lifeline
            </a>{' '}
            (call or text 988) or contact a mental health professional.
          </p>
        </div>
      </div>
    </footer>
  );
}
