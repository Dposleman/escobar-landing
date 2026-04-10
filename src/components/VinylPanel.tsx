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
    <section className="vinyl-panel metal-panel battered-panel js-reveal" id="vinyl">
      <header className="feature-panel-title">
        <span />
        <h2>VINYL OF THE NIGHT</h2>
        <span />
      </header>

      <div className="vinyl-panel__layout">
        <div className="vinyl-panel__copy">
          <h3>{vinyl.artist}</h3>
          <h4>{vinyl.title}</h4>
          <p>Released in heavy rotation</p>
          <p>Playing tonight at Escobar</p>
        </div>

        <div className="vinyl-stage">
          <div className="vinyl-cover-frame">
            <img src={vinyl.cover} alt={`${vinyl.artist} cover`} className="vinyl-cover-art" />
          </div>

          <div className="turntable-body">
            <div className="turntable-top-glow" />
            <div className="turntable-platter">
              <Vinyl bpm={vinyl.bpm} />
            </div>
            <div className="turntable-controls">
              <span className="turntable-light" />
              <span className="turntable-slider" />
            </div>
            <Needle isPlaying />
          </div>
        </div>
      </div>
    </section>
  );
}
