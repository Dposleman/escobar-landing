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

    const turntable = ref.current.querySelector<HTMLElement>(".turntable");
    if (!turntable) return;

    const ctx = gsap.context(() => {
      gsap.to(turntable, {
        rotate: 360,
        duration: 4,
        ease: "linear",
        repeat: -1,
        transformOrigin: "50% 50%",
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