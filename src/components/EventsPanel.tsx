import type { EventItem } from "../types";
import { PHOTO_FALLBACKS, hasUsableImage } from "../data/landingFallbacks";

/** The old UI-kit strips are too small to use as thumbnails. */
function resolveThumb(event: EventItem, index: number) {
  const cover = event.coverImage?.trim() ?? "";
  if (hasUsableImage(cover) && !cover.includes("/ui-kit")) return cover;
  return PHOTO_FALLBACKS[index % PHOTO_FALLBACKS.length].image;
}

function hasTicketLink(url: string | undefined) {
  const trimmed = url?.trim() ?? "";
  return trimmed.length > 0 && trimmed !== "#";
}

type Props = {
  events: EventItem[];
};

export default function EventsPanel({ events }: Props) {
  const published = events.filter((event) => event.status === "published");
  const thumbs = published.slice(0, 2);

  return (
    <section className="esc-section esc-events js-reveal" id="events">
      <h2 className="esc-title">
        <span>Upcoming Events</span>
      </h2>

      {published.length === 0 ? (
        <p className="esc-empty">New dates are being locked in. Check back soon.</p>
      ) : (
        <div className="esc-events__board">
          <div className="esc-events__thumbs">
            {thumbs.map((event, index) => (
              <figure className="esc-frame esc-events__thumb" key={event.id}>
                <img
                  src={resolveThumb(event, index)}
                  alt={event.title}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const fallback = PHOTO_FALLBACKS[index % PHOTO_FALLBACKS.length].image;
                    if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                  }}
                />
              </figure>
            ))}
          </div>

          <ul className="esc-events__list">
            {published.map((event) => {
              const details = [event.venue, event.city].filter(Boolean).join(", ");
              const title = hasTicketLink(event.ticketUrl) ? (
                <a href={event.ticketUrl} target="_blank" rel="noreferrer">
                  {event.title}
                </a>
              ) : (
                event.title
              );

              return (
                <li key={event.id} className="esc-events__row" title={details || undefined}>
                  <span className="esc-events__dot" aria-hidden="true">•</span>
                  <strong className="esc-events__name">{title}</strong>
                  <span className="esc-events__dot" aria-hidden="true">•</span>
                  <span className="esc-events__date">{event.date}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
