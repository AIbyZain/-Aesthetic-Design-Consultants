/**
 * Make the page behind a modal (lightbox, mobile menu) inert, so keyboard and
 * screen-reader users can't reach it. Elements opt in with `data-inert-bg`
 * (skip link, header, main, footer, floating button).
 */
export function setBackgroundInert(on) {
  document.querySelectorAll('[data-inert-bg]').forEach((el) => {
    if (on) el.setAttribute('inert', '');
    else el.removeAttribute('inert');
  });
}

/** All keyboard-focusable elements inside a container, in DOM order. */
export function focusablesIn(container) {
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.closest('[hidden]'));
}

/** Keep Tab / Shift+Tab cycling inside `container`. Call from a keydown handler. */
export function trapTab(e, container) {
  if (e.key !== 'Tab') return;
  const items = focusablesIn(container);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (e.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && (document.activeElement === last || !container.contains(document.activeElement))) {
    e.preventDefault();
    first.focus();
  }
}
