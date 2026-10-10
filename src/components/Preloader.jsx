import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site.js';
import { byId } from '../data/projects.js';
import { prefersReducedMotion } from '../lib/ticker.js';
import Elevation from './Elevation.jsx';
import '../styles/preloader.css';

// Timing (ms). The counter never takes longer than MAX, so the whole intro
// (count + curtain) stays at about 2.5s even on a slow connection.
const MIN = 1000;
const MAX = 1450;
const CURTAIN = 750;

/** Wait for the hero photo and the fonts, whichever is slower. */
function assetsReady() {
  const hero = byId('two-storey-residence');
  const img = new Image();
  img.sizes = '100vw';
  if (hero.srcSm) img.srcset = `${hero.srcSm} 800w, ${hero.src} ${hero.width}w`;
  img.src = hero.src;
  const imgDone = img.decode ? img.decode().catch(() => {}) : Promise.resolve();
  const fontsDone = document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve();
  return Promise.all([imgDone, fontsDone]);
}

/**
 * Full-screen intro: the elevation draws itself, the studio name appears letter
 * by letter, a counter runs 0 to 100 with a hairline progress bar, then the
 * panel lifts like a curtain. The page underneath is already rendered.
 */
export default function Preloader({ onLift, onDone }) {
  const [leaving, setLeaving] = useState(false);
  const countRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    let ready = false;
    let shown = 0;
    let raf = 0;
    let timers = [];
    const start = performance.now();
    assetsReady().then(() => (ready = true));

    const finish = () => {
      setLeaving(true);
      onLift?.();
      timers.push(setTimeout(onDone, reduce ? 200 : CURTAIN));
    };

    const frame = (now) => {
      const t = now - start;
      // Time sets a floor; assets let it complete. MAX forces completion.
      const timeShare = Math.min(1, t / MIN);
      const goal = t >= MAX ? 1 : ready ? timeShare : Math.min(0.9, timeShare);
      shown += (goal - shown) * (goal === 1 ? 0.28 : 0.16);
      if (goal === 1 && 1 - shown < 0.01) shown = 1;
      const pct = Math.round(shown * 100);
      if (countRef.current) countRef.current.textContent = String(pct).padStart(2, '0');
      if (barRef.current) barRef.current.style.transform = `scaleX(${shown})`;
      if (shown < 1) raf = requestAnimationFrame(frame);
      else timers.push(setTimeout(finish, 80));
    };

    if (reduce) {
      // No counting theatre: a short, still hold, then fade.
      if (countRef.current) countRef.current.textContent = '100';
      if (barRef.current) barRef.current.style.transform = 'scaleX(1)';
      timers.push(setTimeout(finish, 300));
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [onLift, onDone]);

  const letters = site.name.split('');

  return (
    <div className={`preloader${leaving ? ' is-leaving' : ''}`} role="status" aria-live="polite">
      <span className="visually-hidden">Loading {site.name}</span>
      <div className="preloader__inner wrap" aria-hidden="true">
        <div className="preloader__drawing">
          <Elevation className="elev--draw" title="" />
        </div>

        <p className="preloader__name display">
          {letters.map((ch, i) => (
            <span key={i} style={{ '--i': i }}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </p>

        <div className="preloader__foot">
          <span className="label preloader__tag">Architecture, Interiors, Construction</span>
          <span className="preloader__count display">
            <span ref={countRef}>00</span>
            <span className="preloader__pct">%</span>
          </span>
        </div>
        <span className="preloader__track">
          <span ref={barRef} className="preloader__bar" />
        </span>
      </div>
    </div>
  );
}
