import type { RefObject } from "react";
import type { RadioState } from "../types";
import { resolveRadioLinkTarget } from "../utils/spotify";
import { PHOTO_FALLBACKS } from "../data/landingFallbacks";

type Props = {
  radio: RadioState;
  /** Empty element the Spotify embed is mounted into (see useSpotifyPlayer). */
  mountRef: RefObject<HTMLDivElement | null>;
  isPlaying: boolean;
  hasPlayer: boolean;
  /** Plain iframe used only when Spotify's script is blocked (ad blockers, offline). */
  fallbackEmbedUrl: string;
  height: number;
};

function SpotifyMark() {
  return (
    <svg className="esc-radio__mark" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1ed760" />
      <path
        d="M5.6 9.1c4.1-1.2 8.6-.9 12.4 1.1M6.3 12.5c3.4-1 7.1-.7 10.3.9M7 15.7c2.7-.8 5.5-.5 8 .7"
        fill="none"
        stroke="#0b0b0a"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RadioPanel({ radio, mountRef, isPlaying, hasPlayer, fallbackEmbedUrl, height }: Props) {
  const openUrl = resolveRadioLinkTarget(radio);

  return (
    <section className="esc-panel esc-radio js-reveal" id="radio">
      <header className="esc-radio__head">
        <h2>{radio.title?.trim() || "RADIO ESCOBAR"}</h2>
        {isPlaying ? <span className="esc-radio__live">Now playing live</span> : null}
        <SpotifyMark />
      </header>

      <div className="esc-radio__embed">
        {hasPlayer ? (
          <>
            {fallbackEmbedUrl ? null : <div ref={mountRef} className="esc-radio__mount" />}
            {fallbackEmbedUrl ? (
              <iframe
                src={fallbackEmbedUrl}
                title="Escobar Spotify Radio"
                loading="lazy"
                height={height}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            ) : null}
          </>
        ) : (
          <div className="esc-radio__fallback">
            <strong>No Spotify source configured</strong>
            <span>Add a Spotify album, playlist or track URL from the admin panel.</span>
          </div>
        )}
      </div>

      <div className="esc-radio__foot">
        <ul className="esc-radio__thumbs" aria-hidden="true">
          {PHOTO_FALLBACKS.map((photo) => (
            <li key={photo.title}>
              <img src={photo.image} alt="" loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
        <a className="esc-btn esc-btn--small" href="#events">
          More events
        </a>
      </div>

      <a className="esc-btn esc-btn--small" href={openUrl} target="_blank" rel="noreferrer">
        Open in Spotify
        <span className="esc-btn__arrow" aria-hidden="true">▸</span>
      </a>
    </section>
  );
}
