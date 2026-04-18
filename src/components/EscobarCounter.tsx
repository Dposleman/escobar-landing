interface EscobarCounterProps {
  value: string;
  line1: string;
  line2: string;
}

export default function EscobarCounter({
  value,
  line1,
  line2,
}: EscobarCounterProps) {
  return (
    <div className="escobar-counter">
      <svg
        className="escobar-counter-svg"
        viewBox="0 0 220 160"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="counterStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5a3725" />
            <stop offset="50%" stopColor="#d9b08a" />
            <stop offset="100%" stopColor="#4f2f21" />
          </linearGradient>

          <linearGradient id="counterFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#140b08" />
            <stop offset="50%" stopColor="#2b140d" />
            <stop offset="100%" stopColor="#0c0504" />
          </linearGradient>

          <radialGradient id="counterGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffb36f" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* base plate */}
        <rect
          x="10"
          y="10"
          width="200"
          height="140"
          rx="16"
          fill="url(#counterFill)"
          stroke="url(#counterStroke)"
          strokeWidth="4"
        />

        {/* inner glow */}
        <rect
          x="30"
          y="30"
          width="160"
          height="100"
          rx="10"
          fill="url(#counterGlow)"
          opacity="0.8"
        />
      </svg>

      <div className="escobar-counter-content">
        <div className="escobar-counter-copy">
          <span>{line1}</span>
          <span>{line2}</span>
        </div>
        <strong className="escobar-counter-value">{value}</strong>
      </div>
    </div>
  );
}