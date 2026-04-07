import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export const useGSAP = () => {
  const scope = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {}, scope);
    return () => ctx.revert();
  }, []);

  return scope;
};