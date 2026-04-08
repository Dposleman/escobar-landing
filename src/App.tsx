import { useEffect } from "react";
import { EventsPanel } from "./components/EventsPanel";
import { GalleryPanel } from "./components/GalleryPanel";
import { Hero } from "./components/Hero";
import { AuthPanel } from "./components/AuthPanel";
import { MerchPanel } from "./components/MerchPanel";
import { NavBar } from "./components/NavBar";
import { RadioPanel } from "./components/RadioPanel";
import { ChatPanel } from "./components/ChatPanel";
import { VinylPanel } from "./components/VinylPanel";
import { revealPanels } from "./animations/animations";
import { useCms } from "./hooks/useCms";
import { buildVinylViewModel } from "./utils/spotify";
import { createEmbers } from "./utils/embers";
import { initMouseGlow } from "./utils/mouseGlow";
import { AdminPage } from "./pages/AdminPage";

function App() {
  const { state, login, register, logout, sendMessage } = useCms();

  const isAdminRoute =
    typeof window !== "undefined" &&
    window.location.pathname === "/admin";

  useEffect(() => {
    const cleanupReveal = revealPanels();
    const cleanupGlow = initMouseGlow();
    const cleanupEmbers = createEmbers();

    return () => {
      cleanupReveal();
      cleanupGlow();
      cleanupEmbers();
    };
  }, [state]);

  if (isAdminRoute) {
    return <AdminPage />;
  }

  return (
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
        <NavBar />

        <section className="feature-grid">
          <VinylPanel vinyl={buildVinylViewModel(state.radio)} />
          <RadioPanel radio={state.radio} />
        </section>

        <EventsPanel events={state.events} />
        <MerchPanel merch={state.merch} />

        <section className="dynamic-grid">
          <GalleryPanel images={state.gallery} />
          <AuthPanel
            session={state.auth}
            onLogin={login}
            onRegister={register}
            onLogout={logout}
          />
        </section>

        <ChatPanel
          session={state.auth}
          messages={state.chat.messages}
          onSendMessage={sendMessage}
        />
      </main>
    </div>
  );
}

export default App;