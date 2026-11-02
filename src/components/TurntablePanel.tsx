import type { CSSProperties, SyntheticEvent } from "react";
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

type Spark = { left: number; drift: number; duration: number; delay: number };

/** Fixed pseudo-random spread so the sparks look scattered but render the same every time. */
const SPARKS: Spark[] = Array.from({ length: 14 }, (_, index) => ({
  left: 6 + ((index * 37) % 84),
  drift: ((index * 53) % 29) - 14,
  duration: 3.4 + ((index * 29) % 26) / 10,
  delay: -(((index * 17) % 46) / 10),
}));

const RIVETS = ["a", "b", "c"] as const;
const LAMPS = ["tl", "bl", "br"] as const;
const KNOBS = ["a", "b", "c"] as const;

function swapToEmblem(event: SyntheticEvent<HTMLImageElement>) {
  const target = event.currentTarget;
  if (!target.src.endsWith(EMBLEM)) target.src = EMBLEM;
}

export function TurntablePanel({ cover, title, kicker, isPlaying, recent }: Props) {
  return (
    <section
      className={`esc-panel esc-deck js-reveal${isPlaying ? " is-playing" : ""}`}
      id="deck"
      aria-label="Turntable showing the record currently playing on Radio Escobar"
    >
      <span className="esc-deck__chain esc-deck__chain--top" aria-hidden="true" />
      <span className="esc-deck__chain esc-deck__chain--bottom" aria-hidden="true" />
      <span className="esc-deck__hang esc-deck__hang--left" aria-hidden="true" />
      <span className="esc-deck__hang esc-deck__hang--right" aria-hidden="true" />

      <h2 className="esc-title esc-deck__heading">
        <span>Vinyl of the Night</span>
      </h2>

      <div className="esc-deck__top">
        <div className="esc-deck__copy">
          <span className="esc-deck__kicker">
            <i aria-hidden="true" />
            {kicker}
          </span>
          <strong className="esc-deck__title" title={title}>
            {title}
          </strong>
          <span className="esc-deck__sub">Playing tonight at Escobar</span>

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

        <div className="esc-deck__sleeve">
          <img key={cover} src={cover} alt="" width={190} height={190} decoding="async" onError={swapToEmblem} />
        </div>
      </div>

      <div className="esc-deck__stage" role="img" aria-label={`${kicker}: ${title}`}>
        <div className="esc-deck__scene" aria-hidden="true">
          <div className="esc-deck__glow" />

          <div className="esc-deck__table">

            <div className="esc-deck__face">
              {RIVETS.map((id) => (
                <span key={id} className={`esc-deck__rivet esc-deck__rivet--${id}`} />
              ))}
              {LAMPS.map((id) => (
                <span key={id} className={`esc-deck__lamp esc-deck__lamp--${id}`} />
              ))}

              <div className="esc-deck__platter">
                <div className="esc-deck__strobe" />
                <div className="esc-deck__lift">
                  <div className="esc-deck__record">
                    <div className="esc-deck__label">
                      <img key={cover} src={cover} alt="" decoding="async" onError={swapToEmblem} />
                    </div>
                  </div>
                </div>
                <div className="esc-deck__sheen" />
                <span className="esc-deck__spindle" />
              </div>

              <div className="esc-deck__pivot">
                <span className="esc-deck__pivot-base" />
                <div className="esc-deck__arm">
                  <div className="esc-deck__wobble">
                    <span className="esc-deck__arm-weight" />
                    <span className="esc-deck__arm-tube" />
                    <span className="esc-deck__arm-head" />
                  </div>
                </div>
              </div>

              {KNOBS.map((id) => (
                <span key={id} className={`esc-deck__knob esc-deck__knob--${id}`} />
              ))}
              <span className="esc-deck__plaque">Escobar Radio · 33⅓</span>
            </div>
          </div>

          <div className="esc-deck__sparks">
            {SPARKS.map((spark, index) => (
              <span
                key={index}
                className="esc-deck__spark"
                style={
                  {
                    "--l": `${spark.left}%`,
                    "--dx": spark.drift,
                    "--t": `${spark.duration}s`,
                    "--d": `${spark.delay}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
