import type { RadioTrack } from "../types/radio";

interface Props {
  tracks: RadioTrack[];
}

export const RadioPanel = ({ tracks }: Props) => {
  const currentTrack = tracks[0] ?? { id: "0", title: "Silence", artist: "Escobar" };
  const queue = tracks.slice(1);

  return (
    <div className="panel frame-panel radio-panel">
      <div className="panel-heading panel-heading--tight">
        <span className="panel-heading__line" />
        <h3>Radio Escobar</h3>
        <span className="radio-panel__live">Now Playing Live</span>
      </div>

      <div className="radio-panel__player frame-inset">
        <div className="radio-panel__album">
          <div className="radio-panel__skull">☠</div>
        </div>

        <div className="radio-panel__meta">
          <h4>Escobar Radio</h4>
          <p>
            {currentTrack.artist} - {currentTrack.title}
          </p>

          <div className="radio-panel__progress">
            <span className="radio-panel__progress-bar" />
          </div>

          <div className="radio-panel__time">
            <span>0:42</span>
            <span>4:32</span>
          </div>
        </div>
      </div>

      <div className="radio-panel__controls">
        <button type="button" aria-label="shuffle">⤬</button>
        <button type="button" aria-label="previous">◀◀</button>
        <button type="button" aria-label="play" className="radio-panel__play">▶</button>
        <button type="button" aria-label="next">▶▶</button>
        <button type="button" aria-label="repeat">↻</button>
      </div>

      <ul className="radio-panel__queue">
        {queue.map((track) => (
          <li key={track.id}>
            <span>{track.artist}</span>
            <strong>{track.title}</strong>
          </li>
        ))}
      </ul>

      <div className="radio-panel__footer">
        <a href="#events" className="ember-button">
          More Events
        </a>
      </div>
    </div>
  );
};