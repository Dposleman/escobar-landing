import { Vinyl } from "../types/vinyl";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  vinyl: Vinyl;
}

export const VinylPanel = ({ vinyl }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Rotación continua del vinilo
      gsap.to(".turntable", {
        rotate: 360,
        duration: 4,
        ease: "linear",
        repeat: -1,
      });

      // Glow pulsante (muy sutil, estilo fuego)
      gsap.to(".turntable", {
        filter: "drop-shadow(0 0 12px rgba(255,120,0,0.6))",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="panel vinyl">
      <h3>{vinyl.title}</h3>
      <p>{vinyl.artist}</p>

      <div className="turntable" />
    </div>
  );
};