import MetalPanel from "./ui/MetalPanel";
import ButtonMetal from "./ui/ButtonMetal";

export default function MerchGrid() {
  return (
    <MetalPanel>
      <h2 className="orange-glow">ESCOBAR MERCH</h2>

      <div className="separator" />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 20
      }}>
        <div>TEE</div>
        <div>MUG</div>
        <div>STICKERS</div>
        <div>PATCH</div>
      </div>

      <div style={{ marginTop: 20 }}>
        <ButtonMetal>SHOP MERCH</ButtonMetal>
      </div>
    </MetalPanel>
  );
}