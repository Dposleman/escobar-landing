import Hero from "../sections/Hero";
import Events from "../sections/Events";
import Merch from "../sections/Merch";

export default function Home() {
  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: "0 auto" }}>
      <Hero />
      <Events />
      <Merch />
    </div>
  );
}