import { useRef, useState } from 'react';
import { reviews } from '../data/reviews.js';
import { site } from '../data/site.js';
import { useReveal } from '../hooks/useReveal.js';
import Mark from './Mark.jsx';
import NewTab from './NewTab.jsx';

import '../styles/testimonials.css';

/** Large-quote slider: one review at a time, buttons, swipe and arrow keys. */
export default function Testimonials() {
  const ref = useReveal();
  const [i, setI] = useState(0);
  const touchX = useRef(null);
  const go = (n) => setI((n + reviews.length) % reviews.length);

  return (
    <section className="testi section" id="reviews" aria-labelledby="testi-title" ref={ref}>
      <div className="wrap testi__grid">
        <div className="testi__side">
          <Mark no="07">Testimonials</Mark>
          <h2 id="testi-title" className="testi__score" data-reveal="fade">
            <span className="testi__num display">{site.rating}</span>
            <span className="testi__stars" aria-hidden="true">
              ★★★★★
            </span>
            <span className="testi__count label muted">
              On Google, from {site.reviewCount} reviews
            </span>
          </h2>
          <a className="link-line testi__all" href={site.mapsLink} target="_blank" rel="noopener noreferrer">
            Read all reviews <span className="arrow" aria-hidden="true">↗</span>
            <NewTab />
          </a>
        </div>

        <div
          className="testi__stage"
          role="group"
          aria-roledescription="carousel"
          aria-label="Client reviews"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current == null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
            touchX.current = null;
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(i + 1);
            if (e.key === 'ArrowLeft') go(i - 1);
          }}
        >
          <span className="testi__mark display" aria-hidden="true">
            “
          </span>
          {/* All slides share one grid cell, so the height never jumps between quotes */}
          <div className="testi__slides" aria-live="polite">
            {reviews.map((rv, n) => (
              <figure
                key={rv.id}
                className={`testi__quote${n === i ? ' is-active' : ''}`}
                aria-roledescription="slide"
                aria-label={`${n + 1} of ${reviews.length}`}
                aria-hidden={n !== i || undefined}
              >
                <blockquote>
                  <p className="display">{rv.text}</p>
                </blockquote>
                <figcaption>
                  <span className="testi__name">{rv.name}</span>
                  <span className="label muted">{rv.badge ? `${rv.badge}, Google review` : 'Google review'}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="testi__controls">
            <div className="testi__ticks" aria-hidden="true">
              {reviews.map((rv, n) => (
                <span key={rv.id} className={n === i ? 'is-on' : undefined} />
              ))}
            </div>
            <div className="testi__btns">
              <button type="button" className="testi__btn" onClick={() => go(i - 1)} aria-label="Previous review">
                <span aria-hidden="true">←</span>
              </button>
              <button type="button" className="testi__btn" onClick={() => go(i + 1)} aria-label="Next review">
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
