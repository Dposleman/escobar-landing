import type { EventItem } from "../types";
import "../styles/final-polish.css";

const FALLBACK_THUMBS = [
  "/ui-kit-clean/event_item_01.png",
  "/ui-kit-clean/event_item_02.png",
  "/ui-kit-clean/event_item_03.png",
  "/ui-kit-clean/event_item_04.png",
];

type Props = {
  events: EventItem[];
};

function buildEventMeta(event: EventItem) {
  const place = [event.venue, event.city, event.country].filter(Boolean).join(" • ");
  return place || "Escobar • Aarhus • Denmark";
}

export default function EventsPanel({ events }: Props) {
  const publishedEvents = events.filter((event) => event.status === "published");

  return (
    <section className="events-panel metal-panel battered-panel js-reveal" id="events">
      <div className="escobar-panel-frame" aria-hidden="true">
        <span className="escobar-chain escobar-chain--top" />
        <span className="escobar-chain escobar-chain--right" />
        <span className="escobar-chain escobar-chain--bottom" />
        <span className="escobar-chain escobar-chain--left" />
      </div>

      <div className="escobar-panel-divider escobar-panel-divider--top" aria-hidden="true" />

      <div className="escobar-panel-title">
        <span>UPCOMING EVENTS</span>
      </div>

      <div className="events-list events-list--editorial">
        {publishedEvents.map((event, index) => {
          const thumb = event.coverImage?.trim() || FALLBACK_THUMBS[index % FALLBACK_THUMBS.length];

          return (
            <article key={event.id} className="event-row event-row--editorial">
              <div className="event-row-frame" aria-hidden="true" />

              <div className="event-thumb event-thumb--editorial">
                <img
                  src={thumb}
                  alt={event.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_THUMBS[index % FALLBACK_THUMBS.length];
                  }}
                />
              </div>

              <div className="event-copy">
                <div className="event-kicker">{event.date}</div>
                <h4 className="event-title event-title--editorial">{event.title}</h4>
                <div className="event-meta-line">{buildEventMeta(event)}</div>
                <p className="event-excerpt-line">{event.excerpt}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
