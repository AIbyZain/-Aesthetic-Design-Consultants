import { useEffect, useRef, useState } from 'react';
import { byId, renderRealityPairs } from '../data/projects.js';
import { useReveal } from '../hooks/useReveal.js';
import { prefersReducedMotion } from '../lib/ticker.js';
import Mark from './Mark.jsx';
import Photo from './Photo.jsx';
import RevealLines from './RevealLines.jsx';
import '../styles/compare.css';

/**
 * Render ↔ built comparison slider. Drag anywhere on the image, or focus the
 * handle and use the arrow keys (Home/End jump to the ends).
 */
export default function Compare() {
  const ref = useReveal();
  const stageRef = useRef(null);
  const [pairKey, setPairKey] = useState(renderRealityPairs[0].key);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const pair = renderRealityPairs.find((p) => p.key === pairKey);
  const render = byId(pair.render);
  const built = byId(pair.built);

  const setFromX = (clientX) => {
    const r = stageRef.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  const onPointerDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromX(e.clientX);
  };
  const onPointerMove = (e) => dragging.current && setFromX(e.clientX);
  const onPointerUp = () => (dragging.current = false);

  const onKeyDown = (e) => {
    const stepBy = e.shiftKey ? 10 : 4;
    const map = { ArrowLeft: -stepBy, ArrowDown: -stepBy, ArrowRight: stepBy, ArrowUp: stepBy };
    if (e.key in map) {
      e.preventDefault();
      setPos((p) => Math.max(0, Math.min(100, p + map[e.key])));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPos(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPos(100);
    }
  };

  // One gentle sweep the first time the slider is seen, to show it can move.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || prefersReducedMotion()) return undefined;
    let timers = [];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        el.classList.add('is-hinting');
        timers = [
          setTimeout(() => setPos(32), 500),
          setTimeout(() => setPos(64), 1300),
          setTimeout(() => setPos(50), 2100),
          setTimeout(() => el.classList.remove('is-hinting'), 2900),
        ];
      },
      { threshold: 0.5 },
    );
    // Observe the unclipped wrapper; the stage itself starts clipped by the reveal.
    io.observe(el.parentElement);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className="compare section" id="render-to-reality" aria-labelledby="compare-title" ref={ref}>
      <div className="wrap">
        <div className="compare__head">
          <div>
            <Mark no="05">Render to reality</Mark>
            <RevealLines
              id="compare-title"
              className="compare__title display"
              lines={['What you approve in 3D', <>is what <em>we hand over.</em></>]}
            />
          </div>
          <div className="compare__switch" role="group" aria-label="Choose a comparison" data-reveal="fade">
            {renderRealityPairs.map((p) => (
              <button key={p.key} type="button" aria-pressed={p.key === pairKey} onClick={() => setPairKey(p.key)}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="compare__body">
          <div className="compare__reveal" data-reveal="image">
            <div
              className="compare__stage"
              ref={stageRef}
              data-cursor="drag"
              style={{ '--pos': `${pos}%` }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <div className="compare__layer compare__layer--built" key={`b-${built.id}`}>
                <Photo project={built} sizes="(min-width: 1024px) 62vw, 94vw" />
              </div>
              <div className="compare__layer compare__layer--render" key={`r-${render.id}`}>
                <Photo project={render} sizes="(min-width: 1024px) 62vw, 94vw" />
              </div>
              <div
                className="compare__handle"
                role="slider"
                tabIndex={0}
                aria-label="Comparison position: 3D render on the left, built work on the right"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pos)}
                aria-valuetext={`${Math.round(pos)}% render`}
                onKeyDown={onKeyDown}
              >
                <span className="compare__knob" aria-hidden="true">
                  <span>‹</span>
                  <span>›</span>
                </span>
              </div>
            </div>
          </div>

          <div className="compare__legend">
            <p>
              <span className="label compare__tag">3D render</span>
              <span className="display">{render.title}</span>
            </p>
            <p>
              <span className="label compare__tag">Built</span>
              <span className="display">{built.title}</span>
            </p>
          </div>
          <p className="compare__note muted">
            The render and site photograph come from separate projects, shown together to compare design and finish.
          </p>
        </div>
      </div>
    </section>
  );
}
