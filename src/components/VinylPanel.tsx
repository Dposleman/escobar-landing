import type { Vinyl } from "../types";

type VinylPanelProps = {
  vinyl: Vinyl;
};

export function VinylPanel({ vinyl }: VinylPanelProps) {
  return (
    <section className="feature-panel vinyl-panel metal-panel battered-panel js-reveal">
      <div className="panel-heading">
        <h3>VINYL OF THE NIGHT</h3>
      </div>

      <div className="vinyl-layout">
        <div className="vinyl-copy">
          <h4>{vinyl.artist}</h4>
          <p className="vinyl-album">{vinyl.album}</p>
          <p className="vinyl-year">Released {vinyl.year}</p>
          <p className="vinyl-tagline">{vinyl.tagline}</p>
        </div>

        <div className="vinyl-stage">
          <div className="turntable">
            <div className="turntable-plinth" />
            <div className="vinyl-disc">
              <div className="vinyl-grooves" />
              <div className="vinyl-center" />
            </div>
            <div className="tonearm">
              <span className="tonearm-joint" />
              <span className="tonearm-bar" />
              <span className="tonearm-needle" />
            </div>
          </div>

          <div className="album-card">
            <div className="album-cover">
              <span>{vinyl.artist}</span>
              <strong>{vinyl.album}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}