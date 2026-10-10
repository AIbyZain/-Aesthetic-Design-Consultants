import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site.js';

/**
 * Click-to-load map. Until asked, a drawn site-plan placeholder is shown and
 * no request is made to Google. On click the iframe is inserted and focused.
 */
export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef(null);

  useEffect(() => {
    if (loaded) frameRef.current?.focus({ preventScroll: true });
  }, [loaded]);

  return (
    <div className="contact__map">
      {loaded ? (
        <iframe
          ref={frameRef}
          title={`Google map showing ${site.name}, ${site.locality}`}
          src={site.mapsEmbed}
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={0}
        />
      ) : (
        <div className="map-plan">
          <div className="map-plan__card">
            <span className="map-plan__marker" aria-hidden="true" />
            <p className="map-plan__name">{site.name}</p>
            <p className="map-plan__place">{site.location}</p>
            <button type="button" className="btn btn--sm map-plan__btn" onClick={() => setLoaded(true)}>
              Show map here
            </button>
            <p className="map-plan__note">Loads Google Maps</p>
          </div>
        </div>
      )}
    </div>
  );
}
