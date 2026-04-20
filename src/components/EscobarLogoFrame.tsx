interface EscobarLogoFrameProps {
  title: string;
}

export default function EscobarLogoFrame({ title }: EscobarLogoFrameProps) {
  return (
    <div className="escobar-logo-frame" aria-label={title}>
      <svg
        className="escobar-logo-frame-svg"
        viewBox="0 0 980 260"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoOuterStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#523122" />
            <stop offset="18%" stopColor="#f0c79f" />
            <stop offset="46%" stopColor="#89573a" />
            <stop offset="72%" stopColor="#f6d9ba" />
            <stop offset="100%" stopColor="#4b2c20" />
          </linearGradient>

          <linearGradient id="logoInnerStroke" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f6d0ab" />
            <stop offset="45%" stopColor="#a96f48" />
            <stop offset="100%" stopColor="#3b2318" />
          </linearGradient>

          <linearGradient id="logoPlateFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#120907" />
            <stop offset="12%" stopColor="#402116" />
            <stop offset="50%" stopColor="#1e0d0a" />
            <stop offset="84%" stopColor="#4a2819" />
            <stop offset="100%" stopColor="#0f0605" />
          </linearGradient>

          <linearGradient id="logoTextFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff6eb" />
            <stop offset="26%" stopColor="#f0d3b4" />
            <stop offset="52%" stopColor="#cda179" />
            <stop offset="74%" stopColor="#fff7f0" />
            <stop offset="100%" stopColor="#9a6b4a" />
          </linearGradient>

          <radialGradient id="logoInnerGlow" cx="50%" cy="50%" r="62%">
            <stop offset="0%" stopColor="#ffb36f" stopOpacity="0.22" />
            <stop offset="40%" stopColor="#ff7e26" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <filter id="logoShadow" x="-20%" y="-40%" width="140%" height="180%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000000" floodOpacity="0.45" />
          </filter>

          <filter id="logoGlow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.95  0 1 0 0 0.45  0 0 1 0 0.12  0 0 0 0.5 0"
            />
          </filter>
        </defs>

        <g filter="url(#logoShadow)">
          <path
            d="M54 42h164l30-24h484l30 24h164v176H758l-30 24H252l-30-24H54z"
            fill="url(#logoPlateFill)"
            stroke="url(#logoOuterStroke)"
            strokeWidth="8"
          />

          <path
            d="M88 70h146l22-16h468l22 16h146v120H746l-22 16H256l-22-16H88z"
            fill="none"
            stroke="url(#logoInnerStroke)"
            strokeWidth="2.7"
            opacity="0.92"
          />

          <path d="M244 54 212 38" stroke="#c98b62" strokeWidth="3" opacity="0.68" />
          <path d="M736 54 768 38" stroke="#c98b62" strokeWidth="3" opacity="0.68" />

          <path d="M458 24c10 18 22 18 32 0" stroke="#d1a27a" strokeWidth="2.6" fill="none" opacity="0.72" />
          <path d="M490 24c10 18 22 18 32 0" stroke="#d1a27a" strokeWidth="2.6" fill="none" opacity="0.72" />

          <rect x="138" y="96" width="704" height="68" fill="url(#logoInnerGlow)" opacity="0.9" />

          <g opacity="0.82">
            <path d="M150 99h68v62h-68z" fill="none" stroke="#7a4b31" strokeWidth="1.6" />
            <path d="M762 99h68v62h-68z" fill="none" stroke="#7a4b31" strokeWidth="1.6" />
            <path d="M170 110h28" stroke="#e8c39f" strokeWidth="1.4" opacity="0.45" />
            <path d="M782 110h28" stroke="#e8c39f" strokeWidth="1.4" opacity="0.45" />
            <path d="M170 146h28" stroke="#e8c39f" strokeWidth="1.4" opacity="0.32" />
            <path d="M782 146h28" stroke="#e8c39f" strokeWidth="1.4" opacity="0.32" />
          </g>

          <g>
            <text
              x="490"
              y="154"
              textAnchor="middle"
              fill="url(#logoTextFill)"
              fontSize="118"
              fontWeight="900"
              letterSpacing="8"
              style={{ fontFamily: 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif' }}
            >
              ESCOBAR
            </text>
          </g>

          <path
            d="M154 86h670"
            stroke="#f4dfc9"
            strokeOpacity="0.08"
            strokeWidth="2"
          />
          <path
            d="M164 176h652"
            stroke="#f4dfc9"
            strokeOpacity="0.06"
            strokeWidth="2"
          />
        </g>

        <rect x="140" y="102" width="700" height="56" fill="url(#logoInnerGlow)" filter="url(#logoGlow)" opacity="0.6" />
      </svg>

      <div className="escobar-logo-frame-title-wrap">
        <span className="escobar-logo-frame-title">{title}</span>
      </div>
    </div>
  );
}
