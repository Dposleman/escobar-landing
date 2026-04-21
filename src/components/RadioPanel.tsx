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
      <div className="radio-header">
        <span>RADIO ESCOBAR</span>
        <span className="live">NOW PLAYING LIVE</span>
      </div>

      <div className="radio-shell radio-shell-visual">
        <img className="radio-shell-art" src="/ui-kit/radio_player_panel.png" alt="Escobar radio player" />

        <div className="radio-live-copy">
          <div className="radio-copy-topline">Escobar Radio</div>
          <strong className="radio-station">{radio.title}</strong>
          <div className="radio-trackline">
            <span className="radio-track">
              {radio.artist} — {radio.track}
            </span>
          </div>
          <div className="radio-progress-wrap">
            <div className="radio-progress">
              <span className="radio-progress-fill" />
            </div>
          </div>
          <div className="radio-time">
            <span>LIVE</span>
            <span>4:32</span>
          </div>
        </div>

        <div className="radio-action-stack">
          <a className="radio-more-button" href="#events">
            MORE EVENTS
          </a>
          <a className="admin-entry admin-entry-radio" href="/admin">
            ADMIN
          </a>
          {radio.embedUrl ? (
            <a className="radio-listen-link" href={radio.embedUrl} target="_blank" rel="noreferrer">
              LISTEN ON SPOTIFY
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
