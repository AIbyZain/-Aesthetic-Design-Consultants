import { useEffect, useRef } from 'react';
import '../styles/cursor.css';

/**
 * A small "View" label that follows the pointer over project images.
 * Desktop only (fine pointer + hover) and off for reduced motion.
 * Position is written straight to the element's transform in rAF, so React never re-renders.
 * The native cursor stays visible; this is a label, not a cursor replacement.
 */
export default function ViewCursor() {
  const ref = useRef(null);

  useEffect(() => {
    const ok = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!ok.matches) return undefined;

    const el = ref.current;
    let x = 0;
    let y = 0;
    let frame = 0;

    const paint = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = 0;
    };

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      const over = e.target instanceof Element && e.target.closest('[data-cursor="view"]');
      el.classList.toggle('is-on', Boolean(over));
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => el.classList.remove('is-on');

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="view-cursor" aria-hidden="true">
      <span>View</span>
    </div>
  );
}
