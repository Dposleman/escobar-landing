import type { RadioTrack } from "../types";

type RadioPanelProps = {
  tracks: RadioTrack[];
};

export function RadioPanel({ tracks }: RadioPanelProps) {
  const currentTrack = tracks[0];

  return (
    <section className="feature-panel radio-panel metal-panel battered-panel js-reveal" id="radio">
      <div className="panel-heading panel-heading-inline">
        <h3>RADIO ESCOBAR</h3>
        <span className="live-pill">NOW PLAYING LIVE</span>
      </div>

      <div className="radio-card">
        <div className="radio-card-top">
          <div className="radio-avatar">☠</div>
          <div className="radio-now">
            <strong>Escobar Radio</strong>
            <span>
              {currentTrack.artist} - {currentTrack.title}
            </span>
          </div>
          <button className="radio-fav" type="button" aria-label="Favorite current track">
            ♥
          </button>
        </div>

        <div className="radio-progress">
          <span className="radio-progress-bar" />
          <span className="radio-duration">{currentTrack.duration}</span>
        </div>

        <div className="radio-controls" aria-hidden="true">
          <button type="button">✕</button>
          <button type="button">⏮</button>
          <button type="button" className="radio-play">
            ▶
          </button>
          <button type="button">⏭</button>
          <button type="button">↻</button>
        </div>

        <div className="radio-eq" aria-hidden="true">
          <span className="radio-eq-bar" />
          <span className="radio-eq-bar" />
          <span className="radio-eq-bar" />
          <span className="radio-eq-bar" />
          <span className="radio-eq-bar" />
        </div>
      </div>

      <div className="radio-list">
        {tracks.map((track) => (
          <div key={track.id} className="radio-track">
            <span className="radio-track-artist">{track.artist}</span>
            <span className="radio-track-title">{track.title}</span>
            <span className="radio-track-duration">{track.duration}</span>
          </div>
        ))}
      </div>

      <a href="#events" className="panel-button">
        MORE EVENTS
      </a>
    </section>
  );
}