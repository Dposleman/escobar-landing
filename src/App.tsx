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

  const isAdminRoute = typeof window !== "undefined" && window.location.pathname === "/admin";

  useEffect(() => {
    const cleanupReveal = revealPanels();
    const cleanupGlow = initMouseGlow();
    const cleanupEmbers = typeof createEmbers === "function" ? createEmbers() : undefined;

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
      <AudioReactiveEngine />

      <div className="app-shell">
        <div className="mouse-glow" aria-hidden="true" />

        <main className="page-content">
          <Hero />
          <NavBar />

          <section className="feature-grid">
            <GalleryPanel images={cms.state.gallery} />
            <RadioPanel radio={cms.state.radio} />
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
