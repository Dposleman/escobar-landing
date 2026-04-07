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
      <NavBar items={navItems} />

      <Hero
        title="ESCOBAR"
        subtitle="Underground Sound • Vinyl • Fire Nights"
      />

      <main className="layout">
        <section id="vinyl">
          <VinylPanel vinyl={vinyl} />
        </section>

        <section id="radio">
          <RadioPanel tracks={radioTracks} />
        </section>

        <section id="events">
          <EventsPanel events={events} />
        </section>

        <section id="merch">
          <MerchPanel items={merch} />
        </section>
      </main>
    </div>
  );
}

export default App;