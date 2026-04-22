import type { EventItem } from "../types";
import "../styles/final-polish.css";

const FALLBACK_THUMBS = [
  "/ui-kit/event_item_01.png",
  "/ui-kit/event_item_02.png",
  "/ui-kit/event_item_03.png",
  "/ui-kit/event_item_04.png",
];

type Props = {
  events: EventItem[];
};

function formatLocation(event: EventItem) {
  return [event.venue, event.city, event.country].filter(Boolean).join(" • ");
}

export default function EventsPanel({ events }: Props) {
  const publishedEvents = events.filter((event) => event.status === "published");

  return (
    <section className="events-panel metal-panel battered-panel js-reveal" id="events">
      <div className="esc-panel-frame" aria-hidden="true">
        <span className="esc-panel-frame__edge esc-panel-frame__edge--top" />
        <span className="esc-panel-frame__edge esc-panel-frame__edge--right" />
        <span className="esc-panel-frame__edge esc-panel-frame__edge--bottom" />
        <span className="esc-panel-frame__edge esc-panel-frame__edge--left" />
        <span className="esc-panel-frame__divider esc-panel-frame__divider--top" />
        <span className="esc-panel-frame__divider esc-panel-frame__divider--bottom" />
      </div>

      <div className="esc-panel-plaque esc-panel-plaque--center">
        <h3>UPCOMING EVENTS</h3>
      </div>

      <div className="events-list events-list--refined">
        {publishedEvents.map((event, index) => {
          const thumb = event.coverImage?.trim() || FALLBACK_THUMBS[index % FALLBACK_THUMBS.length];

          return (
            <article key={event.id} className="event-row event-row--refined">
              <div className="event-row__thumbWrap">
                <div className="event-row__thumb">
                  <img
                    src={thumb}
                    alt={event.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_THUMBS[index % FALLBACK_THUMBS.length];
                    }}
                  />
                </div>
              </div>

              <div className="event-row__body">
                <div className="event-row__meta">{event.date}</div>
                <h4>{event.title}</h4>
                <div className="event-row__sub">{formatLocation(event)}</div>
                <p>{event.excerpt || "Live signal, amber haze and hard-cut selection through the room."}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
