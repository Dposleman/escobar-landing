import "../styles/admin.css";
import "../styles/admin-skin.css";
import { useState } from "react";
import { AdminDashboard } from "../components/admin/AdminDashboard";
import { useCms } from "../hooks/useCms";
import { adminSignIn, adminSignOut } from "../services/adminSession";
import { cmsService } from "../services/cmsService";

const THEME_KEY = "escobar-admin-theme";

function readStoredTheme(): "light" | "dark" {
  try {
    return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function AdminPage() {
  const cms = useCms();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(readStoredTheme);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // private mode: the choice just isn't remembered
    }
  }

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
              onSubmit={async (event) => {
                event.preventDefault();
                setSigningIn(true);
                setError("");
                try {
                  if (!(await adminSignIn(email, password))) {
                    setError("INVALID ADMIN CREDENTIALS");
                    return;
                  }
                  setPassword("");
                  await cmsService.bootstrap(true);
                  setIsAuthorized(true);
                } catch {
                  adminSignOut();
                  setError("COULD NOT CONNECT. TRY AGAIN.");
                } finally {
                  setSigningIn(false);
                }
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

              <button className="auth-solid-button" type="submit" disabled={signingIn}>
                ENTER ADMIN PANEL
              </button>
            </form>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-skin" data-theme={theme}>
      <div className="admin-skin__bar">
        <button type="button" onClick={() => { adminSignOut(); setIsAuthorized(false); }}>Log out</button>
        <button type="button" onClick={toggleTheme} aria-pressed={theme === "dark"}>
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>

      <main>
        <AdminDashboard
          events={cms.state.events}
          merch={cms.state.merch}
          gallery={cms.state.gallery}
          news={cms.state.news}
          radio={cms.state.radio}
          venue={cms.state.venue}
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
          onUpdateVenue={cms.updateVenue}
        />
      </main>
    </div>
  );
}
