# Aesthetic Design Consultants (ADC): website

A single-page studio site for Aesthetic Design Consultants, Wah Cantt.
It is built with Vite 5 and React 18 using plain CSS. There is no UI kit, no animation library and no backend.

## Run it

Requires Node.js 18 or newer.

```bash
cd adc-website
npm install
npm run dev        # local dev server (opens http://localhost:5173)
npm run build      # production build into /dist
npm run preview    # serve the production build locally
```

## Design: "Night Elevation"

- **Palette** (`src/styles/tokens.css`): charcoal `#141311`, warm ivory `#EEE8DD`, smoke `#9A9286`,
  and one muted bronze accent `#A6865A`. About and Services form a single ivory "daylight" chapter;
  everything else is dark.
- **Type**: Cormorant Garamond for display, Manrope for text (Google Fonts, `display=swap`).
- **Signature**: a line drawing of a house elevation draws itself in the intro. The hero photograph then
  opens out from behind it to full bleed: drawing first, building second.

## Motion (all of it is turned off for "reduce motion" visitors)

| Effect | Where |
| --- | --- |
| Intro: drawing, letter-by-letter name, 0–100 counter, curtain lift (about 2.5s, once per session) | `Preloader.jsx` |
| Inertial wheel scrolling and gliding anchor links (desktop only) | `lib/smoothScroll.js` |
| Headlines slide up line by line | `RevealLines.jsx` + `base.css` |
| Image wipe reveals, parallax, hover zoom | `base.css`, `lib/parallax.js`, `work.css` |
| Magnetic buttons, custom cursor ("View" / "Drag") | `Magnetic.jsx`, `Cursor.jsx` |
| Services hover image, process line that fills on scroll, drifting CTA type | `Services.jsx`, `Process.jsx`, `Cta.jsx` |

Every continuous effect runs on one shared `requestAnimationFrame` loop (`lib/ticker.js`) and never
touches React state.

## Where things live

```
public/images/        <slug>-lg.jpg (up to 1600px) and <slug>-sm.jpg (800px, wide images only)
src/data/site.js      business name, phone, WhatsApp, maps links, rating (single source of truth)
src/data/projects.js  every project: images, real pixel size, title, category, render/built, filters
src/data/services.js  the four services (with the filter "View the work" applies) and the process steps
src/data/reviews.js   the three Google reviews (verbatim)
src/components/       one component per section plus small building blocks
src/lib/              motion engine (ticker, smooth scroll, parallax) and modal helpers (inert, focus trap)
src/styles/           tokens.css, base.css and one file per section
```

## Adding projects and photos

1. Export the large image (1600px on the long edge, JPEG quality ~80). If it is wider than 800px,
   also export an 800px copy. Put both in `public/images/`.
2. Add an entry to `src/data/projects.js` with `src`, `srcSm` (if made), `width`/`height`
   (the large file's real pixel size), `title`, `category`, `type` (`'render'` or `'built'`),
   `categories` (`'residential'`, `'commercial'` and/or `'interiors'`) and `alt` text.

Filters only appear when they have projects, so **Commercial** shows up automatically once you add
a commercial project.

**Photos that would lift the site further:** a commercial project, a true before/after pair of one
space (for the comparison slider), and hero photographs at least 2400px wide. The current images top
out at 1280px, so the full-screen hero is slightly soft on large monitors.

## Changing contact details

Edit `src/data/site.js`. The phone number, WhatsApp links, maps links and rating shown everywhere
come from there. The SEO tags and the LocalBusiness structured data live in `index.html`, so update
those too. An email address and social links were left out on purpose; add them to `site.js` and the
Contact and Footer components when they're ready.

## Deploy

**Vercel:** import the folder or repo and pick the "Vite" preset. The build command is
`npm run build` and the output directory is `dist`.

**Netlify:** set the build command to `npm run build` and the publish directory to `dist`, or run the
build and drag `dist` onto app.netlify.com/drop.

## Notes

- The enquiry form checks the fields, then opens WhatsApp with the message filled in. There is no backend.
- The Google map loads lazily when it scrolls into view.
- The WhatsApp glyph is from Font Awesome Free (icons licensed CC BY 4.0).
