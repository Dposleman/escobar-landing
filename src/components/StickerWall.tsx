import type { VenueState } from "../types";
import { useT } from "../i18n/strings";

const TILTS = [-4, 3, -2, 5, -6, 2, -3, 4, -5, 1];
const SHAPES = ["rect", "round", "tag", "rect", "round"] as const;

export function StickerWall({ venue }: { venue: VenueState }) {
  const t = useT();
  const subject = encodeURIComponent("Sticker for the Escobar wall");

  return (
    <section className="esc-section esc-stickers js-reveal" id="stickers">
      <h2 className="esc-title">
        <span>{t.stickersTitle}</span>
      </h2>
      <p className="esc-lead">{t.stickersIntro}</p>

      <ul className="esc-stickers__wall">
        {venue.stickers.map((label, index) => (
          <li
            key={`${label}-${index}`}
            className={`esc-sticker esc-sticker--${SHAPES[index % SHAPES.length]} esc-sticker--c${index % 4}`}
            style={{ transform: `rotate(${TILTS[index % TILTS.length]}deg)` }}
          >
            {label}
          </li>
        ))}
      </ul>

      <a className="esc-btn esc-btn--wide" href={`mailto:${venue.email}?subject=${subject}`}>
        {t.stickersCta}
      </a>
    </section>
  );
}
