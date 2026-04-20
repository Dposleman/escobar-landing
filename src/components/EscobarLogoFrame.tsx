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
            <stop offset="0%" stopColor="#4b2d20" />
            <stop offset="18%" stopColor="#efc7a4" />
            <stop offset="52%" stopColor="#8d5d3d" />
            <stop offset="82%" stopColor="#f8dcc0" />
            <stop offset="100%" stopColor="#362017" />
          </linearGradient>

          <linearGradient id="logoInnerStroke" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f7d6b7" />
            <stop offset="55%" stopColor="#9e6846" />
            <stop offset="100%" stopColor="#342018" />
          </linearGradient>

          <linearGradient id="logoPlateFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#120908" />
            <stop offset="14%" stopColor="#432317" />
            <stop offset="48%" stopColor="#1b0d0a" />
            <stop offset="78%" stopColor="#542b1a" />
            <stop offset="100%" stopColor="#110807" />
          </linearGradient>

          <linearGradient id="logoRail" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2b1711" />
            <stop offset="12%" stopColor="#b6815d" />
            <stop offset="50%" stopColor="#f3d4b7" />
            <stop offset="88%" stopColor="#b6815d" />
            <stop offset="100%" stopColor="#2b1711" />
          </linearGradient>

          <radialGradient id="logoInnerGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#ffba7e" stopOpacity="0.26" />
            <stop offset="38%" stopColor="#ff7f2a" stopOpacity="0.11" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <filter id="logoShadow" x="-30%" y="-50%" width="160%" height="200%">
            <feDropShadow dx="0" dy="12" stdDeviation="11" floodColor="#000000" floodOpacity="0.48" />
          </filter>

          <filter id="logoGlow" x="-30%" y="-50%" width="160%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0.94  0 1 0 0 0.46  0 0 1 0 0.14  0 0 0 0.48 0"
            />
          </filter>
        </defs>

        <g filter="url(#logoShadow)">
          <path
            d="M58 40h148l34-24h500l34 24h148v180H774l-34 24H240l-34-24H58z"
            fill="url(#logoPlateFill)"
            stroke="url(#logoOuterStroke)"
            strokeWidth="9"
          />

          <path
            d="M94 70h126l24-16h492l24 16h126v120H760l-24 16H244l-24-16H94z"
            fill="none"
            stroke="url(#logoInnerStroke)"
            strokeWidth="2.6"
            opacity="0.94"
          />

          <path d="M130 96h720" stroke="url(#logoRail)" strokeWidth="2.4" opacity="0.34" />
          <path d="M130 164h720" stroke="url(#logoRail)" strokeWidth="2.4" opacity="0.28" />

          <path d="M224 54 192 34" stroke="#c99369" strokeWidth="3" opacity="0.72" />
          <path d="M756 54 788 34" stroke="#c99369" strokeWidth="3" opacity="0.72" />

          <path d="M458 18c10 24 10 24 22 0" stroke="#d6a882" strokeWidth="2.6" fill="none" opacity="0.84" />
          <path d="M500 18c10 24 10 24 22 0" stroke="#d6a882" strokeWidth="2.6" fill="none" opacity="0.84" />

          <path d="M114 74h32" stroke="#f6d7bc" strokeWidth="1.3" opacity="0.46" />
          <path d="M834 74h32" stroke="#f6d7bc" strokeWidth="1.3" opacity="0.46" />
          <path d="M114 186h32" stroke="#f6d7bc" strokeWidth="1.3" opacity="0.32" />
          <path d="M834 186h32" stroke="#f6d7bc" strokeWidth="1.3" opacity="0.32" />
        </g>

        <rect x="144" y="98" width="692" height="64" fill="url(#logoInnerGlow)" opacity="0.9" />
        <rect x="144" y="98" width="692" height="64" fill="url(#logoInnerGlow)" filter="url(#logoGlow)" opacity="0.55" />
      </svg>

      <div className="escobar-logo-frame-title-wrap">
        <span className="escobar-logo-frame-title">{title}</span>
      </div>

      <span className="escobar-logo-frame-subline">Rock · Metal · Beer · Community</span>
    </div>
  );
}
