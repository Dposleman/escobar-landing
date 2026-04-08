import type { VinylRecord } from "../types";

type VinylPanelProps = {
  vinyl: VinylRecord;
};

export function VinylPanel({ vinyl }: VinylPanelProps) {
  return (
    <section className="vinyl-panel metal-panel battered-panel js-reveal js-pulse" aria-label="Vinyl of the night">
      <div className="panel-title panel-title-left">
        <span />
        <h2>{vinyl.kicker}</h2>
      </div>

      <div className="vinyl-copy">
        <h3>{vinyl.artist}</h3>
        <h4>{vinyl.album}</h4>
        <p>{vinyl.release}</p>
        <p>{vinyl.playing}</p>
      </div>

      <div className="turntable-scene" aria-hidden="true">
        <div className="album-card">
          <div className="album-cover">
            <span>{vinyl.artist}</span>
            <strong>{vinyl.album}</strong>
            <div className="album-figure" />
          </div>
        </div>

        <div className="turntable-body">
          <div className="turntable-lid" />
          <div className="turntable-plinth" />
          <div className="platter-shadow" />
          <div className="platter-ring" />
          <div className="vinyl-record">
            <div className="vinyl-grooves" />
            <div className="vinyl-label">
              <div className="vinyl-label-core" />
            </div>
          </div>

          <div className="deck-screw deck-screw-a" />
          <div className="deck-screw deck-screw-b" />
          <div className="deck-screw deck-screw-c" />
          <div className="deck-screw deck-screw-d" />

          <div className="tonearm-base" />
          <div className="tonearm-pivot" />
          <div className="tonearm-bar" />
          <div className="tonearm-head" />
          <div className="tonearm-needle" />
          <div className="tonearm-weight" />

          <div className="control control-a" />
          <div className="control control-b" />
          <div className="slider-track" />
          <div className="slider-knob" />
          <div className="power-light" />
        </div>
      </div>
    </section>
  );
}