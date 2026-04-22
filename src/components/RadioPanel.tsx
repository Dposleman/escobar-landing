import type { RadioState } from "../types";
import "../styles/RadioPanel.css";

type Props = {
  radio: RadioState;
};

export function RadioPanel({ radio }: Props) {
  const coverImage =
    radio.nowPlaying?.coverImage?.trim() ||
    radio.fallbackCoverImage?.trim() ||
    "/ui-kit/vinyl_cover.png";

  const spotifyUrl = radio.spotifyUrl?.trim() || radio.externalUrl?.trim() || "#radio";
  const artist = radio.nowPlaying?.artist?.trim() || "Escobar Radio";
  const track = radio.nowPlaying?.track?.trim() || "Live selection";
  const album = radio.nowPlaying?.album?.trim() || "Spotify signal";
  const duration = radio.nowPlaying?.duration?.trim() || "LIVE";
  const progress = Math.max(8, Math.min(100, radio.nowPlaying?.progress ?? 62));

  return (
    <section className="radio-panel metal-panel battered-panel js-reveal" id="radio">
      <div className="radio-shell-overlay radio-shell-overlay--clean">
        <div className="radio-header">
          <span>{radio.title || "RADIO ESCOBAR"}</span>
          <span className="live">{radio.subtitle || "NOW PLAYING LIVE"}</span>
        </div>

        <div className="radio-player-card">
          <div className="radio-player-card-glow" aria-hidden="true" />

          <div className="radio-art-wrap">
            <img src={coverImage} alt={track} className="radio-avatar-image radio-avatar-image--cover" />
            <div className="radio-source-badge">SPOTIFY SOURCE</div>
          </div>

          <div className="radio-copy radio-copy--card">
            <strong className="radio-station">{artist}</strong>
            <div className="radio-trackline">
              <span className="radio-track">{track}</span>
            </div>
            <div className="radio-album">{album}</div>

            <div className="radio-progress">
              <span className="radio-progress-fill" style={{ width: `${progress}%` }} />
            </div>

            <div className="radio-time">
              <span>{radio.isLive ? "LIVE" : "OFFLINE"}</span>
              <span>{duration}</span>
            </div>

            <div className="radio-controls" aria-hidden="true">
              <button type="button">⏮</button>
              <button type="button" className="is-primary">▶</button>
              <button type="button">⏭</button>
            </div>
          </div>
        </div>

        <div className="radio-footer-row radio-footer-row--actions">
          <a className="cta-button cta-button--secondary" href={spotifyUrl} target="_blank" rel="noreferrer">
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
