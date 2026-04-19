import { useEffect } from "react";
import { EventsPanel } from "./components/EventsPanel";
import { GalleryPanel } from "./components/GalleryPanel";
import { Hero } from "./components/Hero";
import { AuthPanel } from "./components/AuthPanel";
import { MerchPanel } from "./components/MerchPanel";
import NavBar from "./components/NavBar";
import { NewsPanel } from "./components/NewsPanel";
import { RadioPanel } from "./components/RadioPanel";
import { ChatPanel } from "./components/ChatPanel";
import { VinylPanel } from "./components/VinylPanel";
import { revealPanels } from "./animations/animations";
import { useCms } from "./hooks/useCms";
import { buildVinylViewModel, buildSpotifyEmbedUrl } from "./utils/spotify";
import { createEmbers } from "./utils/embers";
import { initMouseGlow } from "./utils/mouseGlow";
import { AdminPage } from "./pages/AdminPage";
import { setLang } from "./i18n/useLang";
import { Footer } from "./components/Footer";
import "./styles/dynamic-panels.css";
import "./styles/final-polish.css";

import BackgroundEngine from "./engine/BackgroundEngine";
import { EffectsEngine } from "./engine/EffectsEngine";
import { ParticlesEngine } from "./engine/ParticlesEngine";
import { AudioReactiveEngine } from "./engine/AudioReactiveEngine";

setLang("da");

function App() {
  const cms = useCms();

  const isAdminRoute =
    typeof window !== "undefined" && window.location.pathname === "/admin";

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

  const vinylVM = buildVinylViewModel(cms.state.radio);

  const vinylProps = {
    title: vinylVM.release || "Unknown Track",
    artist: vinylVM.artist || "ESCOBAR RADIO",
    cover: vinylVM.coverImage || "/fallback.jpg",
    bpm: 120,
  };

  const radioProps = {
    title: cms.state.radio.title,
    track: cms.state.radio.nowPlaying?.track || "Live stream",
    artist: cms.state.radio.nowPlaying?.artist || "Escobar Radio",
    embedUrl: buildSpotifyEmbedUrl(cms.state.radio.spotifyUrl || ""),
  };

  return (
    <>
      <BackgroundEngine />
      <EffectsEngine />
      <ParticlesEngine />
      <AudioReactiveEngine />

      <div className="app-shell">
        <main className="page-content">
          <Hero />
          <NavBar />

          <section className="feature-grid">
            <VinylPanel vinyl={vinylProps} />
            <RadioPanel radio={radioProps} />
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
