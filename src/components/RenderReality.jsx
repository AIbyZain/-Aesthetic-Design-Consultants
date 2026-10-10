import { useState } from 'react';
import { byId, renderRealityPairs } from '../data/projects.js';
import { useReveal } from '../hooks/useReveal.js';
import Photo from './Photo.jsx';
import '../styles/render-reality.css';

const PLATE_SIZES = '(min-width: 768px) 40vw, 92vw';

export default function RenderReality({ onOpen }) {
  const [pairKey, setPairKey] = useState(renderRealityPairs[0].key);
  const ref = useReveal();

  const pair = renderRealityPairs.find((p) => p.key === pairKey);
  const render = byId(pair.render);
  const built = byId(pair.built);
  const list = [render, built];

  return (
    <section className="rr section" aria-labelledby="rr-title" ref={ref}>
      <div className="wrap">
        <p className="sheet micro" data-reveal>
          <span className="sheet__no">03</span>
          <span>Render to reality</span>
        </p>

        <div className="rr__head">
          <h2 id="rr-title" className="section-title display" data-reveal style={{ '--d': 1 }}>
            What you approve in 3D is <em>what we hand over.</em>
          </h2>

          <div className="rr__switch" role="group" aria-label="Choose a space" data-reveal style={{ '--d': 2 }}>
            {renderRealityPairs.map((p) => (
              <button
                key={p.key}
                type="button"
                aria-pressed={p.key === pairKey}
                onClick={() => setPairKey(p.key)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rr__stage" data-reveal>
          <div className="rr__diptych" key={pair.key}>
            <figure className="rr__plate rr__plate--render">
              <button
                type="button"
                className="rr__frame frame"
                data-cursor="view"
                onClick={() => onOpen(list, 0)}
                aria-label={`${render.title}, 3D render. Open project`}
              >
                <Photo project={render} sizes={PLATE_SIZES} />
              </button>
              <figcaption>
                <span className="micro">3D Render</span>
                <span className="muted">{render.title}</span>
              </figcaption>
            </figure>

            {/* Dimension-line connector: drawing language, pointing render → built */}
            <div className="rr__link" aria-hidden="true">
              <span className="rr__tick" />
              <span className="rr__rule" />
              <span className="rr__arrow">→</span>
            </div>

            <figure className="rr__plate rr__plate--built">
              <button
                type="button"
                className="rr__frame frame"
                data-cursor="view"
                onClick={() => onOpen(list, 1)}
                aria-label={`${built.title}, built. Open project`}
              >
                <Photo project={built} sizes={PLATE_SIZES} />
              </button>
              <figcaption>
                <span className="micro tag--built">Built</span>
                <span className="muted">{built.title}</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <p className="rr__note muted">
          Render and site photo come from separate projects, shown together to compare design and finish.
        </p>
      </div>
    </section>
  );
}
