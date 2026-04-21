import "../styles/VinylPanel.css";

type Props = {
  vinyl: {
    title: string;
    artist: string;
    cover: string;
    bpm?: number;
  };
};

export function VinylPanel({ vinyl }: Props) {
  return (
    <section className="vinyl-panel metal-panel battered-panel js-reveal" id="vinyl">
      <header className="feature-panel-title vinyl-title-row">
        <span />
        <h2>VINYL OF THE NIGHT</h2>
        <span />
      </header>

      <div className="vinyl-panel__layout">
        <div className="vinyl-panel__copy">
          <h3>{vinyl.artist}</h3>
          <h4>{vinyl.title}</h4>
          <div className="vinyl-panel__meta">
            <p>Released 1970</p>
            <p>Playing tonight at Escobar</p>
          </div>

          <a href="/admin" className="admin-hotspot vinyl-admin-link">
            ADMIN
          </a>
        </div>

        <div className="vinyl-stage">
          <img src="/ui-kit/vinyl_cover.png" alt={`${vinyl.artist} cover`} className="vinyl-cover-art" />
          <img src="/ui-kit/turntable.png" alt="Turntable" className="turntable-art" />
          <img src="/ui-kit/vinyl_record.png" alt="Vinyl record" className="vinyl-record-art" />
        </div>
      </div>
    </section>
  );
}
