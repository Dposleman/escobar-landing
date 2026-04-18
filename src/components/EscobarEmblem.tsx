import React from "react";

const EscobarEmblem: React.FC = () => {
  return (
    <div className="escobar-emblem">
      <svg
        viewBox="0 0 120 120"
        className="escobar-emblem-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="emblemGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb36b" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#ff7a00" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="emblemMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eee2d0" />
            <stop offset="50%" stopColor="#c9b8a2" />
            <stop offset="100%" stopColor="#8a7a66" />
          </linearGradient>
        </defs>

        {/* glow */}
        <circle cx="60" cy="60" r="55" fill="url(#emblemGlow)" />

        {/* outer ring */}
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="url(#emblemMetal)"
          strokeWidth="4"
          opacity="0.9"
        />

        {/* inner plate */}
        <circle
          cx="60"
          cy="60"
          r="36"
          fill="#1a120d"
          stroke="#5c4636"
          strokeWidth="2"
        />

        {/* stylized hand */}
        <g fill="url(#emblemMetal)">
          <rect x="54" y="35" width="12" height="30" rx="3" />
          <rect x="40" y="50" width="40" height="10" rx="5" />
          <rect x="46" y="60" width="28" height="18" rx="6" />
        </g>
      </svg>
    </div>
  );
};

export default EscobarEmblem;