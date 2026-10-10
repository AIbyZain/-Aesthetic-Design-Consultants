import { site } from '../data/site.js';
import { useReveal } from '../hooks/useReveal.js';
import '../styles/intro.css';

// Only facts supplied by the client. Do not add numbers here that aren't real.
const facts = [
  { value: `${site.rating} ★`, label: 'Google rating' },
  { value: String(site.reviewCount), label: 'Google reviews' },
  { value: site.locality, label: 'Punjab, Pakistan', wide: true },
  { value: 'Design + 3D + Construction', label: 'Under one roof', wide: true },
];

export default function Intro() {
  const ref = useReveal();

  return (
    <section className="intro section" aria-labelledby="intro-title" ref={ref}>
      <div className="wrap">
        <p className="sheet micro" data-reveal>
          <span className="sheet__no">01</span>
          <span>Studio</span>
        </p>

        <div className="intro__body grid-12">
          <div className="intro__statement">
            <h2 id="intro-title" className="visually-hidden">
              About the studio
            </h2>
            <p className="intro__text display" data-reveal style={{ '--d': 1 }}>
              We are an architecture and interiors studio in Wah Cantt. We draw the plans, show you every room in 3D,
              then build it with our own team. The ideas you approve on screen are the ones that arrive on site.
            </p>
            <p className="intro__sign" data-reveal style={{ '--d': 2 }}>
              <span className="intro__rule" aria-hidden="true" />
              <span>
                <span className="intro__name display">{site.principal}</span>
                <span className="muted">{site.name}</span>
              </span>
            </p>
          </div>

          <dl className="intro__facts" data-reveal style={{ '--d': 2 }}>
            {facts.map((f) => (
              <div key={f.label} className={`fact${f.wide ? ' fact--wide' : ''}`}>
                <dt className="micro muted">{f.label}</dt>
                <dd className="display">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
