import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../styles/Needle.css";

type Props = {
  isPlaying?: boolean;
};

export default function Needle({ isPlaying = true }: Props) {
  const needleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!needleRef.current) return;

    gsap.to(needleRef.current, {
      rotate: isPlaying ? 18 : 0,
      transformOrigin: "top left",
      duration: 1.2,
      ease: "power2.out",
    });
  }, [isPlaying]);

  return (
    <div className="needle" ref={needleRef}>
      <div className="needle-arm" />
      <div className="needle-head" />
    </div>
  );
}