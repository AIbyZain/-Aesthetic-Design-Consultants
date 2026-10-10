import { useEffect, useRef } from 'react';
import { addTick, finePointer, prefersReducedMotion } from '../lib/ticker.js';
import '../styles/cursor.css';

/**
 * Desktop cursor: a bronze dot that tracks exactly, and a ring that follows
 * with easing. Over project images the ring opens with "View"; over the
 * comparison slider it reads "Drag"; over links and buttons it grows.
 * Off for touch and reduced motion (the native cursor stays).
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!finePointer() || prefersReducedMotion()) return undefined;
    const root = document.documentElement;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    root.classList.add('has-cursor');

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      const t = e.target instanceof Element ? e.target : null;
      const mode = t?.closest('[data-cursor]')?.getAttribute('data-cursor');
      const hot = t?.closest('a, button, [role="slider"], label, select');
      ring.dataset.mode = mode || (hot ? 'hot' : '');
      label.textContent = mode === 'view' ? 'View' : mode === 'drag' ? 'Drag' : '';
      ring.classList.add('is-visible');
      dot.classList.add('is-visible');
    };
    const leave = () => {
      ring.classList.remove('is-visible');
      dot.classList.remove('is-visible');
    };
    const down = () => ring.classList.add('is-down');
    const up = () => ring.classList.remove('is-down');

    const stop = addTick(() => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0)`;
    });

    document.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    document.addEventListener('pointerdown', down);
    document.addEventListener('pointerup', up);
    return () => {
      stop();
      root.classList.remove('has-cursor');
      document.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      document.removeEventListener('pointerdown', down);
      document.removeEventListener('pointerup', up);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <span className="cursor__ring" ref={ringRef}>
        <span className="cursor__label" ref={labelRef} />
      </span>
      <span className="cursor__dot" ref={dotRef} />
    </div>
  );
}
