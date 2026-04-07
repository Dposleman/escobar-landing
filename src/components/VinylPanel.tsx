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

    const record = ref.current.querySelector<HTMLElement>(".turntable__record");
    const light = ref.current.querySelector<HTMLElement>(".turntable__light");

    if (!record || !light) return;

    const ctx = gsap.context(() => {
      gsap.to(record, {
        rotate: 360,
        duration: 4.8,
        ease: "linear",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      gsap.to(light, {
        opacity: 1,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="panel frame-panel vinyl-panel">
      <div className="panel-heading">
        <span className="panel-heading__line" />
        <h3>Vinyl of the Night</h3>
        <span className="panel-heading__line" />
      </div>

      <div className="vinyl-panel__body">
        <div className="vinyl-panel__copy">
          <h4>{vinyl.artist}</h4>
          <div className="vinyl-panel__accent">{vinyl.title}</div>
          <p>Released 1970</p>
          <span>Playing tonight at Escobar</span>
        </div>

        <div className="vinyl-panel__cover frame-inset">
          <div className="vinyl-panel__cover-title">{vinyl.artist}</div>
          <div className="vinyl-panel__cover-subtitle">{vinyl.title}</div>
          <div className="vinyl-panel__cover-art" />
        </div>
      </div>

      <div className="turntable">
        <div className="turntable__base" />
        <div className="turntable__record">
          <div className="turntable__record-center" />
        </div>
        <div className="turntable__arm" />
        <div className="turntable__light" />
      </div>
    </div>
  );
};