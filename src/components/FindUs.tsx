import type { VenueState } from "../types";
import { useT } from "../i18n/strings";

export function FindUs({ venue }: { venue: VenueState }) {
  const t = useT();
  const query = encodeURIComponent(`${venue.name} ${venue.address} ${venue.postcode} ${venue.city}`);
  const phoneHref = `tel:${venue.phone.replace(/[^+\d]/g, "")}`;
  // Monday-first order reads more naturally in Denmark.
  const order = [1, 2, 3, 4, 5, 6, 0];

  return (
    <section className="esc-panel esc-find js-reveal" id="find" aria-labelledby="find-title">
      <h2 className="esc-beer__title" id="find-title">
        <span>{t.findTitle}</span>
      </h2>

      <div className="esc-find__grid">
        <div className="esc-find__info">
          <dl>
            <dt>{t.address}</dt>
            <dd>
              {venue.address}, {venue.postcode} {venue.city}
            </dd>
            <dt>{t.phone}</dt>
            <dd>
              <a href={phoneHref}>{venue.phone}</a>
            </dd>
            <dt>{t.email}</dt>
            <dd>
              <a href={`mailto:${venue.email}`}>{venue.email}</a>
            </dd>
          </dl>

          <h3>{t.hours}</h3>
          <ul className="esc-find__hours">
            {order.map((day) => {
              const hours = venue.hours[day];
              return (
                <li key={day}>
                  <span>{t.weekdays[day]}</span>
                  <b>{hours ? `${hours.open} – ${hours.close}` : t.closedDay}</b>
                </li>
              );
            })}
          </ul>

          <div className="esc-find__actions">
            <a
              className="esc-btn esc-btn--small"
              href={`https://www.google.com/maps/dir/?api=1&destination=${query}`}
              target="_blank"
              rel="noreferrer"
            >
              {t.directions}
              <span className="esc-btn__arrow" aria-hidden="true">▸</span>
            </a>
            {venue.instagram ? (
              <a className="esc-btn esc-btn--small" href={venue.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            ) : null}
            {venue.facebook ? (
              <a className="esc-btn esc-btn--small" href={venue.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
            ) : null}
          </div>
        </div>

        <div className="esc-find__map esc-frame">
          <iframe
            title={`${venue.name} map`}
            src={`https://maps.google.com/maps?q=${query}&z=16&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
