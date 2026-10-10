import { nav, site } from '../data/site.js';
import { useReveal } from '../hooks/useReveal.js';
import NewTab from './NewTab.jsx';
import '../styles/footer.css';

export default function Footer() {
  const ref = useReveal();
  return (
    <footer className="footer" data-inert-bg ref={ref}>
      <div className="wrap">
        <div className="footer__top">
          <p className="footer__tag display">
            Architecture, interiors and construction.
            <br />
            <em>One studio in {site.locality}.</em>
          </p>

          <nav className="footer__col" aria-label="Footer">
            <p className="label muted">Index</p>
            <ul>
              {nav.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <p className="label muted">Studio</p>
            <ul>
              <li>
                <a href={site.phoneHref}>{site.phoneDisplay}</a>
              </li>
              <li>
                <a href={site.whatsappConsult} target="_blank" rel="noopener noreferrer">
                  WhatsApp <span aria-hidden="true">↗</span>
                  <NewTab />
                </a>
              </li>
              <li>
                <a href={site.mapsLink} target="_blank" rel="noopener noreferrer">
                  Google Maps <span aria-hidden="true">↗</span>
                  <NewTab />
                </a>
              </li>
              <li className="footer__place muted">{site.locality}, Punjab, Pakistan</li>
            </ul>
          </div>
        </div>

        <p className="footer__mark display" data-reveal="wordmark" aria-label={site.name}>
          <span aria-hidden="true">ADC</span>
        </p>

        <div className="footer__base">
          <p className="label muted">
            © {site.year} {site.name}
          </p>
          <a className="link-line" href="#top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
