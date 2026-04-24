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
import { DonationPage } from "./pages/DonationPage";
import { setLang } from "./i18n/useLang";
import { Footer } from "./components/Footer";
import "./styles/dynamic-panels.css";
import "./styles/final-polish.css";
import "./styles/admin.css";
import BackgroundEngine from "./engine/BackgroundEngine";
import { EffectsEngine } from "./engine/EffectsEngine";
import { ParticlesEngine } from "./engine/ParticlesEngine";
import { AudioReactiveEngine } from "./engine/AudioReactiveEngine";
import { VisualEngineUpgrade } from "./components/VisualEngineUpgrade";

setLang("da");

const isMobileSafari = () => {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent || "";
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);

  return isIOS && isSafari;
};


function App() {
  const cms = useCms();

  const routeState = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        isAdminRoute: false,
        isDonationRoute: false,
      };
    }

    const params = new URLSearchParams(window.location.search);

    return {
      isAdminRoute: window.location.pathname === "/admin" || params.get("admin") === "1",
      isDonationRoute:
        window.location.pathname === "/feed-the-dev" ||
        params.get("feed-the-dev") === "1" ||
        params.get("donate") === "1",
    };
  }, []);

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const safariSafeMode = isMobileSafari();

    try {
      const cleanupReveal = revealPanels();
      cleanups.push(cleanupReveal);
    } catch (error) {
      console.warn("Escobar reveal animation disabled", error);
    }

    if (!safariSafeMode) {
      try {
        const cleanupGlow = initMouseGlow();
        cleanups.push(cleanupGlow);
      } catch (error) {
        console.warn("Escobar mouse glow disabled", error);
      }
    }

    try {
      const cleanupEmbers = typeof createEmbers === "function" ? createEmbers() : undefined;
      if (cleanupEmbers) cleanups.push(cleanupEmbers);
    } catch (error) {
      console.warn("Escobar ember layer disabled", error);
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [cms.state]);

  const safariSafeMode = isMobileSafari();

  if (routeState.isAdminRoute) {
    return <AdminPage />;
  }

  if (routeState.isDonationRoute) {
    return (
      <>
        <BackgroundEngine />
        <EffectsEngine />
        {!safariSafeMode && <ParticlesEngine />}
        {!safariSafeMode && <AudioReactiveEngine />}
        <VisualEngineUpgrade />
        <DonationPage />
      </>
    );
  }

  return (
    <>
      <BackgroundEngine />
      <EffectsEngine />
      {!safariSafeMode && <ParticlesEngine />}
      {!safariSafeMode && <AudioReactiveEngine />}

      <VisualEngineUpgrade />

      <div className="app-shell">
        <div className="mouse-glow" aria-hidden="true" />

        <main className="page-content">
          <Hero />
          <div className="panel-divider" aria-hidden="true" />
          <NavBar items={cms.state.nav} />

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
