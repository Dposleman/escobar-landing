import { useEffect } from "react";
import { createEmbers } from "../utils/embers";

export default function ParticlesEngine() {
  useEffect(() => {
    createEmbers();
  }, []);

  return <canvas id="embers-canvas" />;
}