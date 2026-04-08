import type { Vinyl } from "../types";

type VinylPanelProps = {
  vinyl: Vinyl;
};

export function VinylPanel({ vinyl }: VinylPanelProps) {
  return (
    <article className="panel metal-card chain-card vinyl-panel">
      <div className="panel__title-row">
        <div className="panel__title-line" />
        <h2 className="panel__title">VINYL OF THE NIGHT</h2>
        <div className="panel__title-line" />
      </div>

      <div className="vinyl-panel__content">
        <div className="vinyl-panel__copy">
          <h3 className="vinyl-panel__band">{vinyl.artist}</h3>
          <div className="vinyl-panel__album">{vinyl.album}</div>
          <p className="vinyl-panel__meta">Released {vinyl.year}</p>
          <p className="vinyl-panel__meta">{vinyl.tagline}</p>
        </div>

        <div className="vinyl-panel__cover-wrap">
          <div className="vinyl-panel__cover">
            <div className="vinyl-panel__cover-art" />
            <div className="vinyl-panel__cover-text">
              <span>{vinyl.artist}</span>
              <strong>{vinyl.album}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="vinyl-panel__turntable">
        <div className="vinyl-panel__disc">
          <div className="vinyl-panel__disc-center" />
        </div>
        <div className="vinyl-panel__arm" />
        <div className="vinyl-panel__switch" />
      </div>
    </article>
  );
}