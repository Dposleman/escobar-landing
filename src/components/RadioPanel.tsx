import type { RadioState } from "../types";
import { resolveRadioLinkTarget } from "../utils/spotify";

type RadioPanelProps = {
  radio: RadioState;
};

export function RadioPanel({ radio }: RadioPanelProps) {
  const actionHref = resolveRadioLinkTarget(radio);
  const nowPlaying = radio.nowPlaying;

  return (
    <aside className="radio-panel metal-panel battered-panel js-reveal js-pulse" id="radio">
      <div className="radio-header">
        <h3>{radio.title}</h3>
        <span>{radio.subtitle}</span>
      </div>

      {radio.renderMode === "embed" && radio.embedUrl ? (
        <div className="radio-embed-wrap">
          <iframe
            className="radio-embed-frame"
            src={radio.embedUrl}
            title="Escobar radio player"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      ) : (
        <div className="radio-screen">
          <div className="radio-avatar" aria-hidden="true">
            <div className="radio-skull">
              <span className="skull-eye skull-eye-left" />
              <span className="skull-eye skull-eye-right" />
              <span className="skull-nose" />
              <span className="skull-jaw" />
            </div>
          </div>

          <div className="radio-track">
            <strong>{radio.title}</strong>
            <p>
              {nowPlaying ? `${nowPlaying.artist} - ${nowPlaying.track}` : "Live radio signal active"}
            </p>
          </div>

          <a
            className="radio-favorite radio-link-action"
            href={actionHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Open radio"
          >
            ↗
          </a>
        </div>
      )}

      <div className="radio-progress">
        <span
          className="radio-progress-fill"
          style={{ width: `${nowPlaying ? nowPlaying.progress : 0}%` }}
        />
      </div>

      <div className="radio-time">
        <span>{radio.isLive ? "LIVE" : "OFFLINE"}</span>
        <span>{nowPlaying ? nowPlaying.duration : "--:--"}</span>
      </div>

      <div className="radio-meta-stack">
        <div className="radio-meta-row">
          <span>PROVIDER</span>
          <strong>{radio.provider.toUpperCase()}</strong>
        </div>
        <div className="radio-meta-row">
          <span>STATUS</span>
          <strong>{radio.status.toUpperCase()}</strong>
        </div>
      </div>

      <div className="radio-controls">
        <a href={actionHref} target="_blank" rel="noreferrer" aria-label="Open radio">
          OPEN
        </a>
        <a href="#chat" aria-label="Join live chat">
          CHAT
        </a>
        <a href="#events" aria-label="View events">
          EVENTS
        </a>
      </div>

      <div className="radio-footer-strip" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <a className="radio-more" href={actionHref} target="_blank" rel="noreferrer">
        OPEN RADIO
      </a>
    </aside>
  );
}