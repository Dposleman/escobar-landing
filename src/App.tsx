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
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { revealPanels } from "./animations/animations";
import { useCms } from "./hooks/useCms";
import { buildVinylViewModel } from "./utils/spotify";
import { createEmbers } from "./utils/embers";
import { initMouseGlow } from "./utils/mouseGlow";

function App() {
  const {
    state,
    login,
    register,
    logout,
    sendMessage,
    createEvent,
    updateEvent,
    deleteEvent,
    reorderEvents,
    createMerch,
    updateMerch,
    deleteMerch,
    reorderMerch,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    reorderGallery,
    createUser,
    updateUser,
    deleteUser,
    reorderUsers,
    updateRadio,
  } = useCms();

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
        <NavBar items={state.nav} />

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

        <AdminDashboard
          events={state.events}
          merch={state.merch}
          gallery={state.gallery}
          radio={state.radio}
          users={state.users}
          onCreateEvent={createEvent}
          onUpdateEvent={updateEvent}
          onDeleteEvent={deleteEvent}
          onReorderEvents={(fromIndex, toIndex) => reorderEvents({ fromIndex, toIndex })}
          onCreateMerch={createMerch}
          onUpdateMerch={updateMerch}
          onDeleteMerch={deleteMerch}
          onReorderMerch={(fromIndex, toIndex) => reorderMerch({ fromIndex, toIndex })}
          onCreateGalleryItem={createGalleryItem}
          onUpdateGalleryItem={updateGalleryItem}
          onDeleteGalleryItem={deleteGalleryItem}
          onReorderGallery={(fromIndex, toIndex) => reorderGallery({ fromIndex, toIndex })}
          onCreateUser={createUser}
          onUpdateUser={updateUser}
          onDeleteUser={deleteUser}
          onReorderUsers={(fromIndex, toIndex) => reorderUsers({ fromIndex, toIndex })}
          onUpdateRadio={updateRadio}
        />
      </main>
    </div>
  );
}

export default App;