import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Vinyl.css";

export default function Vinyl() {
  const vinylRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vinylRef.current) return;

    gsap.to(vinylRef.current, {
      rotate: 360,
      duration: 6,
      ease: "linear",
      repeat: -1,
    });
  }, []);

  return (
    <div className="vinyl">
      <div className="vinyl__disc" ref={vinylRef} />
      <div className="vinyl__center" />
    </div>
  );
}