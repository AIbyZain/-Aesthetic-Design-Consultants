import { typeLabel } from '../data/projects.js';
import Photo from './Photo.jsx';

/** A portfolio card: cropped image above, magazine-style caption below. */
export default function ProjectCard({ project, order, sizes, onOpen }) {
  const { title, category, type, ratio } = project;

  return (
    <button
      type="button"
      className="card"
      data-cursor="view"
      onClick={onOpen}
      style={{ '--i': order }}
      aria-label={`${title}, ${category}, ${typeLabel(type)}. Open project`}
    >
      <span className="card__frame frame" style={{ aspectRatio: ratio }}>
        <Photo project={project} sizes={sizes} />
      </span>
      <span className="card__caption">
        <span className="card__title display">{title}</span>
        <span className="card__meta">
          <span className="muted">{category}</span>
          <span className={`tag micro${type === 'built' ? ' tag--built' : ''}`}>{typeLabel(type)}</span>
        </span>
      </span>
    </button>
  );
}
