/**
 * Hero signature: a fine-line front elevation of a two-storey house with a
 * boundary wall and gate (after the studio's two-storey residence render).
 * Every stroke uses pathLength="1" so CSS can draw it in with stroke-dashoffset.
 * `--d` on each group staggers the drawing order: grid → ground → house → wall → notes.
 */

const gridX = [
  { x: 150, id: 'A' },
  { x: 300, id: 'B' },
  { x: 420, id: 'C' },
  { x: 540, id: 'D' },
];

// Vertical bars for the gate
const gateBars = Array.from({ length: 12 }, (_, i) => 160 + i * 10);

export default function ElevationDrawing() {
  return (
    <svg
      className="elevation"
      viewBox="0 0 600 450"
      role="img"
      aria-labelledby="elev-title"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id="elev-title">Line drawing: front elevation of a two-storey house with a boundary wall and gate</title>

      {/* Structural grid: bubbles + dashed lines */}
      <g className="elev-grid" style={{ '--d': 0 }}>
        {gridX.map((g) => (
          <g key={g.id}>
            <line className="draw dash" pathLength="1" x1={g.x} y1="42" x2={g.x} y2="392" />
            <circle className="draw" pathLength="1" cx={g.x} cy="26" r="12" />
            <text className="elev-bubble" x={g.x} y="30.5" textAnchor="middle">
              {g.id}
            </text>
          </g>
        ))}
      </g>

      {/* Ground line */}
      <g style={{ '--d': 1 }}>
        <line className="draw heavy" pathLength="1" x1="14" y1="380" x2="586" y2="380" />
        <line className="draw hatch" pathLength="1" x1="14" y1="386" x2="586" y2="386" />
      </g>

      {/* House: ground floor, first floor, parapet, canopy */}
      <g style={{ '--d': 2 }}>
        <rect className="draw" pathLength="1" x="150" y="250" width="390" height="130" />
        <rect className="draw" pathLength="1" x="210" y="146" width="300" height="104" />
        <rect className="draw" pathLength="1" x="198" y="132" width="324" height="14" />
        <rect className="draw" pathLength="1" x="120" y="240" width="160" height="10" />
        <line className="draw fine" pathLength="1" x1="150" y1="262" x2="540" y2="262" />
      </g>

      {/* Windows and door */}
      <g style={{ '--d': 3 }}>
        <rect className="draw" pathLength="1" x="318" y="282" width="40" height="72" />
        <rect className="draw fine" pathLength="1" x="324" y="288" width="28" height="60" />
        <rect className="draw" pathLength="1" x="384" y="282" width="40" height="72" />
        <rect className="draw fine" pathLength="1" x="390" y="288" width="28" height="60" />
        <rect className="draw" pathLength="1" x="300" y="168" width="44" height="58" />
        <rect className="draw fine" pathLength="1" x="306" y="174" width="32" height="46" />
        <rect className="draw" pathLength="1" x="376" y="168" width="44" height="58" />
        <rect className="draw fine" pathLength="1" x="382" y="174" width="32" height="46" />
        <rect className="draw" pathLength="1" x="466" y="294" width="44" height="86" />
        <line className="draw fine" pathLength="1" x1="488" y1="294" x2="488" y2="380" />
        {/* cladding panel beside the upper windows */}
        <rect className="draw fine" pathLength="1" x="440" y="160" width="52" height="76" />
        <line className="draw fine" pathLength="1" x1="440" y1="198" x2="492" y2="198" />
      </g>

      {/* Boundary wall and gate, drawn in front of the house (filled to mask lines behind) */}
      <g style={{ '--d': 4 }}>
        <rect className="draw wall" pathLength="1" x="14" y="318" width="290" height="62" />
        <rect className="draw" pathLength="1" x="10" y="312" width="298" height="6" />
        <rect className="draw fine" pathLength="1" x="26" y="330" width="40" height="38" />
        <rect className="draw fine" pathLength="1" x="76" y="330" width="40" height="38" />
        <rect className="draw" pathLength="1" x="150" y="324" width="130" height="56" />
        {gateBars.map((x) => (
          <line key={x} className="draw fine" pathLength="1" x1={x} y1="330" x2={x} y2="374" />
        ))}
        <circle className="draw" pathLength="1" cx="215" cy="352" r="6" />
      </g>

      {/* Level markers */}
      <g className="elev-notes" style={{ '--d': 5 }}>
        {[
          { y: 380, label: 'GF' },
          { y: 250, label: 'FF' },
          { y: 132, label: 'Roof' },
        ].map((lv) => (
          <g key={lv.label}>
            <line className="draw fine" pathLength="1" x1="546" y1={lv.y} x2="596" y2={lv.y} />
            <path className="draw" pathLength="1" d={`M556 ${lv.y} l-5 -8 h10 z`} />
            <text className="elev-label" x="566" y={lv.y - 4}>
              {lv.label}
            </text>
          </g>
        ))}

        {/* Dimension line with architectural ticks */}
        <line className="draw fine" pathLength="1" x1="150" y1="410" x2="540" y2="410" />
        {gridX.map((g) => (
          <line key={g.id} className="draw" pathLength="1" x1={g.x - 5} y1="415" x2={g.x + 5} y2="405" />
        ))}

        <text className="elev-label elev-title" x="586" y="436" textAnchor="end">
          Front elevation
        </text>
      </g>
    </svg>
  );
}
