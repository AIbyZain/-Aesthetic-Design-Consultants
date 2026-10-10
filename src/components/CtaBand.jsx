import { site } from '../data/site.js';
import { useReveal } from '../hooks/useReveal.js';
import { WhatsAppIcon } from './Icons.jsx';
import NewTab from './NewTab.jsx';
import '../styles/cta-band.css';

/** Conversion block after the process timeline: step one, made literal. */
export default function CtaBand() {
  const ref = useReveal();

  return (
    <section className="cta-band" aria-labelledby="cta-title" ref={ref}>
      <div className="wrap">
        <div className="cta-band__inner" data-reveal>
          <h2 id="cta-title" className="cta-band__title display">
            Step one is <em>a conversation.</em>
          </h2>
          <div className="cta-band__actions">
            <a className="btn" href={site.whatsappConsult} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Book a consultation
              <NewTab />
            </a>
            <a className="btn btn--line" href={site.phoneHref}>
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
