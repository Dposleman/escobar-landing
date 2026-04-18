import React from "react";
import EscobarEmblem from "./EscobarEmblem";

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-inner">

        {/* LEFT EMBLEM */}
        <div className="hero-emblem">
          <EscobarEmblem />
        </div>

        {/* CENTER LOGO */}
        <div className="hero-logo">
          <h1>ESCOBAR</h1>
          <p className="hero-meta">AARHUS · DANMARK</p>
          <p className="hero-tagline">ROCK · METAL · ØL · FÆLLESSKAB</p>
        </div>

        {/* RIGHT COUNTER */}
        <div className="hero-counter">
          <span className="counter-number">327</span>
          <span className="counter-domain">666.rock</span>
        </div>

      </div>
    </section>
  );
};

export default Hero;