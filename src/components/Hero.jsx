import { site } from '../data/site.js';
import { byId } from '../data/projects.js';
import Elevation from './Elevation.jsx';
import Magnetic from './Magnetic.jsx';
import NewTab from './NewTab.jsx';
import Photo from './Photo.jsx';
import RevealLines from './RevealLines.jsx';
import Roll from './Roll.jsx';
import '../styles/hero.css';

/*
  Headline options:
    Current: "Designed on paper. Built to the last detail."
    Alt 1:   "From the first line to the final finish."
    Alt 2:   "Every line we draw, we build."
*/

const HERO = byId('two-storey-residence');

/**
 * Hero. After the intro curtain lifts (html.is-ready), the elevation drawing
 * hangs for a moment, then the photograph opens out from behind it to full
 * bleed: drawing first, building second. Headline lines then slide up.
 */
export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__media">
        <div className="hero__img" data-parallax="0.07">
          <Photo project={HERO} sizes="100vw" priority />
        </div>
        <div className="hero__shade" aria-hidden="true" />
      </div>

      <div className="hero__drawing" aria-hidden="true">
        <Elevation title="" />
      </div>

      <div className="hero__content wrap">
        <p className="hero__eyebrow label">
          Architecture <span aria-hidden="true">/</span> Interiors <span aria-hidden="true">/</span> Construction
        </p>

        <RevealLines
          as="h1"
          id="hero-title"
          className="hero__title display"
          lines={['Designed on paper.', <>Built to the <em>last detail.</em></>]}
        />

        <div className="hero__aside">
          <p className="hero__sub">
            Architecture, interiors and construction from one studio in {site.locality}. We draw it, render it, and
            build it.
          </p>
          <div className="hero__ctas">
            <Magnetic>
              <a className="btn" href="#work">
                <Roll>View the work</Roll>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn--ghost" href={site.whatsappConsult} target="_blank" rel="noopener noreferrer">
                <Roll>Book a consultation</Roll>
                <NewTab />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="hero__foot wrap" aria-hidden="true">
        <span className="hero__scroll label">
          <span className="hero__scroll-line" />
          Scroll
        </span>
        <span className="hero__caption label">{HERO.title}, 3D visualisation</span>
      </div>
    </section>
  );
}
