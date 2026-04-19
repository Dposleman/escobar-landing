export const renderAssets = {
  background: {
    metalBase: "/textures/aaa/background-wall-reference.png",
    metalDetail: "/textures/aaa/metal-detail.png",
    grime: "/textures/aaa/grime-map.png",
    noise: "/textures/aaa/noise.png",
    scratches: "/textures/aaa/scratches.png",
    smoke: "/textures/aaa/smoke-haze.png",
    vignette: "/textures/aaa/vignette.png",
  },
  glow: {
    top: "/textures/aaa/glow-top.png",
    mid: "/textures/aaa/glow-mid.png",
    bottom: "/textures/aaa/glow-bottom.png",
  },
  embers: {
    top: "/textures/aaa/embers-top.png",
    bottom: "/textures/aaa/embers-bottom.png",
    full: "/textures/aaa/embers-full.png",
  },
  frame: {
    overlay: "/textures/aaa/frame-overlay.png",
  },
} as const;

export type RenderAssets = typeof renderAssets;
