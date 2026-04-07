import { useEffect } from "react";

import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { VinylPanel } from "./components/VinylPanel";
import { RadioPanel } from "./components/RadioPanel";
import { EventsPanel } from "./components/EventsPanel";
import { MerchPanel } from "./components/MerchPanel";

import { navItems } from "./data/nav";
import { events } from "./data/events";
import { merch } from "./data/merch";
import { radioTracks } from "./data/radio";
import { vinyl } from "./data/vinyl";

import { revealPanels } from "./animations/animations";
import { initMouseGlow } from "./utils/mouseGlow";
import { createEmbers } from "./utils/embers";

function App() {
  useEffect(() => {
    revealPanels();
    initMouseGlow();
    createEmbers();
  }, []);

  return (
    <div className="app">
      <div className="noise-layer" />
      <div className="scan-layer" />

      <Hero
        title="ESCOBAR"
        subtitle="AARHUS • DENMARK"
        tagline="ROCK • METAL • BEER • COMMUNITY"
      />

      <NavBar items={navItems} />

      <main className="shell">
        <section id="home" className="feature-grid">
          <div className="feature-main">
            <VinylPanel vinyl={vinyl} />
          </div>

          <div className="feature-side">
            <RadioPanel tracks={radioTracks} />
          </div>
        </section>

        <section id="events" className="stack-section">
          <EventsPanel events={events} />
        </section>

        <section id="merch" className="stack-section">
          <MerchPanel items={merch} />
        </section>

        <section id="contact" className="contact-strip panel frame-panel">
          <div className="panel-heading">
            <span className="panel-heading__line" />
            <h3>Contact</h3>
            <span className="panel-heading__line" />
          </div>

          <div className="contact-strip__content">
            <p>666.rock</p>
            <span>ESCOBAR UNDERGROUND CLUB • AARHUS, DK</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;