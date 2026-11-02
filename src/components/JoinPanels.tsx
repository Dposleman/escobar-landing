import { useState, type FormEvent } from "react";
import type { VenueState } from "../types";
import { useT } from "../i18n/strings";
import { useSubmit } from "../hooks/useSubmit";
import { FormStatus } from "./FormStatus";

function BookGig({ venue }: { venue: VenueState }) {
  const t = useT();
  const { state, submit, reset } = useSubmit("band", venue.email, "Gig enquiry from the Escobar site");
  const [form, setForm] = useState({ band: "", genre: "", link: "", email: "", message: "", website: "" });
  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((current) => ({ ...current, [key]: e.target.value }));

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (await submit(form)) setForm({ band: "", genre: "", link: "", email: "", message: "", website: "" });
  }

  return (
    <section className="esc-panel esc-join js-reveal" id="gig" aria-labelledby="gig-title">
      <h2 className="esc-beer__title" id="gig-title">
        <span>{t.gigTitle}</span>
      </h2>
      <p className="esc-lead">{t.gigIntro}</p>
      <form className="esc-form" onSubmit={onSubmit} onChange={reset}>
        <div className="esc-form__row">
          <label>
            <span>{t.bandName}</span>
            <input value={form.band} onChange={set("band")} maxLength={200} required />
          </label>
          <label>
            <span>{t.genre}</span>
            <input value={form.genre} onChange={set("genre")} maxLength={200} />
          </label>
        </div>
        <label>
          <span>{t.link}</span>
          <input type="url" value={form.link} onChange={set("link")} maxLength={200} placeholder="https://" />
        </label>
        <label>
          <span>{t.yourEmail}</span>
          <input type="email" value={form.email} onChange={set("email")} maxLength={200} required autoComplete="email" />
        </label>
        <label>
          <span>{t.message}</span>
          <textarea value={form.message} onChange={set("message")} maxLength={1200} rows={3} />
        </label>
        <input className="esc-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={set("website")} name="website" />
        <button className="esc-btn" type="submit" disabled={state === "sending"}>
          {t.sendBand}
        </button>
        <FormStatus state={state} />
      </form>
    </section>
  );
}

function Newsletter({ venue }: { venue: VenueState }) {
  const t = useT();
  const { state, submit, reset } = useSubmit("newsletter", venue.email, "Newsletter signup");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [trap, setTrap] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!consent) return;
    if (await submit({ email, consent: true, website: trap })) {
      setEmail("");
      setConsent(false);
    }
  }

  return (
    <section className="esc-panel esc-join js-reveal" id="newsletter" aria-labelledby="news-title">
      <h2 className="esc-beer__title" id="news-title">
        <span>{t.newsletterTitle}</span>
      </h2>
      <p className="esc-lead">{t.newsletterIntro}</p>
      <form className="esc-form" onSubmit={onSubmit} onChange={reset}>
        <label>
          <span>{t.yourEmail}</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={200} required autoComplete="email" />
        </label>
        <label className="esc-form__check">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
          <span>{t.consent}</span>
        </label>
        <input className="esc-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} name="website" />
        <button className="esc-btn" type="submit" disabled={state === "sending" || !consent}>
          {t.subscribe}
        </button>
        <FormStatus state={state} />
      </form>
    </section>
  );
}

export function JoinPanels({ venue }: { venue: VenueState }) {
  return (
    <div className="esc-duo">
      <BookGig venue={venue} />
      <Newsletter venue={venue} />
    </div>
  );
}
