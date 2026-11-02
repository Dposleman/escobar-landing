import type { MerchVariant } from "../types";

export type FallbackPhoto = {
  title: string;
  alt: string;
  caption: string;
  image: string;
};

/** Stock placeholders used until real photos are uploaded from the admin panel. */
export const PHOTO_FALLBACKS: FallbackPhoto[] = [
  {
    title: "Crowd Static",
    alt: "Escobar crowd",
    caption: "Motion, noise and scorched orange light.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Turntable Ritual",
    alt: "Escobar vocalist under light",
    caption: "Needle pressure, dust and radio signal.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Backline Static",
    alt: "Backstage guitar and amp",
    caption: "Wood, cable lines and room tone.",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Stage Burn",
    alt: "Escobar live stage",
    caption: "Steel haze, amber glow and live tension.",
    image:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1600&q=80",
  },
];

export const MERCH_FALLBACK_IMAGES: Record<MerchVariant, string> = {
  tee: "/assets/merch/merch-tee.webp",
  mug: "/assets/merch/merch-mug.webp",
  stickers: "/assets/merch/merch-stickers.webp",
  patch: "/assets/merch/merch-patch.webp",
  poster: "/assets/merch/merch-tee.webp",
  vinyl: "/ui-kit/vinyl_record.png",
};

/** True for an image URL worth trying (absolute, root-relative or data URI). */
export function hasUsableImage(value: string | undefined | null): value is string {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 && trimmed !== "#";
}
