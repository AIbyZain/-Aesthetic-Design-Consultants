import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { filters, matchesFilter, projects } from '../data/projects.js';
import { useMediaQuery } from '../hooks/useReducedMotion.js';
import { useReveal } from '../hooks/useReveal.js';
import ProjectCard from './ProjectCard.jsx';
import '../styles/portfolio.css';

// Card image widths for srcset: 2 columns on phones, 3 from 640px.
const CARD_SIZES = '(min-width: 1360px) 420px, (min-width: 640px) 31vw, 46vw';

export default function Portfolio({ filter: active, onFilter: setActive, onOpen }) {
  const sectionRef = useReveal();

  // Two columns on phones, three from 640px. (Four was tried from 1200px but with six
  // projects it leaves two short columns, so three reads better.)
  const isTablet = useMediaQuery('(min-width: 640px)');
  const columnCount = isTablet ? 3 : 2;

  const visible = useMemo(() => projects.filter((p) => matchesFilter(p, active)), [active]);

  // Masonry: each card goes into the currently shortest column, estimated from
  // its crop ratio (height / width) plus room for the caption. Alternate columns
  // are then offset in CSS for an editorial stagger.
  const columns = useMemo(() => {
    const cols = Array.from({ length: columnCount }, () => []);
    const heights = Array(columnCount).fill(0);
    visible.forEach((p, i) => {
      const [w, h] = p.ratio.split('/').map(Number);
      const target = heights.indexOf(Math.min(...heights));
      cols[target].push({ project: p, index: i });
      heights[target] += h / w + 0.35;
    });
    return cols;
  }, [visible, columnCount]);

  // Sliding brass underline under the active filter
  const scrollerRef = useRef(null);
  const barRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;
    const measure = () => {
      const btn = bar.querySelector('[aria-pressed="true"]');
      if (btn) setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(bar);
    // Re-measure once web fonts have loaded and widths settle
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [active]);

  // Keep the active filter visible inside the sideways-scrolling bar (phones),
  // e.g. when a service link sets the filter. Scrolls the bar only, never the page.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const btn = barRef.current?.querySelector('[aria-pressed="true"]');
    if (!scroller || !btn || scroller.scrollWidth <= scroller.clientWidth) return;
    const left = btn.offsetLeft;
    const right = left + btn.offsetWidth;
    const pad = 24;
    let target = scroller.scrollLeft;
    if (left - pad < scroller.scrollLeft) target = left - pad;
    else if (right + pad > scroller.scrollLeft + scroller.clientWidth) target = right + pad - scroller.clientWidth;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    scroller.scrollTo({ left: Math.max(0, target), behavior: reduce ? 'auto' : 'smooth' });
  }, [active]);

  const countFor = (key) => projects.filter((p) => matchesFilter(p, key)).length;

  return (
    <section id="work" className="portfolio section" aria-labelledby="work-title" ref={sectionRef}>
      <div className="wrap">
        <p className="sheet micro" data-reveal>
          <span className="sheet__no">02</span>
          <span>Work</span>
        </p>
        <h2 id="work-title" className="section-title display" data-reveal style={{ '--d': 1 }}>
          Drawn, rendered <em>and built.</em>
        </h2>

        <div className="filters" ref={scrollerRef} data-reveal style={{ '--d': 2 }}>
          <div className="filters__bar" ref={barRef} role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                className="filters__btn"
                aria-pressed={active === f.key}
                onClick={() => setActive(f.key)}
              >
                {f.label}
                <sup className="filters__count">{countFor(f.key)}</sup>
              </button>
            ))}
            <span
              className="filters__indicator"
              aria-hidden="true"
              style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
            />
          </div>
        </div>

        <p className="visually-hidden" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </p>

        {/* Static wrapper carries the reveal class so React re-renders never remove it */}
        <div className="gallery-reveal" data-reveal>
          <div className={`gallery gallery--${columnCount}`}>
            {columns.map((col, c) => (
              <div className="gallery__col" key={c}>
                {col.map(({ project, index }) => (
                  <ProjectCard
                    key={`${active}-${project.id}`}
                    project={project}
                    order={index}
                    sizes={CARD_SIZES}
                    onOpen={() => onOpen(visible, index)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
