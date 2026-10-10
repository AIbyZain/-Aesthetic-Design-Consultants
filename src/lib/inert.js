/**
 * Make the page behind a modal (lightbox, menu, preloader) inert. Elements opt in
 * with `data-inert-bg` (skip link, header, main, footer, floating button).
 */
export function setBackgroundInert(on) {
  document.querySelectorAll('[data-inert-bg]').forEach((el) => {
    if (on) el.setAttribute('inert', '');
    else el.removeAttribute('inert');
  });
}

export function focusablesIn(container) {
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.closest('[hidden]') && el.getClientRects().length);
}

/** Keep Tab / Shift+Tab inside `container`. Call from a keydown handler. */
export function trapTab(e, container) {
  if (e.key !== 'Tab' || !container) return;
  const items = focusablesIn(container);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  const inside = container.contains(document.activeElement);
  if (e.shiftKey && (document.activeElement === first || !inside)) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
    e.preventDefault();
    first.focus();
  }
}
