import { useMemo } from "react";
import type { GalleryImage } from "../types";

const GALLERY_FALLBACKS = [
  {
    title: "Crowd Static",
    alt: "Escobar crowd",
    caption: "Motion, dust and scorched light.",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Turntable Ritual",
    alt: "Escobar back patch jacket",
    caption: "Needle pressure and radio signal.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Venue Signal",
    alt: "Escobar exterior",
    caption: "Amber signage in the dark.",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Stage Burn",
    alt: "Escobar live stage",
    caption: "Steel haze, amber glow and live tension.",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=1200&q=80",
  },
];

type GalleryPanelProps = {
  images: GalleryImage[];
  variant?: "section" | "feature";
};

function buildTiles(images: GalleryImage[]) {
  const published = images.filter((image) => image.status === "published");
  const source = published.length > 0 ? published : [];

  return Array.from({ length: 4 }, (_, index) => {
    const item = source[index] || source[index % Math.max(source.length, 1)] || ({} as GalleryImage);
    const fallback = GALLERY_FALLBACKS[index % GALLERY_FALLBACKS.length];
    return {
      id: item.id || `gallery-fallback-${index}`,
      image: item.image?.trim() || fallback.image,
      alt: item.alt?.trim() || fallback.alt,
      title: item.title?.trim() || fallback.title,
      caption: item.caption?.trim() || fallback.caption,
    };
  });
}

export function GalleryPanel({ images, variant = "section" }: GalleryPanelProps) {
  const tiles = useMemo(() => buildTiles(images), [images]);

  return (
    <section className={`gallery-panel gallery-panel--${variant} metal-panel battered-panel js-reveal`} id="gallery">
      <div className="esc-panel-frame" aria-hidden="true">
        <span className="esc-panel-frame__edge esc-panel-frame__edge--top" />
        <span className="esc-panel-frame__edge esc-panel-frame__edge--right" />
        <span className="esc-panel-frame__edge esc-panel-frame__edge--bottom" />
        <span className="esc-panel-frame__edge esc-panel-frame__edge--left" />
        <span className="esc-panel-frame__divider esc-panel-frame__divider--top" />
        <span className="esc-panel-frame__divider esc-panel-frame__divider--bottom" />
      </div>

      <div className="esc-panel-plaque esc-panel-plaque--center">
        <h3>GALLERY / NEWS</h3>
      </div>

      <div className="gallery-grid gallery-grid--refined">
        {tiles.map((tile) => (
          <article key={tile.id} className="gallery-tile">
            <div className="gallery-tile__media">
              <img src={tile.image} alt={tile.alt} loading="lazy" />
            </div>
          </article>
        ))}
      </div>

      <div className="gallery-actions">
        <a className="cta-button" href="#news">
          <span>VIEW ALL NEWS</span>
        </a>
      </div>
    </section>
  );
}
