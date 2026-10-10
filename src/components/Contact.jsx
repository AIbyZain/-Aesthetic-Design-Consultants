import { useState } from 'react';
import { site, whatsappWith } from '../data/site.js';
import { useReveal } from '../hooks/useReveal.js';
import { WhatsAppIcon } from './Icons.jsx';
import Mark from './Mark.jsx';
import NewTab from './NewTab.jsx';
import RevealLines from './RevealLines.jsx';
import Roll from './Roll.jsx';
import '../styles/contact.css';

const PROJECT_TYPES = [
  'Architectural drawings & planning',
  '3D visualisation',
  'Interior design',
  'Construction & renovation',
  'Not sure yet',
];

const EMPTY = { name: '', phone: '', type: '', message: '' };

function validate(v) {
  const errors = {};
  if (v.name.trim().length < 2) errors.name = 'Enter your name.';
  const digits = v.phone.replace(/\D/g, '');
  if (!digits) errors.phone = 'Enter a phone number so we can reply.';
  else if (digits.length < 10 || digits.length > 13) errors.phone = 'Enter a valid number, for example 0300 1234567.';
  if (!v.type) errors.type = 'Choose a project type.';
  if (v.message.trim() && v.message.trim().length < 10) errors.message = 'Add a little more detail, or leave this blank.';
  return errors;
}

export default function Contact() {
  const ref = useReveal();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: validate(next)[field] }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = ['name', 'phone', 'type', 'message'].find((f) => found[f]);
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    const lines = [
      'Hi, I saw your portfolio and would like a consultation.',
      '',
      `Name: ${values.name.trim()}`,
      `Phone: ${values.phone.trim()}`,
      `Project: ${values.type}`,
    ];
    if (values.message.trim()) lines.push(`Details: ${values.message.trim()}`);
    window.open(whatsappWith(lines.join('\n')), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const field = (name) => ({
    id: `f-${name}`,
    name,
    value: values[name],
    onChange: update(name),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `e-${name}` : undefined,
  });

  const error = (name) =>
    errors[name] ? (
      <p id={`e-${name}`} className="field__error">
        {errors[name]}
      </p>
    ) : null;

  return (
    <section className="contact section" id="contact" aria-labelledby="contact-title" ref={ref}>
      <div className="wrap contact__grid">
        <div className="contact__info">
          <Mark no="09">Contact</Mark>
          <RevealLines
            id="contact-title"
            className="contact__title display"
            lines={['Visit, call', <>or <em>write.</em></>]}
          />

          <dl className="contact__list" data-reveal="fade">
            <div>
              <dt className="label muted">Phone</dt>
              <dd>
                <a className="contact__big display" href={site.phoneHref}>
                  {site.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label muted">WhatsApp</dt>
              <dd>
                <a className="link-line" href={site.whatsappConsult} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> Message the studio <span className="arrow" aria-hidden="true">↗</span>
                  <NewTab />
                </a>
              </dd>
            </div>
            <div>
              <dt className="label muted">Studio</dt>
              <dd className="contact__place">{site.locality}, Punjab, Pakistan</dd>
            </div>
          </dl>
        </div>

        <form className="form" noValidate onSubmit={onSubmit} data-reveal="fade" style={{ '--d': '150ms' }}>
          <p className="form__intro muted">
            Prefer to write? Fill this in and WhatsApp opens with your message ready to send.
          </p>

          <div className="form__row">
            <div className="field">
              <label htmlFor="f-name">Name</label>
              <input type="text" autoComplete="name" {...field('name')} />
              {error('name')}
            </div>
            <div className="field">
              <label htmlFor="f-phone">Phone</label>
              <input type="tel" inputMode="tel" autoComplete="tel" {...field('phone')} />
              {error('phone')}
            </div>
          </div>

          <div className="field">
            <label htmlFor="f-type">Project type</label>
            <div className="select">
              <select {...field('type')}>
                <option value="" disabled>
                  Choose one
                </option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            {error('type')}
          </div>

          <div className="field">
            <label htmlFor="f-message">
              Message <span className="muted">(optional)</span>
            </label>
            <textarea rows="3" {...field('message')} />
            {error('message')}
          </div>

          <div className="form__foot">
            <button type="submit" className="btn">
              <WhatsAppIcon />
              <Roll>Send on WhatsApp</Roll>
            </button>
            <p className={`form__status${sent ? ' is-success' : ''}`} role="status">
              {sent ? 'WhatsApp opened in a new tab. Press send there to reach the studio.' : ''}
            </p>
          </div>
        </form>
      </div>

      <div className="wrap">
        {/* The reveal is observed on this unclipped wrapper; its child does the wipe */}
        <div className="contact__map" data-reveal="image">
          <div className="contact__map-frame">
            <iframe
              title={`Google map showing ${site.name}, ${site.locality}`}
              src={site.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <a className="link-line contact__maplink" href={site.mapsLink} target="_blank" rel="noopener noreferrer">
          Open in Google Maps <span className="arrow" aria-hidden="true">↗</span>
          <NewTab />
        </a>
      </div>
    </section>
  );
}
