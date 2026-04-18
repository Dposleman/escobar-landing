import type { CSSProperties } from "react";
import "../styles/RadioPanel.css";

type Props = {
  radio: {
    title: string;
    track: string;
    artist: string;
    embedUrl: string;
  };
};

const EQ_BARS = [0, 1, 2, 3, 4, 5, 6];
const PREVIEW_BARS = [0, 1, 2, 3];

export function RadioPanel({ radio }: Props) {
  return (
    <section className="radio-panel metal-panel battered-panel js-reveal" id="radio">
      <div className="radio-header">
        <span>RADIO ESCOBAR</span>
        <span className="live">NOW PLAYING LIVE</span>
      </div>

      <div className="radio-shell">
        <div className="radio-screen">
          <div className="radio-cover" aria-hidden="true">
            <div className="radio-cover-frame" />
            <div className="radio-cover-skull">
              <span className="skull-eye skull-eye-left" />
              <span className="skull-eye skull-eye-right" />
              <span className="skull-nose" />
              <span className="skull-jaw" />
            </div>
            <span className="radio-cover-badge">ON AIR</span>
          </div>

          <div className="radio-copy">
            <div className="radio-copy-topline">Escobar Radio</div>

            <div className="radio-title-block">
              <strong className="radio-station">{radio.title}</strong>
              <div className="radio-trackline">
                <span className="radio-track">
                  {radio.artist} — {radio.track}
                </span>
              </div>
            </div>

            <div className="radio-eq-wrap">
              <div className="radio-eq" aria-hidden="true">
                {EQ_BARS.map((bar) => (
                  <span
                    key={bar}
                    className="radio-eq-bar"
                    style={{ ["--bar-index" as string]: bar } as CSSProperties}
                  />
                ))}
              </div>
              <div className="radio-meter-label">SIGNAL 92.7</div>
            </div>

            <div className="radio-progress-wrap">
              <div className="radio-progress">
                <span className="radio-progress-fill" />
              </div>
              <div className="radio-progress-cap" aria-hidden="true" />
            </div>

            <div className="radio-time">
              <span>LIVE</span>
              <span>4:32</span>
            </div>
          </div>
        </div>

        <div className="radio-controls" aria-hidden="true">
          <button type="button">
            <span>✕</span>
          </button>
          <button type="button">
            <span>⏮</span>
          </button>
          <button type="button" className="is-primary">
            <span>▶</span>
          </button>
          <button type="button">
            <span>⏭</span>
          </button>
          <button type="button">
            <span>↻</span>
          </button>
        </div>

        <div className="radio-footer">
          <div className="radio-preview-strip" aria-hidden="true">
            {PREVIEW_BARS.map((item) => (
              <span key={item}>
                <i />
              </span>
            ))}
          </div>

          {radio.embedUrl ? (
            <a className="radio-listen-link" href={radio.embedUrl} target="_blank" rel="noreferrer">
              <span className="radio-listen-label">LISTEN ON</span>
              <strong>SPOTIFY</strong>
            </a>
          ) : (
            <div className="radio-fallback">NO SIGNAL</div>
          )}
        </div>
      </div>
    </section>
  );
}