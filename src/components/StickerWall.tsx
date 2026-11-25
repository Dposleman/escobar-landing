import type { VenueState } from "../types";
import { useT } from "../i18n/strings";

const TILTS = [-5, 3, -2, 5, -4, 2, -3, 4, -6, 1];
const SCALES = [1.08, 0.95, 1, 1.04, 0.92, 1.1, 0.97, 1.02, 0.94, 1.06];
const BASE = 185; // width of a square sticker, in px
const SHAPES = ["rect", "round", "tag", "rect", "round"] as const;

function parse(line: string) {
  const [first = "", alt = "", ratio = ""] = line.split("|").map((part) => part.trim());
  const isImage = first.startsWith("/") || /^https?:\/\//.test(first);
  const aspect = Number(ratio) > 0 ? Number(ratio) : 1;
  return isImage ? { src: first, alt, aspect } : { text: line.trim() };
}

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
        {venue.stickers.map((line, index) => {
          const sticker = parse(line);
          const style = { transform: `rotate(${TILTS[index % TILTS.length]}deg)` };
          if (sticker.src) {
            return (
              <li
                key={`${sticker.src}-${index}`}
                className={`esc-sticker-img${sticker.aspect > 1.8 ? " is-wide" : ""}`}
                // Same visual weight for every shape: width grows with the square root of the aspect ratio.
                style={{ ...style, width: Math.round(BASE * Math.sqrt(sticker.aspect) * SCALES[index % SCALES.length]) }}
              >
                <img src={sticker.src} alt={sticker.alt} loading="lazy" decoding="async" />
              </li>
            );
          }
          return (
            <li
              key={`${sticker.text}-${index}`}
              className={`esc-sticker esc-sticker--${SHAPES[index % SHAPES.length]} esc-sticker--c${index % 4}`}
              style={style}
            >
              {sticker.text}
            </li>
          );
        })}
      </ul>

      <a className="esc-btn esc-btn--wide" href={`mailto:${venue.email}?subject=${subject}`}>
        {t.stickersCta}
      </a>
    </section>
  );
}
