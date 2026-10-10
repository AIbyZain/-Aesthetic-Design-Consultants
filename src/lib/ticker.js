/**
 * One shared requestAnimationFrame loop for every continuous effect
 * (smooth scroll, parallax, cursor, process progress). Callbacks receive the
 * current scroll position. Nothing here touches React state.
 */
const callbacks = new Set();
let frame = 0;

function tick() {
  const y = window.scrollY;
  callbacks.forEach((cb) => cb(y));
  frame = callbacks.size ? requestAnimationFrame(tick) : 0;
}

export function addTick(cb) {
  callbacks.add(cb);
  if (!frame) frame = requestAnimationFrame(tick);
  return () => {
    callbacks.delete(cb);
    if (!callbacks.size && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
