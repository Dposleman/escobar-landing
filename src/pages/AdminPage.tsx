import { useMemo, useState } from "react";
import { AdminDashboard } from "../components/admin/AdminDashboard";
import { useCms } from "../hooks/useCms";
import type { LoginPayload } from "../types";

const initialLoginForm: LoginPayload = {
  email: "",
  password: "",
};

export function AdminPage() {
  const {
    state,
    login,
    logout,
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

  const [form, setForm] = useState<LoginPayload>(initialLoginForm);
  const [error, setError] = useState("");

  const isAdminAuthenticated = useMemo(() => {
    return state.auth.isAuthenticated && state.auth.user?.role === "admin";
  }, [state.auth]);

  const handleAdminLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const beforeToken = state.auth.token;
    login(form);

    const nextState = window.localStorage.getItem("escobar-landing-cms");
    if (!nextState) {
      setError("ADMIN ACCESS DENIED");
      return;
    }

    const parsed = JSON.parse(nextState) as typeof state;
    const isAdmin =
      parsed.auth.isAuthenticated &&
      parsed.auth.user?.role === "admin" &&
      parsed.auth.user.email.toLowerCase() === "dio.escobar.aarhus@gmail.com";

    if (!isAdmin) {
      const tokenChanged = beforeToken !== parsed.auth.token;

      if (tokenChanged) {
        logout();
      }

      setError("ONLY THE ADMIN ACCOUNT CAN ACCESS THIS PANEL");
      return;
    }

    setError("");
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="app-shell admin-route-shell">
        <div className="page-base" aria-hidden="true" />
        <div className="page-rust" aria-hidden="true" />
        <div className="page-noise" aria-hidden="true" />
        <div className="page-vignette" aria-hidden="true" />
        <div className="page-burn page-burn-top" aria-hidden="true" />
        <div className="page-burn page-burn-bottom" aria-hidden="true" />
        <div className="mouse-glow" aria-hidden="true" />

        <main className="page-content">
          <section className="auth-panel metal-panel battered-panel js-reveal" id="admin-login">
            <div className="section-title">
              <span />
              <h3>ADMIN ACCESS</h3>
              <span />
            </div>

            <form className="auth-form" onSubmit={handleAdminLogin}>
              <label className="auth-field">
                <span>ADMIN EMAIL</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      email: event.target.value,
                    })
                  }
                />
              </label>

              <label className="auth-field">
                <span>PASSWORD</span>
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      password: event.target.value,
                    })
                  }
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
    <div className="app-shell admin-route-shell">
      <div className="page-base" aria-hidden="true" />
      <div className="page-rust" aria-hidden="true" />
      <div className="page-noise" aria-hidden="true" />
      <div className="page-vignette" aria-hidden="true" />
      <div className="page-burn page-burn-top" aria-hidden="true" />
      <div className="page-burn page-burn-bottom" aria-hidden="true" />
      <div className="mouse-glow" aria-hidden="true" />

      <main className="page-content">
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