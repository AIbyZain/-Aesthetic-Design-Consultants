import { useCallback, useEffect, useState } from 'react';

import Preloader from './components/Preloader.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Work from './components/Work.jsx';
import Lightbox from './components/Lightbox.jsx';
import Compare from './components/Compare.jsx';
import Process from './components/Process.jsx';
import Testimonials from './components/Testimonials.jsx';
import Cta from './components/Cta.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppFab from './components/WhatsAppFab.jsx';
import Cursor from './components/Cursor.jsx';

import { initSmoothScroll, scrollToElement } from './lib/smoothScroll.js';
import { initParallax } from './lib/parallax.js';
import { setBackgroundInert } from './lib/inert.js';

const INTRO_KEY = 'adc-intro-seen';

/** Show the intro once per browser session. Storage can throw (private mode). */
function shouldShowIntro() {
  try {
    return !sessionStorage.getItem(INTRO_KEY);
  } catch {
    return true;
  }
}

export default function App() {
  const [intro, setIntro] = useState(shouldShowIntro);
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null); // { list, index } | null

  // Global motion systems
  useEffect(() => initSmoothScroll(), []);
  useEffect(() => initParallax(), []);

  // While the intro plays, the page underneath is rendered but not reachable.
  useEffect(() => {
    if (!intro) {
      document.documentElement.classList.add('is-ready');
      return undefined;
    }
    setBackgroundInert(true);
    document.body.classList.add('is-locked');
    return () => {
      setBackgroundInert(false);
      document.body.classList.remove('is-locked');
    };
  }, [intro]);

  // The curtain has started to lift: start the hero choreography and free the page.
  const liftIntro = useCallback(() => {
    document.documentElement.classList.add('is-ready');
    setBackgroundInert(false);
    document.body.classList.remove('is-locked');
  }, []);

  const endIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* storage unavailable: the intro simply shows again next time */
    }
    setIntro(false);
  }, []);

  // Safety net: whatever happens, the intro never blocks the site.
  useEffect(() => {
    if (!intro) return undefined;
    const fallback = setTimeout(() => setIntro(false), 4000); // never block the site
    return () => clearTimeout(fallback);
  }, [intro]);

  const openProject = useCallback((list, index) => setLightbox({ list, index }), []);
  const closeProject = useCallback(() => setLightbox(null), []);
  const stepProject = useCallback((i) => setLightbox((s) => ({ ...s, index: i })), []);

  /** From a service row: apply its filter, then glide to the work section. */
  const showWork = useCallback((key) => {
    setFilter(key);
    requestAnimationFrame(() => scrollToElement(document.getElementById('work')));
  }, []);

  return (
    <>
      {intro && <Preloader onLift={liftIntro} onDone={endIntro} />}
      <a className="skip-link" href="#main" data-inert-bg>
        Skip to content
      </a>
      <Header />
      <main id="main" data-inert-bg>
        <Hero />
        {/* The daylight chapter: one deliberate switch to ivory */}
        <div className="theme-ivory">
          <About />
          <Services onShowWork={showWork} />
        </div>
        <Work filter={filter} onFilter={setFilter} onOpen={openProject} />
        <Compare />
        <Process />
        <Testimonials />
        <Cta />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
      <Cursor />
      {lightbox && (
        <Lightbox list={lightbox.list} index={lightbox.index} onIndex={stepProject} onClose={closeProject} />
      )}
    </>
  );
}
