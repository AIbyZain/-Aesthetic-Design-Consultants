// Single source of truth for business facts.
// Change a phone number or link here and it updates everywhere on the site.

const phoneIntl = '923145504584';
const consultMessage = 'Hi, I saw your portfolio and would like a consultation.';

export const site = {
  name: 'Aesthetic Design Consultants',
  wordmark: 'ADC',
  descriptor: ['Architecture', 'Interiors', 'Construction'],
  principal: 'Ar. Mudassir',
  location: 'Wah Cantt, Pakistan',
  locality: 'Wah Cantt',

  phoneDisplay: '0314 5504584',
  phoneIntlDisplay: '+92 314 5504584',
  phoneHref: 'tel:+923145504584',

  whatsappBase: `https://wa.me/${phoneIntl}`,
  whatsappConsult: `https://wa.me/${phoneIntl}?text=${encodeURIComponent(consultMessage)}`,

  mapsLink: 'https://share.google/kk9etq9XW6HztKA9G',
  mapsEmbed: 'https://www.google.com/maps?q=Aesthetic+Design+Consultants+Wah+Cantt&output=embed',

  rating: '5.0',
  reviewCount: 40,
  year: 2026,
};

/** Build a WhatsApp link with any pre-filled message. */
export const whatsappWith = (text) => `${site.whatsappBase}?text=${encodeURIComponent(text)}`;

/** WhatsApp link asking about a space like a given portfolio project. */
export const whatsappAbout = (title) =>
  whatsappWith(`Hi, I saw "${title}" in your portfolio and would like to discuss a space like this.`);

/** Primary navigation (anchor ids match the section ids). */
export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
];
