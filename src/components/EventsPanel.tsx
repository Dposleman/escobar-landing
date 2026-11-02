import type { EventItem } from "../types";
import { PHOTO_FALLBACKS, hasUsableImage } from "../data/landingFallbacks";
import { useT } from "../i18n/strings";
import { useNow } from "../hooks/useNow";

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

const SIX_HOURS = 6 * 60 * 60 * 1000;

function isPast(event: EventItem, now: number) {
  const end = Date.parse(event.endsAt || "");
  if (Number.isFinite(end)) return end < now;
  const start = Date.parse(event.startsAt || "");
  return Number.isFinite(start) ? start + SIX_HOURS < now : false;
}

type Props = {
  events: EventItem[];
};

export default function EventsPanel({ events }: Props) {
  const t = useT();
  const now = useNow(60_000).getTime();
  const all = events.filter((event) => event.status === "published");
  // Past dates drop off by themselves. If nothing is upcoming, the latest ones stay, marked as past.
  const upcoming = all.filter((event) => !isPast(event, now));
  const published = upcoming.length > 0 ? upcoming : all;
  const thumbs = published.slice(0, 2);

  return (
    <section className="esc-section esc-events js-reveal" id="events">
      <h2 className="esc-title">
        <span>{t.upcomingEvents}</span>
      </h2>

      {published.length === 0 ? (
        <p className="esc-empty">{t.noEvents}</p>
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
                <li
                  key={event.id}
                  className={`esc-events__row${isPast(event, now) ? " is-past" : ""}`}
                  title={details || undefined}
                >
                  <span className="esc-events__dot" aria-hidden="true">•</span>
                  <strong className="esc-events__name">{title}</strong>
                  <span className="esc-events__dot" aria-hidden="true">•</span>
                  <span className="esc-events__date">
                    {event.date}
                    {isPast(event, now) ? <em className="esc-events__past">{t.pastEvent}</em> : null}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
