import React from 'react';

const AUTHOR_PLACEHOLDER = 'https://images.unsplash.com/photo-1591532149831-0211578ec58f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwzfHxkYXJrJTIwbW9vZHklMjB0eXBld3JpdGVyJTIwd2hpc2tleSUyMGdsYXNzJTIwdmludGFnZSUyMGRlc2t8ZW58MHx8fHwxNzc2MDQzNjI2fDA&ixlib=rb-4.1.0&q=85';

export default function AboutAuthor() {
  return (
    <section
      id="about-author"
      data-testid="about-author-section"
      className="relative py-24 md:py-32 bg-surface overflow-hidden"
    >
      {/* Top border accent */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blood to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Placeholder Image */}
          <div className="flex-shrink-0 relative" data-testid="author-portrait-container">
            <div
              className="w-[280px] h-[360px] md:w-[340px] md:h-[440px] overflow-hidden border-2 border-grit"
              style={{ boxShadow: '8px 8px 0 #D42A2A' }}
            >
              <img
                src={AUTHOR_PLACEHOLDER}
                alt="Whiskey glass and keyboard - Ashes & Whiskey"
                data-testid="author-portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-heading text-blood text-sm absolute -bottom-4 -right-4 rotate-3">
              Navy Vet. Writer. Survivor.
            </p>
          </div>

          {/* Bio */}
          <div className="flex-1">
            <p
              className="font-heading text-blood text-lg md:text-xl -rotate-2 mb-4"
              data-testid="author-label"
            >
              The broad behind the madness
            </p>

            <h2
              className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-8 leading-[0.95]"
              data-testid="author-title"
            >
              CASSANDRA
              <br />
              <span className="text-blood">CROSSNO</span>
            </h2>

            <div className="space-y-5 max-w-2xl">
              <p className="font-body text-ash text-base md:text-lg leading-relaxed" data-testid="author-bio-1">
                I'm not a therapist, a grief counselor, or a spiritual guru. I'm someone who watched my entire world go up in flames when I lost the love of my life, Patrick, and had to figure out how to keep f*cking breathing anyway.
              </p>
              <p className="font-body text-ash text-base md:text-lg leading-relaxed" data-testid="author-bio-2">
                I'm a Navy veteran, an unapologetic force of nature, and someone who was exiled by her own family after loss. Everything I found after my loss was either clinical garbage or toxic positivity wrapped in goddamn pastel.
              </p>
              <p className="font-body text-bone text-base md:text-lg leading-relaxed font-medium" data-testid="author-bio-3">
                So I started writing. With a lot of profanity. With dark humor. With the kind of devastating honesty I wish someone had given me when I was on the bathroom floor at 3 AM, begging the universe to come finish the job.
              </p>
              <p className="font-body text-ash text-base md:text-lg leading-relaxed" data-testid="author-bio-4">
                This book &mdash; this whole corner of the internet &mdash; exists because grief shouldn't require you to perform politeness while your heart is in pieces.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
