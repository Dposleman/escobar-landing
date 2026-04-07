import { RadioTrack } from "../types/radio";

interface Props {
  tracks: RadioTrack[];
}

export const RadioPanel = ({ tracks }: Props) => {
  return (
    <div className="panel radio">
      <h3>Radio</h3>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            {track.title} — {track.artist}
          </li>
        ))}
      </ul>
      <div className="equalizer">
  <span />
  <span />
  <span />
  <span />
</div>
  );
};