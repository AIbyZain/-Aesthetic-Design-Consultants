import { reviews } from '../data/reviews.js';
import { site } from '../data/site.js';
import { useReveal } from '../hooks/useReveal.js';
import { Stars, WhatsAppIcon } from './Icons.jsx';
import NewTab from './NewTab.jsx';
import '../styles/reviews.css';

export default function Reviews() {
  const ref = useReveal();
  const [lead, ...rest] = reviews;

  return (
    <section id="reviews" className="reviews section" aria-labelledby="reviews-title" ref={ref}>
      <div className="wrap">
        <p className="sheet sheet--ink micro" data-reveal>
          <span className="sheet__no">06</span>
          <span>Reviews</span>
        </p>

        <h2 id="reviews-title" className="reviews__score display" data-reveal style={{ '--d': 1 }}>
          {site.rating} <span className="reviews__star">★</span>
          <span className="reviews__count"> · {site.reviewCount} Google reviews</span>
        </h2>

        <figure className="quote quote--lead" data-reveal style={{ '--d': 2 }}>
          <blockquote>
            <p className="display">“{lead.text}”</p>
          </blockquote>
          <Attribution review={lead} />
        </figure>

        <div className="reviews__pair">
          {rest.map((r, i) => (
            <figure key={r.id} className="quote" data-reveal style={{ '--d': i + 1 }}>
              <blockquote>
                <p className="display">“{r.text}”</p>
              </blockquote>
              <Attribution review={r} />
            </figure>
          ))}
        </div>

        <div className="reviews__actions">
          <a className="btn btn--brass-solid" href={site.whatsappConsult} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> Start your project
            <NewTab />
          </a>
          <a className="link-arrow reviews__all" href={site.mapsLink} target="_blank" rel="noopener noreferrer">
            Read all reviews on Google <span className="btn__arrow" aria-hidden="true">↗</span>
            <NewTab />
          </a>
        </div>
      </div>
    </section>
  );
}

function Attribution({ review }) {
  return (
    <figcaption className="quote__by">
      <Stars count={review.rating} />
      <span className="quote__name">{review.name}</span>
      <span className="quote__role">{review.badge ? `${review.badge}, Google review` : 'Google review'}</span>
    </figcaption>
  );
}
