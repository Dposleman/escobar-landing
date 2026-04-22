import { useMemo } from "react";
import type { GalleryImage } from "../types";

type GalleryPanelProps = {
  images: GalleryImage[];
  variant?: "section" | "feature";
};

const GALLERY_FALLBACKS = [
  {
    title: "Crowd Static",
    alt: "Escobar crowd",
    caption: "Motion, noise and scorched orange light.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Leather Signal",
    alt: "Escobar leather jacket",
    caption: "Back patch, worn texture and heavy atmosphere.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Street Front",
    alt: "Escobar exterior",
    caption: "Exterior light, rough facade and midnight glow.",
    image:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Stage Burn",
    alt: "Escobar live stage",
    caption: "Steel haze, amber glow and live tension.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=80",
  },
];

function buildTiles(images: GalleryImage[]) {
  const published = images.filter((image) => image.status === "published");
  const source = published.length > 0 ? published : [];

  return Array.from({ length: 4 }, (_, index) => {
    const item = source[index];
    const fallback = GALLERY_FALLBACKS[index % GALLERY_FALLBACKS.length];

    if (!item) {
      return {
        id: `gallery-fallback-${index}`,
        title: fallback.title,
        alt: fallback.alt,
        caption: fallback.caption,
        galleryName: "Escobar Archive",
        image: fallback.image,
      };
    }

    return {
      id: item.id,
      title: item.title?.trim() || fallback.title,
      alt: item.alt?.trim() || fallback.alt,
      caption: item.caption?.trim() || fallback.caption,
      galleryName: item.galleryName?.trim() || "Escobar Archive",
      image: item.image?.trim() || fallback.image,
    };
  });
}

export function GalleryPanel({ images, variant = "section" }: GalleryPanelProps) {
  const tiles = useMemo(() => buildTiles(images), [images]);
  const panelClassName = `gallery-panel gallery-panel--${variant} metal-panel battered-panel js-reveal`;

  return (
    <section className={panelClassName} id="gallery">
      <div className="section-title section-title--boxed">
        <h3>GALLERY / NEWS</h3>
      </div>

      <div className="gallery-grid">
        {tiles.map((tile, index) => (
          <article key={tile.id} className="gallery-tile">
            <img
              className="gallery-tile-image"
              src={tile.image}
              alt={tile.alt}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = GALLERY_FALLBACKS[index % GALLERY_FALLBACKS.length].image;
              }}
            />
          </article>
        ))}
      </div>

      <div className="gallery-actions">
        <a className="cta-button cta-button--compact" href="#news">
          <span>VIEW ALL NEWS</span>
        </a>
      </div>
    </section>
  );
}
