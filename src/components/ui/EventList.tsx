import MetalPanel from "./ui/MetalPanel";

export default function EventList() {
  const events = [
    "Metal Karaoke Night — May 10",
    "Vinyl Rock Night — May 18",
    "Danish Underground Bands — June 1",
    "Halloween Metal Party — Oct 31",
  ];

  return (
    <MetalPanel>
      <h2 className="orange-glow">UPCOMING EVENTS</h2>

      <div className="separator" />

      {events.map((e, i) => (
        <p key={i} style={{ marginBottom: 10 }}>{e}</p>
      ))}
    </MetalPanel>
  );
}