import { useEffect, useMemo } from "react";
import EventsPanel from "./components/EventsPanel";
import { GalleryPanel } from "./components/GalleryPanel";
import { SiteHeader } from "./components/SiteHeader";
import { RadioDeck } from "./components/RadioDeck";
import { EmberField } from "./components/EmberField";
import { AuthPanel } from "./components/AuthPanel";
import MerchPanel from "./components/MerchPanel";
import { NewsPanel } from "./components/NewsPanel";
import { ChatPanel } from "./components/ChatPanel";
import { revealPanels } from "./animations/animations";
import { useCms } from "./hooks/useCms";
import { createEmbers } from "./utils/embers";
import { initMouseGlow } from "./utils/mouseGlow";
import { AdminPage } from "./pages/AdminPage";
import { DonationPage } from "./pages/DonationPage";
import { setLang } from "./i18n/useLang";
import { Footer } from "./components/Footer";
import { DealBanner } from "./components/DealBanner";
import { RequestSong } from "./components/RequestSong";
import { BeerMenu } from "./components/BeerMenu";
import { FindUs } from "./components/FindUs";
import { StickerWall } from "./components/StickerWall";
import { JoinPanels } from "./components/JoinPanels";
import "./styles/dynamic-panels.css";
import "./styles/final-polish.css";
import "./styles/admin.css";
import "./styles/landing.css";
import "./styles/venue.css";
import BackgroundEngine from "./engine/BackgroundEngine";
import { EffectsEngine } from "./engine/EffectsEngine";
import { ParticlesEngine } from "./engine/ParticlesEngine";
import { AudioReactiveEngine } from "./engine/AudioReactiveEngine";

setLang("en");

const isMobileSafari = () => {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent || "";
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);

  return isIOS && isSafari;
};


function BodyClass({ name }: { name: string }) {
  useEffect(() => {
    document.body.classList.add(name);
    return () => document.body.classList.remove(name);
  }, [name]);

  return null;
}

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

    const isHome = !routeState.isAdminRoute && !routeState.isDonationRoute;

    if (!safariSafeMode && !isHome) {
      try {
        const cleanupGlow = initMouseGlow();
        cleanups.push(cleanupGlow);
      } catch (error) {
        console.warn("Escobar mouse glow disabled", error);
      }
    }

    if (!isHome) {
      try {
        const cleanupEmbers = typeof createEmbers === "function" ? createEmbers() : undefined;
        if (cleanupEmbers) cleanups.push(cleanupEmbers);
      } catch (error) {
        console.warn("Escobar ember layer disabled", error);
      }
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [cms.state, routeState]);

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
        
        <DonationPage />
      </>
    );
  }

  return (
    <div className="esc-landing">
      <BodyClass name="esc-body" />
      <div className="esc-bg" aria-hidden="true">
        <span className="esc-bg__fog" />
        <span className="esc-bg__heat" />
        <span className="esc-bg__hot" />
        <span className="esc-bg__embers" />
        <span className="esc-bg__embers esc-bg__embers--b" />
        <span className="esc-swag esc-swag--l" />
        <span className="esc-swag esc-swag--r" />
        <span className="esc-chain esc-chain--l1" />
        <span className="esc-chain esc-chain--r1" />
        <span className="esc-chain esc-chain--l2" />
        <span className="esc-chain esc-chain--r2" />
        <span className="esc-chain esc-chain--l3" />
        <span className="esc-chain esc-chain--r3" />
      </div>
      <EmberField />

      <main className="esc-page">
        <SiteHeader venue={cms.state.venue} />

        <DealBanner venue={cms.state.venue} />

        <section className="esc-top-grid">
          <RadioDeck
            key={cms.state.radio.spotifyUrl || cms.state.radio.embedUrl}
            radio={cms.state.radio}
          />
        </section>

        <RequestSong venue={cms.state.venue} />

        <EventsPanel events={cms.state.events} />
        <GalleryPanel images={cms.state.gallery} />
        <MerchPanel items={cms.state.merch} />

        <div className="esc-duo esc-duo--bar">
          <BeerMenu venue={cms.state.venue} />
          <FindUs venue={cms.state.venue} />
        </div>

        <StickerWall venue={cms.state.venue} />
        <JoinPanels venue={cms.state.venue} />

        <div className="esc-members">
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
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default App;
