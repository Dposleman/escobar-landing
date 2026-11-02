import { useId } from "react";
import type { TrackMeta } from "../hooks/useSpotifyPlayer";

const EMBLEM = "/assets/branding/escobar-emblem.png";

type Props = {
  cover: string;
  title: string;
  /** Short status line shown above the title, e.g. NOW SPINNING. */
  kicker: string;
  isPlaying: boolean;
  recent: TrackMeta[];
};

function swapToEmblem(event: React.SyntheticEvent<HTMLImageElement>) {
  const target = event.currentTarget;
  if (!target.src.endsWith(EMBLEM)) target.src = EMBLEM;
}

export function TurntablePanel({ cover, title, kicker, isPlaying, recent }: Props) {
  const uid = useId().replace(/:/g, "");
  const ids = {
    rust: `${uid}-rust`,
    shade: `${uid}-shade`,
    steel: `${uid}-steel`,
    rivet: `${uid}-rivet`,
    label: `${uid}-label`,
    sheen: `${uid}-sheen`,
    glow: `${uid}-glow`,
  };

  return (
    <section
      className={`esc-panel esc-deck js-reveal${isPlaying ? " is-playing" : ""}`}
      id="deck"
      aria-label="Turntable showing the record currently playing on Radio Escobar"
    >
      <span className="esc-deck__chain esc-deck__chain--top" aria-hidden="true" />
      <span className="esc-deck__chain esc-deck__chain--bottom" aria-hidden="true" />
      <span className="esc-deck__chain esc-deck__chain--left" aria-hidden="true" />
      <span className="esc-deck__chain esc-deck__chain--right" aria-hidden="true" />

      <div className="esc-deck__stage">
        <svg className="esc-deck__svg" viewBox="0 0 640 420" role="img" aria-label={`${kicker}: ${title}`}>
          <defs>
            <pattern id={ids.rust} patternUnits="userSpaceOnUse" width="420" height="420">
              <image href="/textures/aaa/metal-base.jpg" width="420" height="420" preserveAspectRatio="xMidYMid slice" />
            </pattern>
            <linearGradient id={ids.shade} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#000" stopOpacity="0.42" />
              <stop offset="0.5" stopColor="#000" stopOpacity="0.62" />
              <stop offset="1" stopColor="#000" stopOpacity="0.82" />
            </linearGradient>
            <radialGradient id={ids.steel} cx="0.35" cy="0.3" r="0.9">
              <stop offset="0" stopColor="#d8cfc0" />
              <stop offset="0.55" stopColor="#7d7467" />
              <stop offset="1" stopColor="#2c2823" />
            </radialGradient>
            <radialGradient id={ids.rivet} cx="0.35" cy="0.3" r="0.8">
              <stop offset="0" stopColor="#e9dcc8" />
              <stop offset="0.6" stopColor="#7a6a58" />
              <stop offset="1" stopColor="#2a211a" />
            </radialGradient>
            <linearGradient id={ids.sheen} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
              <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.1" />
            </linearGradient>
            <clipPath id={ids.label}>
              <circle cx="250" cy="215" r="64" />
            </clipPath>
            <filter id={ids.glow} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* plinth */}
          <rect x="14" y="14" width="612" height="392" rx="12" fill={`url(#${ids.rust})`} />
          <rect x="14" y="14" width="612" height="392" rx="12" fill={`url(#${ids.shade})`} />
          <rect x="14" y="14" width="612" height="392" rx="12" fill="none" stroke="#4a3a2d" strokeWidth="2" />
          <rect x="26" y="26" width="588" height="368" rx="8" fill="none" stroke="#000" strokeOpacity="0.55" strokeWidth="1.5" />
          <rect x="29" y="29" width="582" height="362" rx="7" fill="none" stroke="#ffd9b0" strokeOpacity="0.09" />

          {[
            [34, 34],
            [606, 34],
            [34, 386],
            [606, 386],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill={`url(#${ids.rivet})`} stroke="#120d09" strokeWidth="1" />
          ))}

          {/* platter */}
          <circle cx="250" cy="215" r="176" fill="#000" opacity="0.55" />
          <circle cx="250" cy="215" r="172" fill="#10100e" stroke="#5a4a3b" strokeWidth="3" />
          <circle cx="250" cy="215" r="166" fill="none" stroke="#fff" strokeOpacity="0.08" />

          {/* record — spins while Spotify is playing */}
          <g className="esc-deck__record">
            <circle cx="250" cy="215" r="160" fill="#060606" />
            {[150, 138, 126, 114, 102, 90, 78].map((r) => (
              <circle key={r} cx="250" cy="215" r={r} fill="none" stroke="#fff" strokeOpacity={r % 24 === 0 ? 0.1 : 0.05} />
            ))}
            <path d="M250 215 L250 55 A160 160 0 0 1 388.6 135 Z" fill={`url(#${ids.sheen})`} />
            <path d="M250 215 L250 375 A160 160 0 0 1 111.4 295 Z" fill={`url(#${ids.sheen})`} />
            <circle cx="250" cy="215" r="70" fill="#14110e" />
            <image
              key={cover}
              href={cover}
              x="186"
              y="151"
              width="128"
              height="128"
              preserveAspectRatio="xMidYMid slice"
              clipPath={`url(#${ids.label})`}
            />
            <circle cx="250" cy="215" r="64" fill="none" stroke="#000" strokeOpacity="0.5" strokeWidth="2" />
            <circle cx="250" cy="215" r="5" fill="#0a0a09" stroke="#9c8c78" strokeWidth="1.5" />
          </g>

          {/* tonearm: parked outside the record, drops onto it while playing */}
          <g transform="translate(545 85)">
            <g className="esc-deck__arm">
              <rect x="-52" y="-9" width="36" height="18" rx="4" fill="#4b4136" stroke="#120d09" />
              <rect x="-16" y="-3.5" width="274" height="7" rx="3.5" fill="#b9ab94" stroke="#2c2620" strokeWidth="1" />
              <path d="M258 -5 L296 4 L292 14 L254 6 Z" fill="#8f8270" stroke="#1d1813" />
              <rect x="276" y="9" width="22" height="9" rx="2" fill="#2a251f" stroke="#0e0b08" />
              <circle cx="0" cy="0" r="22" fill={`url(#${ids.steel})`} stroke="#120d09" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="7" fill="#1b1611" stroke="#b6a893" />
            </g>
          </g>

          {/* knobs + lamp */}
          <circle cx="470" cy="330" r="17" fill={`url(#${ids.steel})`} stroke="#120d09" strokeWidth="1.5" />
          <path d="M470 316 L470 330" stroke="#1b1611" strokeWidth="3" strokeLinecap="round" />
          <circle cx="526" cy="344" r="12" fill={`url(#${ids.steel})`} stroke="#120d09" strokeWidth="1.5" />
          <path d="M526 334 L526 344" stroke="#1b1611" strokeWidth="2.5" strokeLinecap="round" />
          <text x="470" y="366" textAnchor="middle" className="esc-deck__etch">33 · 45</text>
          <text x="526" y="372" textAnchor="middle" className="esc-deck__etch">VOL</text>

          <g className="esc-deck__lamp">
            <circle cx="574" cy="330" r="14" fill="#ff9a3c" filter={`url(#${ids.glow})`} className="esc-deck__lamp-glow" />
            <circle cx="574" cy="330" r="7" fill="#2a1a10" stroke="#7d6a55" strokeWidth="1.5" className="esc-deck__lamp-core" />
          </g>
        </svg>
      </div>

      <div className="esc-deck__plate">
        <div className="esc-deck__sleeve">
          <img key={cover} src={cover} alt="" width={96} height={96} decoding="async" onError={swapToEmblem} />
        </div>

        <div className="esc-deck__info">
          <span className="esc-deck__kicker">
            <i aria-hidden="true" />
            {kicker}
          </span>
          <strong className="esc-deck__title" title={title}>
            {title}
          </strong>
          {recent.length > 0 ? (
            <ul className="esc-deck__recent" aria-label="Recently spun">
              {recent.map((item) => (
                <li key={item.uri} title={item.title}>
                  <img src={item.cover} alt={item.title} width={34} height={34} loading="lazy" decoding="async" />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
