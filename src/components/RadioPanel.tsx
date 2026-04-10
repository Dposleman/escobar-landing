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
    <div className="radio-panel">
      <div className="radio-header">
        <span>RADIO ESCOBAR</span>
        <span className="live">NOW PLAYING</span>
      </div>

      <div className="radio-player">
        {radio.embedUrl ? (
          <iframe
            src={radio.embedUrl}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        ) : (
          <div className="radio-fallback">NO SIGNAL</div>
        )}
      </div>

      <div className="radio-meta">
        <div className="radio-track">{radio.track}</div>
        <div className="radio-artist">{radio.artist}</div>
      </div>
    </div>
  );
}