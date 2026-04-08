export function Hero() {
  return (
    <section className="hero js-reveal">
      <div className="chain chain-left" aria-hidden="true" />
      <div className="chain chain-right" aria-hidden="true" />

      <div className="hero-shell metal-surface">
        <div className="hero-burn hero-burn-left" aria-hidden="true" />
        <div className="hero-burn hero-burn-right" aria-hidden="true" />

        <div className="hero-grid">
          <div className="hero-copy metal-panel battered-panel">
            <p className="eyebrow">ROCK · METAL · VINYL · UNDERGROUND</p>
            <h2 className="hero-title">THE HEAVIEST DEN IN AARHUS</h2>
            <p className="hero-description">
              Grimy speakers. Hot tubes. Cold beer. Orange sparks over steel. A landing forged to feel like
              rust, smoke, vinyl dust and basement volume.
            </p>

            <div className="hero-stats">
              <div className="hero-stat">
                <strong>LIVE RADIO</strong>
                <span>24/7 riffs</span>
              </div>
              <div className="hero-stat">
                <strong>VINYL NIGHTS</strong>
                <span>cult classics</span>
              </div>
              <div className="hero-stat">
                <strong>UNDERGROUND</strong>
                <span>community first</span>
              </div>
            </div>
          </div>

          <div className="hero-ornament metal-panel battered-panel">
            <div className="hero-plate">
              <span className="screw screw-top-left" />
              <span className="screw screw-top-right" />
              <span className="screw screw-bottom-left" />
              <span className="screw screw-bottom-right" />
              <div className="hero-crest">ESCOBAR</div>
              <div className="hero-plate-lines" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}