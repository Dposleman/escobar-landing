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
  const cover = vinyl.cover && vinyl.cover !== "/fallback.jpg" ? vinyl.cover : "/ui-kit/vinyl_cover.png";

  return (
    <section className="vinyl-panel metal-panel battered-panel js-reveal" id="vinyl">
      <header className="feature-panel-title">
        <span />
        <h2>VINYL OF THE NIGHT</h2>
        <span />
      </header>

      <div className="vinyl-panel__layout">
        <div className="vinyl-panel__copy">
          <span className="vinyl-panel__eyebrow">Tonight&apos;s featured release</span>
          <h3>{vinyl.artist}</h3>
          <h4>{vinyl.title}</h4>
          <div className="vinyl-panel__meta">
            <p>Released 1970</p>
            <p>Playing tonight at Escobar</p>
          </div>
        </div>

        <div className="vinyl-stage">
          <div className="vinyl-stage-ambient" aria-hidden="true" />
          <img className="vinyl-turntable-image" src="/ui-kit/turntable.png" alt="Turntable" />
          <img className="vinyl-record-image" src="/ui-kit/vinyl_record.png" alt="Vinyl record" />
          <div className="vinyl-cover-frame">
            <img src={cover} alt={`${vinyl.artist} cover`} className="vinyl-cover-art" />
          </div>
          <a className="admin-entry admin-entry-vinyl" href="/admin">
            ADMIN
          </a>
        </div>
      </div>
    </section>
  );
}
