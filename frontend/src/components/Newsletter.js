import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const res = await fetch(`${API_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.detail?.[0]?.msg || data.detail || 'Something broke. Try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Connection failed. The universe is conspiring against you.');
    }
  };

  return (
    <section
      id="newsletter"
      data-testid="newsletter-section"
      className="relative py-24 md:py-32 bg-abyss"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
        <p
          className="font-heading text-blood text-lg md:text-xl -rotate-1 mb-4"
          data-testid="newsletter-label"
        >
          Don't grieve alone
        </p>

        <h2
          className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-6 leading-[0.95]"
          data-testid="newsletter-title"
        >
          GET THE <span className="text-blood">GRIEF SURVIVAL</span>
          <br />
          CHEAT SHEET
        </h2>

        <p className="font-body text-ash text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto" data-testid="newsletter-desc">
          A one-page printable with the 20 things you actually need to know when grief hits.
          Real talk, zero filler. Free, because grief is already f*cking expensive enough.
        </p>

        {status === 'success' ? (
          <div
            data-testid="newsletter-success"
            className="flex items-center justify-center gap-3 bg-blood/10 border border-blood/30 p-6"
          >
            <CheckCircle className="text-blood flex-shrink-0" size={24} />
            <p className="font-body text-bone text-lg">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" data-testid="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
              placeholder="your@email.com"
              required
              data-testid="newsletter-email-input"
              className="flex-1 bg-elevated border-2 border-grit text-bone font-body text-base px-5 py-4 placeholder:text-ash/50 focus:outline-none focus:border-blood transition-colors duration-200"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              data-testid="newsletter-submit-button"
              className="font-heading text-base uppercase tracking-wider px-8 py-4 bg-blood text-white hover:bg-blood-dark transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {status === 'loading' ? (
                'SENDING...'
              ) : (
                <>
                  F*CK IT, I'M IN
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <div
            data-testid="newsletter-error"
            className="flex items-center justify-center gap-2 mt-4 text-blood"
          >
            <AlertCircle size={18} />
            <p className="font-body text-sm">{message}</p>
          </div>
        )}

        <p className="font-body text-ash/40 text-xs mt-6" data-testid="newsletter-disclaimer">
          No spam. No "grief journey" emails. Just the cheat sheet and occasional new posts with a few well-placed f-bombs.
        </p>
      </div>
    </section>
  );
}
