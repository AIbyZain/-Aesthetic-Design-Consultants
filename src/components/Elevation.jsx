/**
 * Fine-line front elevation of a two-storey house with boundary wall and gate,
 * after the studio's own residence render. Used by the preloader (it draws itself)
 * and as the hero's frame. Every stroke has pathLength="1" so CSS can animate
 * stroke-dashoffset from 1 to 0. Groups carry --g to stagger the drawing order.
 */
const grid = [150, 300, 420, 540];
const bars = Array.from({ length: 12 }, (_, i) => 160 + i * 10);

export default function Elevation({ className = '', title = 'Line drawing of a two-storey house elevation' }) {
  return (
    <svg className={`elev ${className}`} viewBox="0 0 600 450" role="img" aria-label={title}>
      <g style={{ '--g': 0 }}>
        {grid.map((x) => (
          <line key={x} className="e-s e-dash" pathLength="1" x1={x} y1="30" x2={x} y2="392" />
        ))}
      </g>
      <g style={{ '--g': 1 }}>
        <line className="e-s e-heavy" pathLength="1" x1="14" y1="380" x2="586" y2="380" />
      </g>
      <g style={{ '--g': 2 }}>
        <rect className="e-s" pathLength="1" x="150" y="250" width="390" height="130" />
        <rect className="e-s" pathLength="1" x="210" y="146" width="300" height="104" />
        <rect className="e-s" pathLength="1" x="198" y="132" width="324" height="14" />
        <rect className="e-s" pathLength="1" x="120" y="240" width="160" height="10" />
      </g>
      <g style={{ '--g': 3 }}>
        <rect className="e-s e-fine" pathLength="1" x="318" y="282" width="40" height="72" />
        <rect className="e-s e-fine" pathLength="1" x="384" y="282" width="40" height="72" />
        <rect className="e-s e-fine" pathLength="1" x="300" y="168" width="44" height="58" />
        <rect className="e-s e-fine" pathLength="1" x="376" y="168" width="44" height="58" />
        <rect className="e-s e-fine" pathLength="1" x="466" y="294" width="44" height="86" />
        <rect className="e-s e-fine" pathLength="1" x="440" y="160" width="52" height="76" />
      </g>
      <g style={{ '--g': 4 }}>
        <rect className="e-s e-wall" pathLength="1" x="14" y="318" width="290" height="62" />
        <rect className="e-s" pathLength="1" x="150" y="324" width="130" height="56" />
        {bars.map((x) => (
          <line key={x} className="e-s e-fine" pathLength="1" x1={x} y1="330" x2={x} y2="374" />
        ))}
        <circle className="e-s e-accent" pathLength="1" cx="215" cy="352" r="6" />
      </g>
      <g style={{ '--g': 5 }}>
        <line className="e-s e-fine" pathLength="1" x1="150" y1="410" x2="540" y2="410" />
        {grid.map((x) => (
          <line key={x} className="e-s e-accent" pathLength="1" x1={x - 5} y1="415" x2={x + 5} y2="405" />
        ))}
      </g>
    </svg>
  );
}
