import type { Vinyl } from "../types/vinyl";
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
      gsap.to(".turntable", {
        rotate: 360,
        duration: 4,
        ease: "linear",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      gsap.to(".turntable", {
        boxShadow: "0 0 0 1px rgba(255,120,0,0.18), 0 0 52px rgba(255,106,0,0.18), inset 0 0 40px rgba(255,255,255,0.04)",
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="panel vinyl">
      <div>
        <h3>Vinyl</h3>
        <h4>{vinyl.title}</h4>
        <p>{vinyl.artist}</p>
      </div>

      <div className="turntable" />
    </div>
  );
};