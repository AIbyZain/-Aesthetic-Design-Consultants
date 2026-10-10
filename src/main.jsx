import React from 'react';
import { createRoot } from 'react-dom/client';

// Global styles are imported BEFORE App so they come first in the CSS bundle,
// letting component styles override them with normal specificity.
import './styles/tokens.css';
import './styles/base.css';

import App from './App.jsx';

// Enable reveal animations only when JS runs and the visitor allows motion.
// Without this class, all content is simply visible.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('motion');
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
