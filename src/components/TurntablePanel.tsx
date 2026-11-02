import { Suspense, lazy, useCallback, useRef, useState, type SyntheticEvent } from "react";
import type { TrackMeta } from "../hooks/useSpotifyPlayer";

const TurntableScene = lazy(() => import("./TurntableScene"));

const EMBLEM = "/assets/branding/escobar-emblem-rust.png";

type Props = {
  cover: string;
  title: string;
  /** Short status line shown under the title, e.g. NOW SPINNING. */
  kicker: string;
  isPlaying: boolean;
  recent: TrackMeta[];
};

function swapToEmblem(event: SyntheticEvent<HTMLImageElement>) {
  const target = event.currentTarget;
  if (!target.src.endsWith(EMBLEM)) target.src = EMBLEM;
}

/** "Black Sabbath - Paranoid" style titles split into artist + record. */
function splitTitle(title: string): [string, string] {
  const parts = title.split(/\s[-–—]\s/);
  if (parts.length >= 2) return [parts[0], parts.slice(1).join(" - ")];
  return [title, ""];
}

export function TurntablePanel({ cover, title, kicker, isPlaying, recent }: Props) {
  const labelRef = useRef<HTMLDivElement>(null);
  const [unsupported, setUnsupported] = useState(false);
  const onUnsupported = useCallback(() => setUnsupported(true), []);
  const [head, sub] = splitTitle(title);

  return (
    <section
      className={`esc-panel esc-deck js-reveal${isPlaying ? " is-playing" : ""}`}
      id="deck"
      aria-label="Turntable showing the record currently playing on Radio Escobar"
    >
      <h2 className="esc-deck__heading">
        <span>Vinyl of the Night</span>
      </h2>

      <div className="esc-deck__copy">
        <strong className="esc-deck__title" title={title}>
          {head}
        </strong>
        {sub ? <span className="esc-deck__record-name">{sub}</span> : null}
        <span className="esc-deck__kicker">
          <i aria-hidden="true" />
          {kicker}
        </span>
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

      <div className="esc-deck__stage" role="img" aria-label={`${kicker}: ${title}`}>
        {unsupported ? (
          <img className="esc-deck__still" src="/ui-kit/turntable.png" alt="" loading="lazy" decoding="async" />
        ) : (
          <Suspense fallback={<img className="esc-deck__still" src="/ui-kit/turntable.png" alt="" decoding="async" />}>
            <TurntableScene isPlaying={isPlaying} labelRef={labelRef} onUnsupported={onUnsupported} />
          </Suspense>
        )}

        {unsupported ? null : (
          <div ref={labelRef} className="esc-deck__label" aria-hidden="true">
            <img key={cover} src={cover} alt="" decoding="async" onError={swapToEmblem} />
          </div>
        )}
      </div>
    </section>
  );
}
