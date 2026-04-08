import type { RadioTrack } from "../types";

type RadioPanelProps = {
  tracks: RadioTrack[];
};

export function RadioPanel({ tracks }: RadioPanelProps) {
  const currentTrack = tracks[0];

  return (
    <article className="panel metal-card chain-card radio-panel">
      <div className="radio-panel__header">
        <h2 className="panel__title panel__title--tight">RADIO ESCOBAR</h2>
        <span className="radio-panel__live">NOW PLAYING LIVE</span>
      </div>

      <div className="radio-panel__player">
        <div className="radio-panel__cover" />
        <div className="radio-panel__info">
          <div className="radio-panel__station">Escobar Radio</div>
          <div className="radio-panel__track">
            {currentTrack.artist} - {currentTrack.title}
          </div>
        </div>
        <button className="radio-panel__heart" aria-label="Favorite">
          ♥
        </button>
      </div>

      <div className="radio-panel__meter">
        <div className="radio-panel__meter-fill" />
      </div>

      <div className="radio-panel__controls">
        <button aria-label="Shuffle">✕</button>
        <button aria-label="Previous">⏮</button>
        <button className="radio-panel__play" aria-label="Play">
          ▶
        </button>
        <button aria-label="Next">⏭</button>
        <button aria-label="Repeat">↻</button>
      </div>

      <div className="radio-panel__queue">
        {tracks.map((track) => (
          <div key={`${track.artist}-${track.title}`} className="radio-panel__queue-item">
            <span>{track.artist}</span>
            <strong>{track.title}</strong>
          </div>
        ))}
      </div>

      <a href="#events" className="radio-panel__button">
        MORE EVENTS
      </a>
    </article>
  );
}