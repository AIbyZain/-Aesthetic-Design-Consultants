import { addTick, prefersReducedMotion } from './ticker.js';

/**
 * Parallax for any element with data-parallax="<speed>" (e.g. 0.15).
 * Elements only move while on screen (IntersectionObserver toggles them).
 * The element's offset from the viewport centre drives translateY.
 */
export function initParallax(root = document) {
  if (prefersReducedMotion()) return () => {};
  const visible = new Set();
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target))),
    { rootMargin: '20% 0px' },
  );
  const els = root.querySelectorAll('[data-parallax]');
  els.forEach((el) => io.observe(el));

  let last = -1;
  const stop = addTick((y) => {
    if (y === last && !visible.size) return;
    last = y;
    const mid = window.innerHeight / 2;
    visible.forEach((el) => {
      const host = el.parentElement || el;
      const r = host.getBoundingClientRect();
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      const offset = (r.top + r.height / 2 - mid) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
  });

  return () => {
    io.disconnect();
    stop();
    els.forEach((el) => (el.style.transform = ''));
  };
}
