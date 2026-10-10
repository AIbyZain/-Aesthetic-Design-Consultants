import { useMemo } from 'react';
import { filters, matchesFilter, projects, typeLabel } from '../data/projects.js';
import { useReveal } from '../hooks/useReveal.js';
import Mark from './Mark.jsx';
import Photo from './Photo.jsx';
import RevealLines from './RevealLines.jsx';
import '../styles/work.css';

/**
 * Editorial layout, repeated every six projects: pairs of unequal images with
 * vertical offsets and one deliberate overlap. Index → slot.
 */
const SLOTS = [
  { cls: 'slot-a', ratio: '4 / 3', sizes: '(min-width: 1024px) 56vw, 100vw' },
  { cls: 'slot-b', ratio: '4 / 5', sizes: '(min-width: 1024px) 30vw, 78vw' },
  { cls: 'slot-c', ratio: '4 / 5', sizes: '(min-width: 1024px) 30vw, 100vw' },
  { cls: 'slot-d', ratio: '3 / 2', sizes: '(min-width: 1024px) 46vw, 78vw' },
  { cls: 'slot-e', ratio: '1 / 1', sizes: '(min-width: 1024px) 38vw, 100vw' },
  { cls: 'slot-f', ratio: '4 / 5', sizes: '(min-width: 1024px) 38vw, 78vw' },
];

export default function Work({ filter, onFilter, onOpen }) {
  const ref = useReveal();
  const grid = useReveal([filter]);

  const visible = useMemo(() => projects.filter((p) => matchesFilter(p, filter)), [filter]);
  // Only offer filters that have work behind them.
  const available = filters.filter((f) => projects.some((p) => matchesFilter(p, f.key)));

  return (
    <section className="work section" id="work" aria-labelledby="work-title" ref={ref}>
      <div className="wrap">
        <div className="work__head">
          <Mark no="04">Selected work</Mark>
          <RevealLines
            id="work-title"
            className="work__title display"
            lines={['Drawn, rendered', <>and <em>built.</em></>]}
          />
        </div>

        <div className="work__filters" role="group" aria-label="Filter projects" data-reveal="fade" data-native-scroll>
          {available.map((f) => {
            const count = projects.filter((p) => matchesFilter(p, f.key)).length;
            return (
              <button
                key={f.key}
                type="button"
                className="work__filter"
                aria-pressed={filter === f.key}
                onClick={() => onFilter(f.key)}
              >
                <span>{f.label}</span>
                <sup>{String(count).padStart(2, '0')}</sup>
              </button>
            );
          })}
        </div>

        <p className="visually-hidden" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </p>

        <ul className="work__grid" ref={grid} key={filter}>
          {visible.map((p, i) => {
            const slot = SLOTS[i % SLOTS.length];
            return (
              <li key={p.id} className={`work__item ${slot.cls}`}>
                <button
                  type="button"
                  className="tile"
                  data-cursor="view"
                  onClick={() => onOpen(visible, i)}
                  aria-label={`${p.title}, ${p.category}, ${typeLabel(p.type)}. Open project`}
                >
                  <span className="tile__reveal" data-reveal="image" style={{ '--d': `${(i % 2) * 120}ms` }}>
                    <span className="tile__frame frame" style={{ aspectRatio: slot.ratio }}>
                      <Photo project={p} sizes={slot.sizes} />
                    </span>
                  </span>
                  <span className="tile__caption">
                    <span className="tile__no label">{String(i + 1).padStart(2, '0')}</span>
                    <span className="tile__title display">{p.title}</span>
                    <span className="tile__meta label muted">
                      {p.category}
                      <span className="tile__type">{typeLabel(p.type)}</span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
