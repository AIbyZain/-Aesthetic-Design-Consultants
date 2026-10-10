import { useEffect, useRef } from 'react';

/**
 * Scroll reveal via IntersectionObserver. Attach the returned ref to a section;
 * every descendant with `data-reveal` (or class `lines` / `mark`) gets `.is-in`
 * the first time it enters the viewport. Pass deps to re-scan after DOM changes.
 */
export function useReveal(deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const targets = root.querySelectorAll('[data-reveal]:not(.is-in), .lines:not(.is-in), .mark:not(.is-in)');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
