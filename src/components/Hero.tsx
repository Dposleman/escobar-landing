import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  title: string;
  subtitle: string;
  tagline: string;
}

export const Hero = ({ title, subtitle, tagline }: Props) => {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero__crest, .hero__brand, .hero__status, .hero__url",
        { opacity: 0, y: -18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".hero__meta h2, .hero__meta p",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          delay: 0.12,
          ease: "power3.out",
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={ref} className="hero shell">
      <div className="hero__topline">
        <div className="hero__crest">
          <span className="hero__crest-core">✦</span>
        </div>

        <div className="hero__brand-wrap">
          <div className="hero__brand frame-panel">
            <span className="hero__brand-ring" />
            <h1 className="hero__brand-title">{title}</h1>
          </div>

          <div className="hero__meta">
            <h2>{subtitle}</h2>
            <p>{tagline}</p>
          </div>
        </div>

        <div className="hero__status">
          <div className="hero__status-label">IS ESCOBAR BUSY?</div>
          <div className="hero__status-label">IS ESCOBAR THIS RAW?</div>
          <div className="hero__status-count">327</div>
        </div>

        <div className="hero__url">666.rock</div>
      </div>
    </header>
  );
};