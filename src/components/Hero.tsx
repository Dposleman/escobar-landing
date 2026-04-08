export function Hero() {
  return (
    <section className="hero-panel metal-panel battered-panel js-reveal" id="home">
      <div className="hero-top-row">
        <div className="hero-emblem-wrap" aria-hidden="true">
          <div className="hero-emblem-outer">
            <div className="hero-emblem">
              <span className="emblem-finger emblem-finger-a" />
              <span className="emblem-finger emblem-finger-b" />
              <span className="emblem-finger emblem-finger-c" />
              <span className="emblem-finger emblem-finger-d" />
              <span className="emblem-thumb" />
              <span className="emblem-palm" />
              <span className="emblem-wrist" />
            </div>
          </div>
        </div>

        <div className="hero-logo-block">
          <div className="hero-logo-frame">
            <div className="hero-logo-inner">
              <div className="hero-logo-horns hero-logo-horns-left" aria-hidden="true" />
              <div className="hero-logo-horns hero-logo-horns-right" aria-hidden="true" />
              <h1 className="hero-logo-text">ESCOBAR</h1>
            </div>
          </div>

          <div className="hero-meta">
            <p className="hero-location">AARHUS · DENMARK</p>
            <p className="hero-tagline">ROCK · METAL · BEER · COMMUNITY</p>
          </div>
        </div>

        <div className="hero-counter metal-badge js-pulse">
          <div className="hero-counter-copy">
            <span>IS ESCOBAR BUILT ?</span>
            <span>IS ESCUE THIS RAW</span>
          </div>
          <strong>327</strong>
        </div>
      </div>

      <div className="hero-domain">666.rock</div>
    </section>
  );
}