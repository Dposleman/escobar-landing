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

export default function EventsPanel({ events }: Props) {
  const publishedEvents = events.filter((event) => event.status === "published");

  return (
    <section className="events-panel metal-panel battered-panel js-reveal" id="events">
      <div className="section-title section-title--events">
        <span />
        <h3>UPCOMING EVENTS</h3>
        <span />
      </div>

      <div className="events-list">
        {publishedEvents.map((event, index) => {
          const thumb = event.coverImage?.trim() || FALLBACK_THUMBS[index % FALLBACK_THUMBS.length];

          return (
            <article key={event.id} className="event-row">
              <div className="event-thumb">
                <img
                  src={thumb}
                  alt={event.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_THUMBS[index % FALLBACK_THUMBS.length];
                  }}
                />
              </div>

              <div className="event-info">
                <div className="event-title">{event.title}</div>
                <div className="event-separator">•</div>
                <div className="event-date">{event.date}</div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
