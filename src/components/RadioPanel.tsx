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
      <div className="panel-chain-frame" aria-hidden="true">
        <span className="panel-chain-frame__edge panel-chain-frame__edge--top" />
        <span className="panel-chain-frame__edge panel-chain-frame__edge--bottom" />
        <span className="panel-chain-frame__edge panel-chain-frame__edge--left" />
        <span className="panel-chain-frame__edge panel-chain-frame__edge--right" />
        <span className="panel-chain-frame__divider panel-chain-frame__divider--top" />
        <span className="panel-chain-frame__divider panel-chain-frame__divider--bottom" />
      </div>

      <div className="radio-shell-overlay radio-shell-overlay--clean">
        <div className="section-title section-title--boxed section-title--floating section-title--radio-clean">
          <h3>{radio.title || "RADIO ESCOBAR"}</h3>
        </div>

        <div className="radio-embed-frame radio-embed-frame--clean radio-embed-frame--large">
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
          <a className="cta-button cta-button--image" href={openUrl} target="_blank" rel="noreferrer">
            <span>OPEN SPOTIFY</span>
          </a>
        </div>
      </div>
    </section>
  );
}
