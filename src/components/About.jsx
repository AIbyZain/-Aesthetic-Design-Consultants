import { useEffect, useRef } from 'react';
import { site } from '../data/site.js';
import { byId } from '../data/projects.js';
import { useReveal } from '../hooks/useReveal.js';
import { prefersReducedMotion } from '../lib/ticker.js';
import Mark from './Mark.jsx';
import Photo from './Photo.jsx';
import RevealLines from './RevealLines.jsx';
import '../styles/about.css';

// Verified facts only (Google profile + the studio's own service list).
const counters = [
  { value: 5, decimals: 1, label: 'Google rating', suffix: '★' },
  { value: site.reviewCount, decimals: 0, label: 'Google reviews' },
  { value: 4, decimals: 0, label: 'Disciplines, one team' },
];

/** Counts up once when scrolled into view. Writes textContent directly. */
function Counter({ value, decimals, label, suffix }) {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    const final = value.toFixed(decimals);
    if (prefersReducedMotion()) {
      el.textContent = final;
      return undefined;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1800;
        const run = (now) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = (value * eased).toFixed(decimals);
          if (t < 1) raf = requestAnimationFrame(run);
        };
        raf = requestAnimationFrame(run);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, decimals]);

  return (
    <div className="counter">
      <dt className="label muted">{label}</dt>
      <dd className="counter__value display">
        {/* Screen readers get the final value; the animated digits are hidden */}
        <span className="visually-hidden">{value.toFixed(decimals)}</span>
        <span ref={numRef} aria-hidden="true">
          {(0).toFixed(decimals)}
        </span>
        {suffix && (
          <span className="counter__suffix" aria-hidden="true">
            {suffix}
          </span>
        )}
      </dd>
    </div>
  );
}

export default function About() {
  const ref = useReveal();
  const large = byId('library-lounge');
  const small = byId('grey-kitchen');

  return (
    <section className="about section" id="studio" aria-labelledby="about-title" ref={ref}>
      <div className="wrap about__grid">
        <div className="about__head">
          <Mark no="02">The studio</Mark>
          <RevealLines
            id="about-title"
            className="about__title display"
            lines={['One studio,', <>from the first line</>, <>to the <em>final finish.</em></>]}
          />
        </div>

        <figure className="about__large" data-reveal="image">
          <div className="frame about__frame-large">
            <div className="parallax-img" data-parallax="0.05">
              <Photo project={large} sizes="(min-width: 1024px) 52vw, 100vw" />
            </div>
          </div>
          <figcaption className="about__cap label muted">{large.title}, 3D visualisation</figcaption>
        </figure>

        <div className="about__body" data-reveal="fade">
          <p className="about__lead">
            {site.name} is an architecture and interiors practice in {site.locality}, led by {site.principal}.
          </p>
          <p className="about__text muted">
            We draw the plans, show every room in realistic 3D, then build it with our own team. Nothing is handed
            between firms, so what you approve on screen is what is handed over, with the craftsmanship and budget
            agreed at the start.
          </p>
          <p className="about__sign">
            <span className="about__sign-rule" aria-hidden="true" />
            <span className="display">{site.principal}</span>
          </p>
        </div>

        <figure className="about__small" data-reveal="image" style={{ '--d': '200ms' }}>
          <div className="frame about__frame-small">
            <Photo project={small} sizes="(min-width: 1024px) 26vw, 60vw" />
          </div>
          <figcaption className="about__cap label muted">{small.title}, built</figcaption>
        </figure>

        <dl className="about__counters" data-reveal="fade" style={{ '--d': '150ms' }}>
          {counters.map((c) => (
            <Counter key={c.label} {...c} />
          ))}
        </dl>
      </div>
    </section>
  );
}
