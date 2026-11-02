import { useState, type FormEvent } from "react";
import type { VenueState } from "../types";
import { useT } from "../i18n/strings";
import { useSubmit } from "../hooks/useSubmit";
import { FormStatus } from "./FormStatus";

export function RequestSong({ venue }: { venue: VenueState }) {
  const t = useT();
  const { state, submit, reset } = useSubmit("request", venue.email, "Song request for Radio Escobar");
  const [song, setSong] = useState("");
  const [name, setName] = useState("");
  const [trap, setTrap] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!song.trim()) return;
    if (await submit({ song, name, website: trap })) {
      setSong("");
      setName("");
    }
  }

  return (
    <section className="esc-panel esc-request js-reveal" id="request" aria-labelledby="request-title">
      <div className="esc-request__copy">
        <h2 id="request-title">{t.requestTitle}</h2>
        <p>{t.requestIntro}</p>
      </div>
      <form className="esc-form esc-form--inline" onSubmit={onSubmit} onChange={reset}>
        <label>
          <span>{t.requestSong}</span>
          <input value={song} onChange={(e) => setSong(e.target.value)} maxLength={200} required />
        </label>
        <label>
          <span>{t.requestName}</span>
          <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} autoComplete="given-name" />
        </label>
        <input className="esc-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} name="website" />
        <button className="esc-btn" type="submit" disabled={state === "sending"}>
          {t.requestSend}
        </button>
        <FormStatus state={state} />
      </form>
    </section>
  );
}
