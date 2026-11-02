import { useEffect, useRef, type SyntheticEvent } from "react";
import type { TrackMeta } from "../hooks/useSpotifyPlayer";

const EMBLEM = "/assets/branding/escobar-emblem-rust.png";
/** Size of the artwork the deck picture is laid out in (all overlay coordinates use it). */
const WORLD_W = 1500;
const WORLD_H = 990;

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
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const [head, sub] = splitTitle(title);

  // The deck artwork is laid out in a fixed 1500x990 space and scaled to the panel width.
  useEffect(() => {
    const stage = stageRef.current;
    const world = worldRef.current;
    if (!stage || !world) return;

    const fit = () => {
      world.style.transform = `scale(${stage.clientWidth / WORLD_W})`;
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

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

      <div ref={stageRef} className="esc-deck__stage" role="img" aria-label={`${kicker}: ${title}`}>
        <div ref={worldRef} className="esc-deck__world" aria-hidden="true">
          <div className="esc-deck__sleeve">
            <img key={cover} src={cover} alt="" decoding="async" onError={swapToEmblem} />
          </div>

          <img
            className="esc-deck__art"
            src="/assets/turntable-deck.webp"
            width={WORLD_W}
            height={WORLD_H}
            alt=""
            decoding="async"
          />

          <span className="esc-deck__lamp" style={{ left: 95, top: 500 }} />
          <span className="esc-deck__lamp esc-deck__lamp--b" style={{ left: 640, top: 620 }} />
          <span className="esc-deck__lamp" style={{ left: 820, top: 652 }} />
          <span className="esc-deck__lamp esc-deck__lamp--b" style={{ left: 195, top: 742 }} />

          <div className="esc-deck__label">
            <div className="esc-deck__label-disc">
              <img key={cover} src={cover} alt="" decoding="async" onError={swapToEmblem} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
