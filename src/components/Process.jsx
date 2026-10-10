import { useEffect, useRef } from 'react';
import { process } from '../data/services.js';
import { useReveal } from '../hooks/useReveal.js';
import { addTick, prefersReducedMotion } from '../lib/ticker.js';
import Mark from './Mark.jsx';
import RevealLines from './RevealLines.jsx';
import '../styles/process.css';

/**
 * Timeline. A bronze line fills down the spine as the section scrolls past,
 * and each step lights up when the line reaches it.
 */
export default function Process() {
  const ref = useReveal();
  const listRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    const steps = Array.from(list.querySelectorAll('.step'));
    if (prefersReducedMotion()) {
      fill.style.transform = 'scaleY(1)';
      steps.forEach((s) => s.classList.add('is-lit'));
      return undefined;
    }
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: '10% 0px' });
    io.observe(list);
    const stop = addTick(() => {
      if (!visible) return;
      const r = list.getBoundingClientRect();
      const line = window.innerHeight * 0.6; // the "reading line"
      const p = Math.max(0, Math.min(1, (line - r.top) / r.height));
      fill.style.transform = `scaleY(${p.toFixed(4)})`;
      steps.forEach((s) => {
        const sr = s.getBoundingClientRect();
        s.classList.toggle('is-lit', sr.top < line);
      });
    });
    return () => {
      io.disconnect();
      stop();
    };
  }, []);

  return (
    <section className="process section" id="process" aria-labelledby="process-title" ref={ref}>
      <div className="wrap process__grid">
        <div className="process__head">
          <Mark no="06">Process</Mark>
          <RevealLines
            id="process-title"
            className="process__title display"
            lines={['From first meeting', <>to <em>handover.</em></>]}
          />
          <p className="process__intro muted" data-reveal="fade">
            Five clear stages and one team throughout, so you always know what happens next.
          </p>
        </div>

        <div className="steps" ref={listRef}>
          <span className="steps__spine" aria-hidden="true">
            <span className="steps__fill" ref={fillRef} />
          </span>
          <ol className="steps__list">
            {process.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step__node" aria-hidden="true" />
                <span className="step__no display" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="step__body">
                  <h3 className="step__title display">
                    <span className="visually-hidden">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="step__text muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
