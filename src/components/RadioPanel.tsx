import type { RadioTrack } from "../types/radio";

interface Props {
  tracks: RadioTrack[];
}

export const RadioPanel = ({ tracks }: Props) => {
  return (
    <div className="panel radio">
      <div>
        <h3>Radio</h3>

        <ul>
          {tracks.map((track) => (
            <li key={track.id}>
              {track.title} — {track.artist}
            </li>
          ))}
        </ul>
      </div>

      <div className="equalizer">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};