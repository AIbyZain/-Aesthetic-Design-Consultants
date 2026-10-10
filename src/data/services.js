// Services list.
// `image`  is a project id from projects.js, revealed when the service is hovered.
// `filter` is the portfolio filter key that "View the work" applies.
export const services = [
  {
    id: 'drawings',
    title: 'Architectural Drawings & Planning',
    short: 'Architecture',
    text: 'Site plans, elevations and working drawings for homes and commercial buildings, resolved before a single brick is laid.',
    image: 'two-storey-residence',
    filter: 'residential',
  },
  {
    id: 'visualisation',
    title: '3D Visualisation',
    short: 'Visualisation',
    text: 'Photoreal interiors and exteriors, so every material, colour and light is agreed on screen before work begins.',
    image: 'eight-seat-dining',
    filter: 'all',
  },
  {
    id: 'interiors',
    title: 'Interior Design',
    short: 'Interiors',
    text: 'Drawing and dining rooms, lounges, media walls, kitchens and false ceilings with cove lighting.',
    image: 'library-lounge',
    filter: 'interiors',
  },
  {
    id: 'construction',
    title: 'Construction & Renovation',
    short: 'Construction',
    text: 'Full builds and renovations carried out by the same team, on time and within the agreed budget.',
    image: 'grey-kitchen',
    filter: 'built',
  },
];

// Process steps, in order.
export const process = [
  {
    title: 'Consultation',
    text: 'We listen first: your plot or space, how you live, and the budget it has to respect.',
  },
  {
    title: 'Concept & Drawings',
    text: 'Plans and elevations that settle the layout, the light and the flow of every room.',
  },
  {
    title: '3D Approval',
    text: 'You walk through realistic renders and sign off finishes, colours and lighting.',
  },
  {
    title: 'Execution',
    text: 'Our own team builds to the approved drawings and renders, detail by detail.',
  },
  {
    title: 'Handover',
    text: 'You receive the space you approved in 3D, finished and ready to live in.',
  },
];
