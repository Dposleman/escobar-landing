import { useEffect } from "react";
import EventsPanel from "./components/EventsPanel";
import { GalleryPanel } from "./components/GalleryPanel";
import { Hero } from "./components/Hero";
import { AuthPanel } from "./components/AuthPanel";
import MerchPanel from "./components/MerchPanel";
import NavBar from "./components/NavBar";
import { NewsPanel } from "./components/NewsPanel";
import { RadioPanel } from "./components/RadioPanel";
import { ChatPanel } from "./components/ChatPanel";
import { revealPanels } from "./animations/animations";
import { useCms } from "./hooks/useCms";
import { buildSpotifyEmbedUrl } from "./utils/spotify";
import { createEmbers } from "./utils/embers";
import { initMouseGlow } from "./utils/mouseGlow";
import { AdminPage } from "./pages/AdminPage";
import { setLang } from "./i18n/useLang";
import { Footer } from "./components/Footer";
import "./styles/dynamic-panels.css";
import "./styles/final-polish.css";
import "./styles/admin.css";

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

  const radioProps = {
    title: cms.state.radio.title,
    subtitle: cms.state.radio.subtitle,
    track: cms.state.radio.nowPlaying?.track || "Live stream",
    artist: cms.state.radio.nowPlaying?.artist || "Escobar Radio",
    album: cms.state.radio.nowPlaying?.album || "Spotify",
    coverImage:
      cms.state.radio.nowPlaying?.coverImage ||
      cms.state.radio.fallbackCoverImage ||
      "/ui-kit/radio_avatar.png",
    duration: cms.state.radio.nowPlaying?.duration || "4:32",
    progress: cms.state.radio.nowPlaying?.progress ?? 72,
    embedUrl: buildSpotifyEmbedUrl(cms.state.radio.spotifyUrl || ""),
    spotifyUrl: cms.state.radio.spotifyUrl || "",
  };

  return (
    <>
      <BackgroundEngine />
      <EffectsEngine />
      <ParticlesEngine />
      <AudioReactiveEngine />

      <div className="app-shell">
        <div className="mouse-glow" aria-hidden="true" />

        <main className="page-content">
          <Hero />
          <NavBar />

          <section className="feature-grid">
            <GalleryPanel images={cms.state.gallery} variant="feature" />
            <RadioPanel radio={radioProps} />
          </section>

          <EventsPanel events={cms.state.events} />
          <MerchPanel items={cms.state.merch} />

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
