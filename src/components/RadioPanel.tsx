import "../styles/RadioPanel.css";

type Props = {
  radio: {
    title: string;
    track: string;
    artist: string;
    embedUrl: string;
  };
};

const EQ_BARS = [0, 1, 2, 3, 4, 5, 6];

export function RadioPanel({ radio }: Props) {
  return (
    <section className="radio-panel metal-panel battered-panel js-reveal" id="radio">
      <div className="radio-header">
        <span>RADIO ESCOBAR</span>
        <span className="live">NOW PLAYING LIVE</span>
      </div>

      <div className="radio-shell">
        <div className="radio-screen">
          <div className="radio-cover" aria-hidden="true">
            <div className="radio-cover-skull">
              <span className="skull-eye skull-eye-left" />
              <span className="skull-eye skull-eye-right" />
              <span className="skull-nose" />
              <span className="skull-jaw" />
            </div>
          </div>

          <div className="radio-copy">
            <strong>{radio.title}</strong>
            <div className="radio-trackline">
              {radio.artist} - {radio.track}
            </div>

            <div className="radio-eq" aria-hidden="true">
              {EQ_BARS.map((bar) => (
                <span
                  key={bar}
                  className="radio-eq-bar"
                  style={{ ["--bar-index" as string]: bar } as React.CSSProperties}
                />
              ))}
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

        <div className="radio-footer">
          <div className="radio-preview-strip" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          {radio.embedUrl ? (
            <a className="radio-listen-link" href={radio.embedUrl} target="_blank" rel="noreferrer">
              LISTEN ON SPOTIFY
            </a>
          ) : (
            <div className="radio-fallback">NO SIGNAL</div>
          )}
        </div>
      </div>
    </section>
  );
}