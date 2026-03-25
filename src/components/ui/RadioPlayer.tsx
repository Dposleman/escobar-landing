import MetalPanel from "./ui/MetalPanel";

export default function RadioPlayer() {
  return (
    <MetalPanel>
      <h3 className="orange-glow">RADIO ESCOBAR</h3>

      <p>Now Playing</p>
      <h4>Motörhead - Ace of Spades</h4>

      <div className="separator" />

      <div style={{ display: "flex", gap: 10 }}>
        <button>⏮</button>
        <button>▶</button>
        <button>⏭</button>
      </div>
    </MetalPanel>
  );
}