import Vinyl from "./Vinyl";
import Needle from "./Needle";
import "../styles/VinylPanel.css";

type Props = {
  vinyl: {
    title: string;
    artist: string;
    cover: string;
    bpm?: number;
  };
};

export function VinylPanel({ vinyl }: Props) {
  return (
    <div className="vinyl-panel">
      <div className="vinyl-info">
        <h2>{vinyl.artist}</h2>
        <h3>{vinyl.title}</h3>
      </div>

      <div className="vinyl-visual">
        <img src={vinyl.cover} alt="cover" />
        <Vinyl bpm={vinyl.bpm} />
        <Needle isPlaying />
      </div>
    </div>
  );
}