import { version as reactVersion } from 'react';
import { srcSetFor } from '../data/projects.js';

// React 18 passes unknown lowercase attributes through; React 19 expects camelCase.
const highPriority = reactVersion.startsWith('18') ? { fetchpriority: 'high' } : { fetchPriority: 'high' };

/**
 * Every project image goes through here: srcset/sizes, real intrinsic size,
 * lazy loading (or eager + high priority for the hero), and crop focus.
 */
export default function Photo({ project, sizes, priority = false, alt, className, hidden }) {
  return (
    <img
      className={className}
      src={project.src}
      srcSet={srcSetFor(project)}
      sizes={project.srcSm ? sizes : undefined}
      width={project.width}
      height={project.height}
      alt={alt ?? project.alt}
      aria-hidden={hidden || undefined}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={project.focus ? { objectPosition: project.focus } : undefined}
      {...(priority ? highPriority : null)}
    />
  );
}
