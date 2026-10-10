/**
 * PORTFOLIO DATA
 * --------------
 * Every image on the site is listed here; this file is the single source of truth.
 *
 * Image files live in /public/images/ as `<slug>-lg.jpg` (up to 1600px on the long edge)
 * and, when the original is wider than 800px, `<slug>-sm.jpg` (800px) for phones.
 * `width` / `height` are the real pixel size of the -lg file (used to prevent layout shift).
 *
 * To add or replace a project: export the images, drop them in /public/images/,
 * then add or edit an entry below. No layout code needs to change.
 *
 * type:        'render' (3D visualisation) or 'built' (photo of executed work)
 * categories:  filter keys this project appears under: 'residential', 'commercial', 'interiors'.
 *              The 'built' filter is matched from `type` automatically.
 * ratio:       crop used for the card in the grid (CSS aspect-ratio).
 * focus:       optional object-position for that crop (default 'center').
 */

export const projects = [
  {
    id: 'two-storey-residence',
    src: '/images/two-storey-residence-lg.jpg',
    srcSm: '/images/two-storey-residence-sm.jpg',
    width: 1254,
    height: 586,
    title: 'Two-Storey Residence',
    category: 'Residential',
    type: 'render',
    categories: ['residential'],
    ratio: '3 / 2',
    focus: '62% 50%',
    alt: '3D render of a cream two-storey house front elevation with patterned parapets, a matching boundary wall and a dark grey gate with a brass ring motif.',
    description:
      'Front elevation with a set-back upper floor, framed windows and patterned parapet panels. The boundary wall and gate are designed to match.',
  },
  {
    id: 'eight-seat-dining',
    src: '/images/eight-seat-dining-lg.jpg',
    srcSm: '/images/eight-seat-dining-sm.jpg',
    width: 1252,
    height: 576,
    title: 'Eight-Seat Dining Room',
    category: 'Dining room',
    type: 'render',
    categories: ['interiors'],
    ratio: '4 / 3',
    focus: '50% 50%',
    alt: '3D render of a formal dining room with eight white upholstered chairs, marble-effect panels, ring chandeliers and a circular-pattern screen.',
    description:
      'Formal dining for eight under two ring chandeliers. Marble-effect panels, slatted timber walls and a circular-pattern screen frame the room.',
  },
  {
    id: 'grey-kitchen',
    src: '/images/grey-kitchen-lg.jpg',
    width: 647,
    height: 655,
    title: 'The Grey Kitchen',
    category: 'Kitchen',
    type: 'built',
    categories: ['interiors'],
    ratio: '4 / 5',
    focus: '55% 50%',
    alt: 'Photo of a completed kitchen with grey marble-effect cabinets, a black counter, a fluted breakfast bar and cove lighting in the false ceiling.',
    description:
      'Marble-effect cabinetry and a black counter with a fluted breakfast bar, completed on site. Cove lighting runs through the false ceiling.',
  },
  {
    id: 'library-lounge',
    src: '/images/library-lounge-lg.jpg',
    srcSm: '/images/library-lounge-sm.jpg',
    width: 1108,
    height: 547,
    title: 'Library Lounge',
    category: 'Living room',
    type: 'render',
    categories: ['interiors'],
    ratio: '4 / 3',
    focus: '45% 50%',
    alt: '3D render of a library lounge with white built-in shelving, a black woven pendant, green chairs and a full-height window to the garden.',
    description:
      'Built-in shelving around a woven pendant light, with green lounge chairs. A full-height window opens the room to the garden.',
  },
  {
    id: 'dark-frame-villa',
    src: '/images/dark-frame-villa-lg.jpg',
    width: 746,
    height: 494,
    title: 'Dark-Frame Villa',
    category: 'Residential',
    type: 'render',
    categories: ['residential'],
    ratio: '4 / 5',
    focus: '48% 50%',
    alt: '3D render of a contemporary two-storey villa with an angled dark frame, a glass balcony, stone cladding and downlights in the soffits.',
    description:
      'A contemporary villa wrapped in an angled dark frame. The glass balcony and downlit soffits give it a strong evening presence.',
  },
  {
    id: 'slatted-media-wall',
    src: '/images/slatted-media-wall-lg.jpg',
    width: 647,
    height: 645,
    title: 'Slatted Media Wall',
    category: 'Media wall',
    type: 'built',
    categories: ['interiors'],
    ratio: '1 / 1',
    alt: 'Photo of a completed TV wall with black gloss vertical slats, a marble-effect centre panel, lights at the base of the slats and a cove-lit ceiling.',
    description:
      'Black gloss slats frame a marble-effect panel behind the TV, each lit at its base. A cove-lit ceiling sits above.',
  },
];

/**
 * Portfolio filters. A filter only appears when at least one project matches,
 * so "Commercial" shows up automatically once a commercial project is added.
 * 'built' matches the project type (photos of executed work).
 */
export const filters = [
  { key: 'all', label: 'All' },
  { key: 'residential', label: 'Residential' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'interiors', label: 'Interiors' },
  { key: 'built', label: 'Built' },
];

export const typeLabel = (type) => (type === 'built' ? 'Built' : '3D Render');

export const matchesFilter = (project, key) => {
  if (key === 'all') return true;
  if (key === 'built') return project.type === 'built';
  return project.categories.includes(key);
};

export const byId = (id) => projects.find((p) => p.id === id);

/** srcset string for a project (small file only exists for wide originals). */
export const srcSetFor = (p) => (p.srcSm ? `${p.srcSm} 800w, ${p.src} ${p.width}w` : undefined);

/**
 * Render → Reality slider pairs: a 3D render and a site photo of related spaces,
 * compared side by side for design and finish quality (they are not the same room).
 * Replace with a true before/after pair of one project when photos are available.
 */
export const renderRealityPairs = [
  { key: 'living', label: 'Living spaces', render: 'library-lounge', built: 'slatted-media-wall' },
  { key: 'kitchen-dining', label: 'Kitchen & dining', render: 'eight-seat-dining', built: 'grey-kitchen' },
];
