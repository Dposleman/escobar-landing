import { useEffect } from "react";
import { EventsPanel } from "./components/EventsPanel";
import { GalleryPanel } from "./components/GalleryPanel";
import { Hero } from "./components/Hero";
import { AuthPanel } from "./components/AuthPanel";
import { MerchPanel } from "./components/MerchPanel";
import NavBar from "./components/NavBar"; // ✅ FIX DEFAULT IMPORT
import { NewsPanel } from "./components/NewsPanel";
import { RadioPanel } from "./components/RadioPanel";
import { ChatPanel } from "./components/ChatPanel";
import { VinylPanel } from "./components/VinylPanel";
import { revealPanels } from "./animations/animations";
import { useCms } from "./hooks/useCms";
import { buildVinylViewModel } from "./utils/spotify";
import { createEmbers } from "./utils/embers";
import { initMouseGlow } from "./utils/mouseGlow";
import { AdminPage } from "./pages/AdminPage";
import { setLang } from "./i18n/useLang";
import { Footer } from "./components/Footer";

import BackgroundEngine from "./engine/BackgroundEngine";
import EffectsEngine from "./engine/EffectsEngine";
import ParticlesEngine from "./engine/ParticlesEngine";
import LightSystem from "./engine/LightSystem"; // ✅ NEW

setLang("da");

function App() {
  const cms = useCms();

  const isAdminRoute =
    typeof window !== "undefined" &&
    window.location.pathname === "/admin";

  useEffect(() => {
    const cleanupReveal = revealPanels();
    const cleanupGlow = initMouseGlow();

    let cleanupEmbers: (() => void) | undefined;

    if (typeof createEmbers === "function") {
      cleanupEmbers = createEmbers();
    }

    return () => {
      cleanupReveal();
      cleanupGlow();
      cleanupEmbers?.();
    };
  }, [cms.state]);

  if (isAdminRoute) {
    return <AdminPage />;
  }

  return (
    <>
      <BackgroundEngine />
      <EffectsEngine />
      <ParticlesEngine />
      <LightSystem /> {/* 🔥 LOCAL LIGHT SYSTEM */}

      <div className="app-shell">
        <div className="page-base" aria-hidden="true" />
        <div className="page-rust" aria-hidden="true" />
        <div className="page-noise" aria-hidden="true" />
        <div className="page-vignette" aria-hidden="true" />
        <div className="page-burn page-burn-top" aria-hidden="true" />
        <div className="page-burn page-burn-bottom" aria-hidden="true" />
        <div className="mouse-glow" aria-hidden="true" />
        <div className="decor-chain decor-chain-left" aria-hidden="true" />
        <div className="decor-chain decor-chain-right" aria-hidden="true" />
        <div className="side-hooks side-hooks-left" aria-hidden="true" />
        <div className="side-hooks side-hooks-right" aria-hidden="true" />

        <main className="page-content">
          <Hero />

          {/* 🔥 NAV FIX + SYSTEM */}
          <NavBar />

          <section className="feature-grid">
            <VinylPanel vinyl={buildVinylViewModel(cms.state.radio)} />
            <RadioPanel radio={cms.state.radio} />
          </section>

          <EventsPanel events={cms.state.events} />
          <MerchPanel merch={cms.state.merch} />
          <GalleryPanel images={cms.state.gallery} />

          <section className="member-access-wrap">
            <AuthPanel
              session={cms.state.auth}
              onLogin={cms.login}
              onRegister={cms.register}
              onLogout={cms.logout}
            />
          </section>

          <NewsPanel news={cms.state.news} />

          <ChatPanel
            session={cms.state.auth}
            messages={cms.state.chat.messages}
            onSendMessage={cms.sendMessage}
          />

          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;