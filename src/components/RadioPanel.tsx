import type { RadioState } from "../types";
import { buildSpotifyEmbedUrl, resolveRadioLinkTarget } from "../utils/spotify";
import "../styles/RadioPanel.css";

type Props = {
  radio: RadioState;
};

export function RadioPanel({ radio }: Props) {
  const embedUrl = buildSpotifyEmbedUrl(radio.spotifyUrl || radio.embedUrl || "");
  const openUrl = resolveRadioLinkTarget(radio);

  return (
    <section className="radio-panel metal-panel battered-panel js-reveal" id="radio">
      <div className="esc-panel-frame" aria-hidden="true">
        <span className="esc-panel-frame__edge esc-panel-frame__edge--top" />
        <span className="esc-panel-frame__edge esc-panel-frame__edge--right" />
        <span className="esc-panel-frame__edge esc-panel-frame__edge--bottom" />
        <span className="esc-panel-frame__edge esc-panel-frame__edge--left" />
        <span className="esc-panel-frame__divider esc-panel-frame__divider--top" />
        <span className="esc-panel-frame__divider esc-panel-frame__divider--bottom" />
      </div>

      <div className="radio-shell-overlay radio-shell-overlay--clean">
        <div className="esc-panel-plaque esc-panel-plaque--center esc-panel-plaque--radio">
          <h3>{radio.title || "RADIO ESCOBAR"}</h3>
        </div>

        <div className="radio-embed-frame">
          {embedUrl ? (
            <iframe
              className="radio-spotify-embed"
              src={embedUrl}
              title="Escobar Spotify Radio"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          ) : (
            <div className="radio-fallback-card">
              <strong>No Spotify source configured</strong>
              <span>Add a Spotify album, playlist or track URL from the admin panel.</span>
            </div>
          )}
        </div>

        <div className="radio-footer-row radio-footer-row--actions">
          <a className="cta-button" href={openUrl} target="_blank" rel="noreferrer">
            <span>OPEN SPOTIFY</span>
          </a>
        </div>
      </div>
    </section>
  );
}
