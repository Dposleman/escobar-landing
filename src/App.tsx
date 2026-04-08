import { useEffect } from "react";
import { EventsPanel } from "./components/EventsPanel";
import { Hero } from "./components/Hero";
import { MerchPanel } from "./components/MerchPanel";
import { NavBar } from "./components/NavBar";
import { RadioPanel } from "./components/RadioPanel";
import { VinylPanel } from "./components/VinylPanel";
import { revealPanels } from "./animations/animations";
import { events } from "./data/events";
import { merch } from "./data/merch";
import { navItems } from "./data/nav";
import { radioTracks } from "./data/radio";
import { vinyl } from "./data/vinyl";
import { createEmbers } from "./utils/embers";
import { initMouseGlow } from "./utils/mouseGlow";

function App() {
  useEffect(() => {
    const cleanupReveal = revealPanels();
    const cleanupGlow = initMouseGlow();
    const cleanupEmbers = createEmbers();

    return () => {
      cleanupReveal();
      cleanupGlow();
      cleanupEmbers();
    };
  }, []);

  return (
    <div className="app-shell">
      <div className="page-noise" aria-hidden="true" />
      <div className="page-vignette" aria-hidden="true" />
      <div className="mouse-glow" aria-hidden="true" />

      <NavBar items={navItems} />

      <main className="page-content">
        <Hero />

        <section className="feature-grid">
          <VinylPanel vinyl={vinyl} />
          <RadioPanel tracks={radioTracks} />
        </section>

        <EventsPanel events={events} />
        <MerchPanel merch={merch} />

        <section className="contact-section metal-panel battered-panel js-reveal" id="contact">
          <div className="section-title">
            <span />
            <h3>CONTACT</h3>
            <span />
          </div>

          <div className="contact-grid">
            <div className="contact-block">
              <span className="contact-label">DOMAIN</span>
              <a href="https://666.rock" className="contact-link" target="_blank" rel="noreferrer">
                666.rock
              </a>
            </div>

            <div className="contact-block">
              <span className="contact-label">LOCATION</span>
              <p className="contact-copy">Aarhus · Denmark</p>
            </div>

            <div className="contact-block">
              <span className="contact-label">MESSAGE</span>
              <p className="contact-copy">Rock · Metal · Beer · Community</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;