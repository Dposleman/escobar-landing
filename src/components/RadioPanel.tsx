import "../styles/RadioPanel.css";

type Props = {
  radio: {
    title: string;
    track: string;
    artist: string;
    embedUrl: string;
  };
};

export function RadioPanel({ radio }: Props) {
  return (
    <section className="radio-panel metal-panel battered-panel js-reveal" id="radio">
      <div className="radio-shell">
        <img src="/ui-kit/radio_player_panel.png" alt="" className="radio-shell-art" />

        <div className="radio-shell-overlay">
          <div className="radio-header">
            <span>RADIO ESCOBAR</span>
            <span className="live">NOW PLAYING LIVE</span>
          </div>

          <div className="radio-screen">
            <img src="/ui-kit/radio_avatar.png" alt="Escobar Radio avatar" className="radio-avatar-image" />

            <div className="radio-copy">
              <strong className="radio-station">{radio.title}</strong>
              <div className="radio-trackline">
                <span className="radio-track">
                  {radio.artist} - {radio.track}
                </span>
              </div>
              <div className="radio-progress">
                <span className="radio-progress-fill" />
              </div>
              <div className="radio-time">
                <span>LIVE</span>
                <span>4:32</span>
              </div>
            </div>
          </div>

          <div className="radio-controls" aria-hidden="true">
            <button type="button">✕</button>
            <button type="button">⏮</button>
            <button type="button" className="is-primary">
              ▶
            </button>
            <button type="button">⏭</button>
            <button type="button">↻</button>
          </div>

          <div className="radio-footer-row">
            <a href="/admin" className="admin-hotspot radio-admin-link">
              ADMIN
            </a>

            {radio.embedUrl ? (
              <a className="radio-listen-link" href={radio.embedUrl} target="_blank" rel="noreferrer">
                MORE EVENTS
              </a>
            ) : (
              <div className="radio-fallback">NO SIGNAL</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
