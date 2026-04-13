import React from 'react';
import { ExternalLink } from 'lucide-react';

const STORES = [
  {
    name: 'Amazon',
    sub: 'Kindle & Paperback',
    url: 'https://www.amazon.com/HOLY-THEYRE-GONE-Navigating-Aftermath-ebook/dp/B0DYPKMSSZ',
  },
  {
    name: 'Barnes & Noble',
    sub: 'Nook & Print',
    url: 'http://www.barnesandnoble.com/s/2940184438580',
  },
  {
    name: 'Books-A-Million',
    sub: 'Print',
    url: 'https://www.booksamillion.com/p/Holy-Sht-Theyre-Gone/Cassandra-Crossno/9798230227113',
  },
  {
    name: 'Kobo',
    sub: 'eBook',
    url: 'https://www.kobo.com/us/en/ebook/holy-sh-t-they-re-gone-navigating-the-f-cking-aftermath-of-loss-without-the-bullsh-t',
  },
  {
    name: 'Smashwords',
    sub: 'eBook',
    url: 'https://www.smashwords.com/books/view/1730516',
  },
];

export default function PurchaseLinks() {
  return (
    <section
      id="purchase"
      data-testid="purchase-section"
      className="relative py-24 md:py-32 bg-abyss"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <p
            className="font-heading text-blood text-lg md:text-xl -rotate-1 mb-4"
            data-testid="purchase-label"
          >
            Pick your poison
          </p>
          <h2
            className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-[0.95]"
            data-testid="purchase-title"
          >
            GET THE <span className="text-blood">DAMN</span> BOOK
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5" data-testid="purchase-grid">
          {STORES.map((store, i) => (
            <a
              key={i}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`purchase-link-${store.name.toLowerCase().replace(/[\s&-]+/g, '-')}`}
              className="group relative flex items-center justify-between bg-elevated border-2 border-grit p-6 md:p-8 hover:border-blood hover:bg-surface transition-all duration-300"
            >
              <div>
                <h3 className="font-heading text-2xl md:text-3xl uppercase tracking-tight text-white group-hover:text-blood transition-colors duration-200">
                  {store.name}
                </h3>
                <p className="font-body text-ash text-sm uppercase tracking-widest mt-1">
                  {store.sub}
                </p>
              </div>
              <ExternalLink
                className="text-grit group-hover:text-blood transition-colors duration-200 flex-shrink-0 ml-4"
                size={24}
              />
            </a>
          ))}

          {/* Audiobook coming soon */}
          <div
            data-testid="purchase-link-audiobook"
            className="relative flex items-center justify-between bg-elevated/50 border-2 border-grit/50 p-6 md:p-8"
          >
            <div>
              <h3 className="font-heading text-2xl md:text-3xl uppercase tracking-tight text-ash/60">
                Audiobook
              </h3>
              <p className="font-heading text-blood text-sm mt-1 -rotate-1">
                Coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
