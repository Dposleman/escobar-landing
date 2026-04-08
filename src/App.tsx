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
    const cleanupGlow = initMouseGlow();
    const cleanupEmbers = createEmbers();
    const cleanupReveal = revealPanels();

    return () => {
      cleanupGlow?.();
      cleanupEmbers?.();
      cleanupReveal?.();
    };
  }, []);

  return (
    <div className="app-shell">
      <div className="noise" aria-hidden="true" />
      <div className="mouse-glow" aria-hidden="true" />

      <NavBar items={navItems} />

      <main className="page">
        <Hero />

        <section className="feature-grid section-frame reveal-panel">
          <div className="feature-grid__left">
            <VinylPanel vinyl={vinyl} />
          </div>

          <div className="feature-grid__right">
            <RadioPanel tracks={radioTracks} />
          </div>
        </section>

        <section id="events" className="section-frame reveal-panel">
          <EventsPanel events={events} />
        </section>

        <section id="merch" className="section-frame reveal-panel">
          <MerchPanel items={merch} />
        </section>

        <section id="contact" className="contact-panel section-frame reveal-panel">
          <div className="section-title-wrap">
            <div className="section-rule" />
            <h2 className="section-title">CONTACT</h2>
            <div className="section-rule" />
          </div>

          <div className="contact-card metal-card chain-card">
            <div className="contact-card__inner">
              <p className="contact-card__kicker">ESCOBAR UNDERGROUND CLUB</p>
              <p className="contact-card__line">AARHUS · DENMARK</p>
              <a className="contact-card__mail" href="mailto:666@rock">
                666.rock
              </a>
              <p className="contact-card__line">ROCK · METAL · BEER · COMMUNITY</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;