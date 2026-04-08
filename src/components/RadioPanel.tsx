import type { RadioTrack } from "../types";

type RadioPanelProps = {
  tracks: RadioTrack[];
};

export function RadioPanel({ tracks }: RadioPanelProps) {
  const nowPlaying = tracks[0];

  return (
    <aside className="radio-panel metal-panel battered-panel js-reveal js-pulse">
      <div className="radio-header">
        <h3>RADIO ESCOBAR</h3>
        <span>NOW PLAYING LIVE</span>
      </div>

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
          <strong>{nowPlaying.station}</strong>
          <p>
            {nowPlaying.artist} - {nowPlaying.title}
          </p>
        </div>

        <button className="radio-favorite" type="button" aria-label="Favorite">
          ♥
        </button>
      </div>

      <div className="radio-progress">
        <span className="radio-progress-fill" style={{ width: `${nowPlaying.progress}%` }} />
      </div>

      <div className="radio-time">
        <span />
        <span>{nowPlaying.duration}</span>
      </div>

      <div className="radio-controls">
        <button type="button" aria-label="Shuffle">
          ✕
        </button>
        <button type="button" aria-label="Previous">
          ◀
        </button>
        <button type="button" className="radio-play" aria-label="Play">
          ▶
        </button>
        <button type="button" aria-label="Next">
          ▶
        </button>
        <button type="button" aria-label="Repeat">
          ↻
        </button>
      </div>

      <button className="radio-more" type="button">
        MORE EVENTS
      </button>
    </aside>
  );
}