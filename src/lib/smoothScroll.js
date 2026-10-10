import { addTick, finePointer, prefersReducedMotion } from './ticker.js';

/**
 * Lightweight inertial scrolling (no library).
 * - Wheel input on desktop is eased toward a target; keyboard, scrollbar and
 *   touch scrolling stay native.
 * - In-page anchor links glide to their section, then move focus there.
 * - Disabled for touch devices and for reduced motion.
 */
let target = 0;
let current = 0;
let active = false;
let tween = null; // anchor tween { from, to, start, dur }
let stopTick = null;

const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;
const clamp = (v) => Math.max(0, Math.min(maxScroll(), v));
const jump = (y) => window.scrollTo({ top: y, behavior: 'instant' });
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function step(now) {
  if (tween) {
    const t = Math.min(1, (performance.now() - tween.start) / tween.dur);
    current = target = tween.from + (tween.to - tween.from) * easeInOut(t);
    jump(current);
    if (t === 1) tween = null;
    return;
  }
  if (!active) return;
  current += (target - current) * 0.11;
  if (Math.abs(target - current) < 0.4) {
    current = target;
    active = false;
  }
  jump(current);
  return now;
}

function ensureTick() {
  if (!stopTick) stopTick = addTick(step);
}

function onWheel(e) {
  if (e.ctrlKey || e.defaultPrevented) return;
  if (document.body.classList.contains('is-locked')) return;
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // sideways scrollers stay native
  if (e.target instanceof Element && e.target.closest('[data-native-scroll]')) return;
  e.preventDefault();
  tween = null;
  if (!active) current = target = window.scrollY;
  const unit = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? window.innerHeight : 1;
  target = clamp(target + e.deltaY * unit);
  active = true;
  ensureTick();
}

// Any other kind of scrolling (keys, scrollbar) cancels the easing.
function onKey() {
  active = false;
  tween = null;
}

/** Glide to an element, then focus it for keyboard and screen-reader users. */
export function scrollToElement(el, { focus = true } = {}) {
  if (!el) return;
  const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const to = clamp(el.getBoundingClientRect().top + window.scrollY - offset);
  if (prefersReducedMotion()) {
    jump(to);
  } else {
    active = false;
    const from = window.scrollY;
    const dist = Math.abs(to - from);
    tween = { from, to, start: performance.now(), dur: Math.min(1600, 700 + dist * 0.25) };
    ensureTick();
  }
  if (focus) {
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }
}

function onClick(e) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
  const link = e.target instanceof Element && e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href').slice(1);
  const el = id ? document.getElementById(id) : null;
  if (!el) return;
  e.preventDefault();
  scrollToElement(el);
  history.pushState(null, '', `#${id}`);
}

export function initSmoothScroll() {
  document.addEventListener('click', onClick);
  const wheel = finePointer() && !prefersReducedMotion();
  if (wheel) {
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
  }
  return () => {
    document.removeEventListener('click', onClick);
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('keydown', onKey);
    stopTick?.();
    stopTick = null;
  };
}
