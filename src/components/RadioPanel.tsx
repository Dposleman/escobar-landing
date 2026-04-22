import type { RadioState } from "../types";
import { buildSpotifyEmbedUrl, resolveRadioLinkTarget } from "../utils/spotify";
import "../styles/RadioPanel.css";
import "../styles/final-polish.css";

type Props = {
  radio: RadioState;
};

export function RadioPanel({ radio }: Props) {
  const embedUrl = buildSpotifyEmbedUrl(radio.spotifyUrl || radio.embedUrl || "");
  const openUrl = resolveRadioLinkTarget(radio);

  return (
    <section className="radio-panel metal-panel battered-panel js-reveal" id="radio">
      <div className="escobar-panel-frame" aria-hidden="true">
        <span className="escobar-chain escobar-chain--top" />
        <span className="escobar-chain escobar-chain--right" />
        <span className="escobar-chain escobar-chain--bottom" />
        <span className="escobar-chain escobar-chain--left" />
      </div>

      <div className="escobar-panel-divider escobar-panel-divider--top" aria-hidden="true" />

      <div className="escobar-panel-title escobar-panel-title--radio">
        <span>{radio.title || "RADIO ESCOBAR"}</span>
      </div>

      <div className="radio-shell-overlay radio-shell-overlay--clean">
        <div className="radio-header radio-header--stacked">
          <span className="live">{radio.subtitle || "NOW PLAYING LIVE"}</span>
        </div>

        <div className="radio-embed-frame radio-embed-frame--showcase">
          {embedUrl ? (
            <iframe
              className="radio-spotify-embed radio-spotify-embed--showcase"
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

        <div className="radio-footer-row radio-footer-row--center">
          <a className="cta-button cta-button--secondary" href={openUrl} target="_blank" rel="noreferrer">
            <span>OPEN SPOTIFY</span>
          </a>
        </div>
      </div>
    </section>
  );
}
