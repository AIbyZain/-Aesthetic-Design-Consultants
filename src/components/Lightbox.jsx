import { useCallback, useEffect, useRef } from 'react';
import { typeLabel } from '../data/projects.js';
import { whatsappAbout } from '../data/site.js';
import { setBackgroundInert, trapTab } from '../lib/inert.js';
import { WhatsAppIcon } from './Icons.jsx';
import NewTab from './NewTab.jsx';
import Photo from './Photo.jsx';
import Roll from './Roll.jsx';
import '../styles/lightbox.css';

/**
 * Full-screen project view. Esc closes, ←/→ step, swipe on touch, focus trapped,
 * page behind made inert, focus returned to the opening tile on close.
 */
export default function Lightbox({ list, index, onIndex, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const touchX = useRef(null);
  const project = list[index];
  const many = list.length > 1;

  const step = useCallback((dir) => onIndex((index + dir + list.length) % list.length), [index, list.length, onIndex]);

  useEffect(() => {
    const previous = document.activeElement;
    document.body.classList.add('is-locked');
    setBackgroundInert(true);
    closeRef.current?.focus();
    return () => {
      document.body.classList.remove('is-locked');
      setBackgroundInert(false);
      if (previous instanceof HTMLElement) previous.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight' && many) step(1);
      else if (e.key === 'ArrowLeft' && many) step(-1);
      else trapTab(e, dialogRef.current);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [many, onClose, step]);

  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current == null || !many) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <div
      className="lightbox"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lb-title"
      aria-describedby="lb-desc"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="lightbox__bar wrap">
        <span className="label muted">
          <span className="lightbox__pos">{String(index + 1).padStart(2, '0')}</span> / {String(list.length).padStart(2, '0')}
        </span>
        <button ref={closeRef} type="button" className="lightbox__close" onClick={onClose}>
          <span className="label">Close</span>
          <span className="cross" aria-hidden="true" />
        </button>
      </div>

      <div className="lightbox__body wrap" key={project.id}>
        <figure className="lightbox__figure">
          <Photo project={project} sizes="(min-width: 1024px) 66vw, 100vw" />
        </figure>

        <div className="lightbox__info">
          <p className="label lightbox__type">
            {project.category}
            <span>{typeLabel(project.type)}</span>
          </p>
          <h2 id="lb-title" className="lightbox__title display">
            {project.title}
          </h2>
          <p id="lb-desc" className="lightbox__desc muted">
            {project.description}
          </p>
          <a className="btn" href={whatsappAbout(project.title)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            <Roll>Ask about a space like this</Roll>
            <NewTab />
          </a>
        </div>
      </div>

      {many && (
        <div className="lightbox__nav wrap">
          <button type="button" className="link-line" onClick={() => step(-1)}>
            <span aria-hidden="true">←</span> Previous
          </button>
          <button type="button" className="link-line" onClick={() => step(1)}>
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
