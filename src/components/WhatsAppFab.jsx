import { useEffect, useState } from 'react';
import { site } from '../data/site.js';
import { WhatsAppIcon } from './Icons.jsx';
import NewTab from './NewTab.jsx';
import '../styles/fab.css';

/** Floating WhatsApp button. Hidden over the hero (it has its own CTAs) and at Contact. */
export default function WhatsAppFab() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const targets = ['top', 'contact'].map((id) => document.getElementById(id)).filter(Boolean);
    const onScreen = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => onScreen.set(e.target.id, e.isIntersecting));
        setHidden([...onScreen.values()].some(Boolean));
      },
      { threshold: 0.08 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <a
      className={`fab${hidden ? ' is-hidden' : ''}`}
      href={site.whatsappConsult}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={hidden ? -1 : undefined}
      aria-hidden={hidden || undefined}
      data-inert-bg
    >
      <WhatsAppIcon className="fab__icon" />
      <span className="fab__label">WhatsApp</span>
      <span className="visually-hidden"> to book a consultation</span>
      <NewTab />
    </a>
  );
}
