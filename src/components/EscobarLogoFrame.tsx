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
            <stop offset="0%" stopColor="#5a3725" />
            <stop offset="22%" stopColor="#d9b08a" />
            <stop offset="52%" stopColor="#8f5f3d" />
            <stop offset="78%" stopColor="#f6d6b4" />
            <stop offset="100%" stopColor="#4f2f21" />
          </linearGradient>

          <linearGradient id="logoInnerStroke" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f6d0ab" />
            <stop offset="45%" stopColor="#9f6741" />
            <stop offset="100%" stopColor="#3b2318" />
          </linearGradient>

          <linearGradient id="logoPlateFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#160c0a" />
            <stop offset="12%" stopColor="#412116" />
            <stop offset="50%" stopColor="#22100c" />
            <stop offset="84%" stopColor="#4e2a1a" />
            <stop offset="100%" stopColor="#100706" />
          </linearGradient>

          <radialGradient id="logoInnerGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#ffb36f" stopOpacity="0.22" />
            <stop offset="35%" stopColor="#ff7e26" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <filter id="logoShadow" x="-20%" y="-40%" width="140%" height="180%">
            <feDropShadow
              dx="0"
              dy="10"
              stdDeviation="10"
              floodColor="#000000"
              floodOpacity="0.45"
            />
          </filter>

          <filter id="logoGlow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.95  0 1 0 0 0.45  0 0 1 0 0.12  0 0 0 0.55 0"
            />
          </filter>
        </defs>

        <g filter="url(#logoShadow)">
          <path
            d="M54 42h165l28-22h486l28 22h165v176H761l-28 22H247l-28-22H54z"
            fill="url(#logoPlateFill)"
            stroke="url(#logoOuterStroke)"
            strokeWidth="8"
          />

          <path
            d="M90 70h147l20-16h466l20 16h147v120H743l-20 16H257l-20-16H90z"
            fill="none"
            stroke="url(#logoInnerStroke)"
            strokeWidth="2.75"
            opacity="0.92"
          />

          <rect
            x="120"
            y="90"
            width="740"
            height="80"
            fill="url(#logoInnerGlow)"
            opacity="0.92"
          />

          <path d="M248 54 216 38" stroke="#c98b62" strokeWidth="3" opacity="0.7" />
          <path d="M732 54 764 38" stroke="#c98b62" strokeWidth="3" opacity="0.7" />

          <path
            d="M472 20c7 22 7 22 18 0"
            stroke="#d1a27a"
            strokeWidth="2.5"
            fill="none"
            opacity="0.78"
          />
          <path
            d="M490 20c7 22 7 22 18 0"
            stroke="#d1a27a"
            strokeWidth="2.5"
            fill="none"
            opacity="0.78"
          />
        </g>

        <rect
          x="136"
          y="96"
          width="708"
          height="68"
          fill="url(#logoInnerGlow)"
          filter="url(#logoGlow)"
          opacity="0.65"
        />
      </svg>

      <div className="escobar-logo-frame-title-wrap">
        <span className="escobar-logo-frame-title">{title}</span>
      </div>
    </div>
  );
}