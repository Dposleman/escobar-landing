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
      <div className="radio-shell-overlay radio-shell-overlay--clean">
        <div className="section-title section-title--boxed section-title--radio">
          <h3>{radio.title || "RADIO ESCOBAR"}</h3>
        </div>

        <div className="radio-embed-frame radio-embed-frame--clean">
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
          <a className="cta-button cta-button--compact" href={openUrl} target="_blank" rel="noreferrer">
            <span>OPEN SPOTIFY</span>
          </a>
        </div>
      </div>
    </section>
  );
}
