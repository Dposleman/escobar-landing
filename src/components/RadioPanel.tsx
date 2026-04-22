import "../styles/RadioPanel.css";

type Props = {
  radio: {
    title: string;
    subtitle: string;
    track: string;
    artist: string;
    duration: string;
    embedUrl: string;
    coverImage: string;
  };
};

export function RadioPanel({ radio }: Props) {
  return (
    <section className="radio-panel metal-panel battered-panel js-reveal" id="radio">
      <div className="radio-shell">
        <img src="/ui-kit/radio_player_panel.png" alt="" className="radio-shell-art" />

        <div className="radio-shell-overlay">
          <div className="radio-header">
            <span>{radio.title || "RADIO ESCOBAR"}</span>
            <span className="live">{radio.subtitle || "NOW PLAYING LIVE"}</span>
          </div>

          <div className="radio-screen radio-screen-embed">
            <div className="radio-embed-mask">
              {radio.embedUrl ? (
                <iframe
                  title="Escobar Spotify Radio"
                  src={radio.embedUrl}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                />
              ) : (
                <div className="radio-fallback-state">
                  <img src={radio.coverImage} alt={radio.artist} className="radio-avatar-image" />
                  <div className="radio-copy">
                    <strong className="radio-station">{radio.title}</strong>
                    <div className="radio-trackline">
                      <span className="radio-track">
                        {radio.artist} - {radio.track}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="radio-footer-row radio-footer-row-right">
            <a className="radio-listen-link" href="#events">
              MORE EVENTS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
