/**
 * Headline whose lines slide up one after another when revealed.
 * `lines` is an array; each item is a string or JSX (e.g. with <em>).
 * The `is-in` class is added by useReveal (scroll) or by the hero on load.
 */
export default function RevealLines({ as: Tag = 'h2', lines, className = '', delay = 0, id }) {
  return (
    <Tag id={id} className={`lines ${className}`} style={{ '--d': `${delay}ms` }}>
      {lines.map((line, i) => (
        <span className="line" key={i} style={{ '--l': i }}>
          <span className="line__inner">{line}</span>
          {i < lines.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
}
