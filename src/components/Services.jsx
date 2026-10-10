import { useEffect, useRef, useState } from 'react';
import { services } from '../data/services.js';
import { byId } from '../data/projects.js';
import { useReveal } from '../hooks/useReveal.js';
import { finePointer, prefersReducedMotion } from '../lib/ticker.js';
import Mark from './Mark.jsx';
import Photo from './Photo.jsx';
import RevealLines from './RevealLines.jsx';
import '../styles/services.css';

/**
 * Large interactive list. On desktop, hovering a service reveals its photograph
 * in a frame that trails the pointer. On touch screens each row shows its image.
 */
export default function Services({ onShowWork }) {
  const ref = useReveal();
  const listRef = useRef(null);
  const floatRef = useRef(null);
  const [active, setActive] = useState(-1);

  // Trailing preview: eased toward the pointer, written straight to the DOM.
  useEffect(() => {
    const list = listRef.current;
    const float = floatRef.current;
    if (!list || !float || !finePointer()) return undefined;
    const reduce = prefersReducedMotion();
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    const loop = () => {
      x += (tx - x) * (reduce ? 1 : 0.14);
      y += (ty - y) * (reduce ? 1 : 0.14);
      float.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      if (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const move = (e) => {
      const r = list.getBoundingClientRect();
      // Sits right of the pointer, but never over the description column on the right
      const body = list.querySelector('.svc__body');
      const maxX = (body ? body.getBoundingClientRect().left - r.left : r.width) - float.offsetWidth - 32;
      tx = Math.max(r.width * 0.28, Math.min(maxX, e.clientX - r.left + 36));
      ty = e.clientY - r.top - float.offsetHeight / 2;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    list.addEventListener('pointermove', move);
    return () => {
      list.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="services section" id="services" aria-labelledby="services-title" ref={ref}>
      <div className="wrap">
        <Mark no="03">Services</Mark>
        <RevealLines
          id="services-title"
          className="services__title display"
          lines={['Four disciplines.', <>One <em>accountable</em> team.</>]}
        />

        <div className="svc-wrap" ref={listRef} onPointerLeave={() => setActive(-1)}>
          <ol className="svc-list">
            {services.map((s, i) => (
              <li
                key={s.id}
                className="svc"
                // State lives in a data attribute: changing className would wipe the
                // `is-in` class the scroll reveal adds to this element.
                data-state={active === i ? 'active' : active > -1 ? 'dim' : undefined}
                onPointerEnter={() => setActive(i)}
                data-reveal="fade"
                style={{ '--d': `${i * 90}ms` }}
              >
                <span className="svc__no label">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="svc__title display">{s.title}</h3>
                <div className="svc__body">
                  <p className="svc__text muted">{s.text}</p>
                  <button type="button" className="link-line svc__link" onClick={() => onShowWork(s.filter)}>
                    View the work <span className="arrow" aria-hidden="true">→</span>
                    <span className="visually-hidden"> for {s.short}</span>
                  </button>
                </div>
                {/* Touch screens: the image sits inside the row */}
                <span className="svc__media frame" aria-hidden="true">
                  <Photo project={byId(s.image)} sizes="92vw" alt="" />
                </span>
              </li>
            ))}
          </ol>

          {/* Desktop: one trailing preview that swaps image per hovered row */}
          <div className={`svc-float${active > -1 ? ' is-on' : ''}`} ref={floatRef} aria-hidden="true">
            <span className="svc-float__inner">
              {services.map((s, i) => (
                <span key={s.id} className={`svc-float__img${active === i ? ' is-current' : ''}`}>
                  <Photo project={byId(s.image)} sizes="340px" alt="" />
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
