import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/Vinyl.css";

type Props = {
  bpm?: number;
};

export default function Vinyl({ bpm = 120 }: Props) {
  const vinylRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vinylRef.current) return;

    const duration = 60 / (bpm / 4);

    gsap.to(vinylRef.current, {
      rotate: 360,
      duration,
      ease: "linear",
      repeat: -1,
    });
  }, [bpm]);

  return (
    <div className="vinyl">
      <div className="vinyl__disc" ref={vinylRef} />
      <div className="vinyl__center" />
    </div>
  );
}