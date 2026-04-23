import { useEffect, useMemo } from "react";
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

  const isAdminRoute = useMemo(() => {
    if (typeof window === "undefined") return false;
    const params = new URLSearchParams(window.location.search);
    return window.location.pathname === "/admin" || params.get("admin") === "1";
  }, []);

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
          <div className="panel-divider" aria-hidden="true" />
          <NavBar items={cms.state.nav} />

          <section className="header-utility-strip js-reveal" aria-label="Quick access">
            <a className="header-utility-link" href="#merch">MERCH STORE</a>
            <a className="header-utility-link" href="#chat">LIVE CHAT</a>
            <a className="header-utility-link header-utility-link--admin" href="/admin">ADMIN</a>
          </section>

          <div className="panel-divider" aria-hidden="true" />

          <section className="feature-grid feature-grid--framed">
            <GalleryPanel images={cms.state.gallery} />
            <RadioPanel radio={cms.state.radio} />
          </section>

          <div className="panel-divider" aria-hidden="true" />
          <EventsPanel events={cms.state.events} />
          <div className="panel-divider" aria-hidden="true" />
          <MerchPanel items={cms.state.merch} />
          <div className="panel-divider" aria-hidden="true" />

          <section className="member-access-wrap">
            <AuthPanel
              session={cms.state.auth}
              onLogin={cms.login}
              onRegister={cms.register}
              onLogout={cms.logout}
            />
          </section>

          <div className="panel-divider" aria-hidden="true" />
          <NewsPanel news={cms.state.news} />
          <div className="panel-divider" aria-hidden="true" />

          <ChatPanel
            session={cms.state.auth}
            messages={cms.state.chat.messages}
            onSendMessage={cms.sendMessage}
          />

          <div className="panel-divider panel-divider--footer" aria-hidden="true" />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
