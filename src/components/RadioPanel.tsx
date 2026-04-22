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
        <div className="radio-header">
          <span>{radio.title || "RADIO ESCOBAR"}</span>
          <span className="live">{radio.subtitle || "NOW PLAYING LIVE"}</span>
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
          <a className="cta-button cta-button--secondary" href={openUrl} target="_blank" rel="noreferrer">
            <span>OPEN SPOTIFY</span>
          </a>
          <a className="cta-button cta-button--secondary" href="#events">
            <span>MORE EVENTS</span>
          </a>
        </div>
      </div>
    </section>
  );
}
