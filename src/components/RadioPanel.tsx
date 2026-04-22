import "../styles/RadioPanel.css";

type Props = {
  radio: {
    title: string;
    subtitle: string;
    track: string;
    artist: string;
    album: string;
    coverImage: string;
    duration: string;
    progress: number;
    embedUrl: string;
    spotifyUrl: string;
  };
};

export function RadioPanel({ radio }: Props) {
  const progressWidth = `${Math.max(6, Math.min(100, radio.progress || 0))}%`;

  return (
    <section className="radio-panel metal-panel battered-panel js-reveal" id="radio">
      <div className="radio-shell">
        <div className="radio-shell-overlay">
          <div className="radio-header">
            <span>RADIO ESCOBAR</span>
            <span className="live">NOW PLAYING LIVE</span>
          </div>

          <div className="radio-spotify-frame">
            <div className="radio-screen">
              <img
                src={radio.coverImage || "/ui-kit/radio_avatar.png"}
                alt={radio.track}
                className="radio-avatar-image"
              />

              <div className="radio-copy">
                <strong className="radio-station">{radio.title}</strong>
                <div className="radio-trackline">
                  <span className="radio-track">
                    {radio.artist} · {radio.track}
                  </span>
                </div>
                <div className="radio-trackline radio-trackline-muted">{radio.album}</div>
                <div className="radio-progress">
                  <span className="radio-progress-fill" style={{ width: progressWidth }} />
                </div>
                <div className="radio-time">
                  <span>LIVE</span>
                  <span>{radio.duration}</span>
                </div>
              </div>
            </div>

            <div className="radio-embed-shell">
              {radio.embedUrl ? (
                <iframe
                  title="Escobar Spotify Radio"
                  src={radio.embedUrl}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              ) : (
                <div className="radio-fallback">NO SPOTIFY SIGNAL</div>
              )}
            </div>
          </div>

          <div className="radio-footer-row">
            <a
              className="radio-listen-link"
              href={radio.spotifyUrl || "#radio"}
              target={radio.spotifyUrl ? "_blank" : undefined}
              rel={radio.spotifyUrl ? "noreferrer" : undefined}
            >
              OPEN ON SPOTIFY
            </a>

            <a className="radio-listen-link radio-listen-link-secondary" href="#events">
              MORE EVENTS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
