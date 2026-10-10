import { useEffect, useRef } from 'react';
import { site } from '../data/site.js';
import { useReveal } from '../hooks/useReveal.js';
import { addTick, prefersReducedMotion } from '../lib/ticker.js';
import { WhatsAppIcon } from './Icons.jsx';
import Elevation from './Elevation.jsx';
import Magnetic from './Magnetic.jsx';
import Mark from './Mark.jsx';
import NewTab from './NewTab.jsx';
import Roll from './Roll.jsx';
import '../styles/cta.css';

/**
 * Closing statement. The two lines drift in opposite directions as the section
 * scrolls through, over a faint, oversized elevation drawing.
 */
export default function Cta() {
  const ref = useReveal();
  const aRef = useRef(null);
  const bRef = useRef(null);

  useEffect(() => {
    const section = ref.current;
    if (!section || prefersReducedMotion()) return undefined;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(section);
    const stop = addTick(() => {
      if (!visible) return;
      const r = section.getBoundingClientRect();
      const p = (window.innerHeight - r.top) / (window.innerHeight + r.height) - 0.5; // -0.5..0.5
      aRef.current.style.transform = `translate3d(${(p * -8).toFixed(2)}vw, 0, 0)`;
      bRef.current.style.transform = `translate3d(${(p * 8).toFixed(2)}vw, 0, 0)`;
    });
    return () => {
      io.disconnect();
      stop();
    };
  }, [ref]);

  return (
    <section className="cta section" aria-labelledby="cta-title" ref={ref}>
      <div className="cta__drawing" aria-hidden="true">
        <Elevation title="" />
      </div>
      <div className="wrap cta__inner">
        <Mark no="08">Begin</Mark>
        <h2 id="cta-title" className="cta__title display">
          <span className="cta__line" ref={aRef}>
            Let’s design
          </span>
          <span className="cta__line cta__line--b" ref={bRef}>
            <em>your space.</em>
          </span>
        </h2>
        <div className="cta__foot" data-reveal="fade">
          <p className="cta__text muted">
            Tell us about your plot, your home or the room you want to change. We will take it from there.
          </p>
          <div className="cta__actions">
            <Magnetic>
              <a className="btn btn--lg" href={site.whatsappConsult} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                <Roll>Book a consultation</Roll>
                <NewTab />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn--ghost btn--lg" href={site.phoneHref}>
                <Roll>Call {site.phoneDisplay}</Roll>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
