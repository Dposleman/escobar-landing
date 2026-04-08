import { useMemo, useState } from "react";
import { AdminDashboard } from "../components/admin/AdminDashboard";
import { useCms } from "../hooks/useCms";

const ADMIN_EMAIL = "dio.escobar.aarhus@gmail.com";
const ADMIN_PASSWORD = "Rasmus123";

export function AdminPage() {
  const cms = useCms();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isAuthorized = useMemo(() => {
    return (
      cms.state.auth.isAuthenticated &&
      cms.state.auth.user?.role === "admin" &&
      cms.state.auth.user.email.toLowerCase() === ADMIN_EMAIL
    );
  }, [cms.state.auth]);

  if (!isAuthorized) {
    return (
      <div className="app-shell">
        <div className="page-base" aria-hidden="true" />
        <div className="page-rust" aria-hidden="true" />
        <div className="page-noise" aria-hidden="true" />
        <div className="page-vignette" aria-hidden="true" />
        <div className="mouse-glow" aria-hidden="true" />

        <main className="page-content">
          <section className="auth-panel metal-panel battered-panel js-reveal" id="admin-login">
            <div className="section-title">
              <span />
              <h3>ADMIN ACCESS</h3>
              <span />
            </div>

            <form
              className="auth-form"
              onSubmit={(event) => {
                event.preventDefault();

                if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
                  setError("INVALID ADMIN CREDENTIALS");
                  return;
                }

                cms.login({ email, password });
                setError("");
              }}
            >
              <label className="auth-field">
                <span>ADMIN EMAIL</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>

              <label className="auth-field">
                <span>PASSWORD</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>

              {error ? <p className="admin-login-error">{error}</p> : null}

              <button className="auth-solid-button" type="submit">
                ENTER ADMIN PANEL
              </button>
            </form>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="page-base" aria-hidden="true" />
      <div className="page-rust" aria-hidden="true" />
      <div className="page-noise" aria-hidden="true" />
      <div className="page-vignette" aria-hidden="true" />
      <div className="mouse-glow" aria-hidden="true" />

      <main className="page-content">
        <AdminDashboard
          events={cms.state.events}
          merch={cms.state.merch}
          gallery={cms.state.gallery}
          news={cms.state.news}
          radio={cms.state.radio}
          users={cms.state.users}
          onCreateEvent={cms.createEvent}
          onUpdateEvent={cms.updateEvent}
          onDeleteEvent={cms.deleteEvent}
          onReorderEvents={(fromIndex, toIndex) => cms.reorderEvents({ fromIndex, toIndex })}
          onCreateMerch={cms.createMerch}
          onUpdateMerch={cms.updateMerch}
          onDeleteMerch={cms.deleteMerch}
          onReorderMerch={(fromIndex, toIndex) => cms.reorderMerch({ fromIndex, toIndex })}
          onCreateGalleryItem={cms.createGalleryItem}
          onUpdateGalleryItem={cms.updateGalleryItem}
          onDeleteGalleryItem={cms.deleteGalleryItem}
          onReorderGallery={(fromIndex, toIndex) => cms.reorderGallery({ fromIndex, toIndex })}
          onCreateNewsItem={cms.createNewsItem}
          onUpdateNewsItem={cms.updateNewsItem}
          onDeleteNewsItem={cms.deleteNewsItem}
          onReorderNews={(fromIndex, toIndex) => cms.reorderNews({ fromIndex, toIndex })}
          onCreateUser={cms.createUser}
          onUpdateUser={cms.updateUser}
          onDeleteUser={cms.deleteUser}
          onReorderUsers={(fromIndex, toIndex) => cms.reorderUsers({ fromIndex, toIndex })}
          onUpdateRadio={cms.updateRadio}
        />
      </main>
    </div>
  );
}