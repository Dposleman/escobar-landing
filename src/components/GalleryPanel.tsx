import { useMemo } from "react";
import type { GalleryImage } from "../types";

const GALLERY_FALLBACKS = [
  {
    title: "Crowd Static",
    alt: "Escobar crowd",
    caption: "Motion, smoke and scorched amber air.",
    image: "/ui-kit-clean/event_item_03.png",
  },
  {
    title: "Back Patch",
    alt: "Escobar jacket",
    caption: "Leather, thread and club insignia.",
    image: "/ui-kit/merch_patch.png",
  },
  {
    title: "Facade Signal",
    alt: "Escobar facade",
    caption: "Street-level glow and heavy frontage.",
    image: "/ui-kit/logo_text.png",
  },
  {
    title: "Stage Burn",
    alt: "Escobar live stage",
    caption: "Volume peak in a room of fire.",
    image: "/ui-kit-clean/event_item_04.png",
  },
];

type GalleryPanelProps = {
  images: GalleryImage[];
  variant?: "section" | "feature";
};

function buildCards(images: GalleryImage[]) {
  const published = images.filter((image) => image.status === "published");
  const source = published.length > 0 ? published : [];

  return Array.from({ length: 4 }, (_, index) => {
    const item = source[index];
    const fallback = GALLERY_FALLBACKS[index % GALLERY_FALLBACKS.length];

    return {
      id: item?.id || `gallery-fallback-${index}`,
      title: item?.title?.trim() || fallback.title,
      caption: item?.caption?.trim() || fallback.caption,
      alt: item?.alt?.trim() || fallback.alt,
      image: item?.image?.trim() || fallback.image,
    };
  });
}

export function GalleryPanel({ images, variant = "section" }: GalleryPanelProps) {
  const cards = useMemo(() => buildCards(images), [images]);
  const panelClassName = `gallery-panel gallery-panel--${variant} metal-panel battered-panel js-reveal`;

  return (
    <section className={panelClassName} id="gallery">
      <div className="escobar-panel-frame" aria-hidden="true">
        <span className="escobar-chain escobar-chain--top" />
        <span className="escobar-chain escobar-chain--right" />
        <span className="escobar-chain escobar-chain--bottom" />
        <span className="escobar-chain escobar-chain--left" />
      </div>

      <div className="escobar-panel-divider escobar-panel-divider--top" aria-hidden="true" />

      <div className="escobar-panel-title">
        <span>GALLERY / NEWS</span>
      </div>

      <div className="gallery-grid gallery-grid--showcase">
        {cards.map((card) => (
          <article key={card.id} className="gallery-card gallery-card--showcase">
            <div className="gallery-card-frame" aria-hidden="true" />
            <img
              className="gallery-card-image"
              src={card.image}
              alt={card.alt}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/ui-kit-clean/event_item_01.png";
              }}
            />
          </article>
        ))}
      </div>

      <div className="merch-actions">
        <a className="cta-button" href="#news">
          <span>VIEW ALL NEWS</span>
        </a>
      </div>
    </section>
  );
}
