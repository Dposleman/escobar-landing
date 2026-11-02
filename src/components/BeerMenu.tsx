import type { VenueState } from "../types";
import { useT } from "../i18n/strings";
import { parseBeerLine } from "../utils/openStatus";

export function BeerMenu({ venue }: { venue: VenueState }) {
  const t = useT();
  const items = venue.beers.map(parseBeerLine).filter((item) => item.name);

  return (
    <section className="esc-panel esc-beer js-reveal" id="beer" aria-labelledby="beer-title">
      <h2 className="esc-beer__title" id="beer-title">
        <span>{t.beerTitle}</span>
      </h2>
      <ul className="esc-beer__list">
        {items.map((item) => (
          <li key={item.name}>
            <div className="esc-beer__name">
              <strong>{item.name}</strong>
              {item.note ? <small>{item.note}</small> : null}
            </div>
            <i aria-hidden="true" />
            <span className="esc-beer__price">{item.price || t.askAtBar}</span>
          </li>
        ))}
      </ul>
      <p className="esc-beer__foot">{venue.beerFootnote || t.beerFoot}</p>
    </section>
  );
}
