import { useEffect, useRef, useState } from 'react';
import { nav, site } from '../data/site.js';
import { setBackgroundInert, trapTab } from '../lib/inert.js';
import { WhatsAppIcon } from './Icons.jsx';
import Magnetic from './Magnetic.jsx';
import NewTab from './NewTab.jsx';
import Roll from './Roll.jsx';
import '../styles/header.css';

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const sentinel = useRef(null);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  // Transparent over the hero; solid once the page scrolls past a sentinel.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting));
    io.observe(sentinel.current);
    return () => io.disconnect();
  }, []);

  // Scroll-spy: whichever section crosses a band near the top is "current".
  useEffect(() => {
    const seen = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        setCurrent(nav.find((n) => seen.get(n.id))?.id ?? null);
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Menu: inert page, scroll lock, focus trap, Escape, focus restore.
  useEffect(() => {
    if (!open) return undefined;
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    document.body.classList.add('is-locked');
    setBackgroundInert(true);
    const t = setTimeout(() => menu.querySelector('a[href]')?.focus(), 50);
    const onKey = (e) => (e.key === 'Escape' ? setOpen(false) : trapTab(e, menu));
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
      setBackgroundInert(false);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <div ref={sentinel} className="header-sentinel" aria-hidden="true" />
      <header className={`header${solid ? ' is-solid' : ''}`} data-inert-bg>
        <div className="header__inner wrap">
          <a className="brand" href="#top" aria-label={`${site.name}, back to top`}>
            <span className="brand__mark display">ADC</span>
            <span className="brand__name" aria-hidden="true">
              Aesthetic Design
              <br />
              Consultants
            </span>
          </a>

          <nav className="header__nav" aria-label="Primary">
            <ul>
              {nav.map((item, i) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} aria-current={current === item.id ? 'location' : undefined}>
                    <span className="header__no" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__cta">
            <Magnetic strength={0.25}>
              <a className="btn btn--ghost btn--sm" href={site.whatsappConsult} target="_blank" rel="noopener noreferrer">
                <Roll>Book a consultation</Roll>
                <NewTab />
              </a>
            </Magnetic>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="header__toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
          >
            <span className="label">Menu</span>
            <span className="burger" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <div
        id="site-menu"
        ref={menuRef}
        className={`menu${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
      >
        <div className="menu__inner wrap">
          <div className="menu__top">
            <span className="brand__mark display">ADC</span>
            <button type="button" className="menu__close" onClick={() => setOpen(false)}>
              <span className="label">Close</span>
              <span className="cross" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Menu">
            <ol className="menu__list">
              {nav.map((item, i) => (
                <li key={item.id} style={{ '--i': i }}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={current === item.id ? 'location' : undefined}
                  >
                    <span className="menu__no label">{String(i + 1).padStart(2, '0')}</span>
                    <span className="menu__word display">{item.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="menu__foot">
            <div>
              <p className="label muted">Call the studio</p>
              <a className="menu__phone display" href={site.phoneHref}>
                {site.phoneDisplay}
              </a>
            </div>
            <a className="btn" href={site.whatsappConsult} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              <Roll>Book a consultation</Roll>
              <NewTab />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
