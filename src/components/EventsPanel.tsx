import type { EventItem } from "../types";
import "../styles/final-polish.css";

const REAL_EVENT_THUMBS = [
  "/ui-kit-clean/event_item_01.png",
  "/ui-kit-clean/event_item_02.png",
  "/ui-kit-clean/event_item_03.png",
  "/ui-kit-clean/event_item_04.png",
];

function resolveThumb(coverImage: string | undefined, index: number) {
  const trimmed = coverImage?.trim() ?? "";
  if (!trimmed) return REAL_EVENT_THUMBS[index % REAL_EVENT_THUMBS.length];
  return trimmed;
}

type Props = {
  events: EventItem[];
};

export default function EventsPanel({ events }: Props) {
  const publishedEvents = events.filter((event) => event.status === "published");

  return (
    <section className="events-panel metal-panel battered-panel js-reveal" id="events">
      <div className="panel-chain-frame" aria-hidden="true">
        <span className="panel-chain-frame__edge panel-chain-frame__edge--top" />
        <span className="panel-chain-frame__edge panel-chain-frame__edge--bottom" />
        <span className="panel-chain-frame__edge panel-chain-frame__edge--left" />
        <span className="panel-chain-frame__edge panel-chain-frame__edge--right" />
        <span className="panel-chain-frame__divider panel-chain-frame__divider--top" />
        <span className="panel-chain-frame__divider panel-chain-frame__divider--bottom" />
      </div>

      <div className="section-title section-title--events section-title--floating">
        <span />
        <h3>UPCOMING EVENTS</h3>
        <span />
      </div>

      <div className="events-list events-list--surgical">
        {publishedEvents.map((event, index) => {
          const thumb = resolveThumb(event.coverImage, index);

          return (
            <article key={event.id} className="event-row event-row--surgical">
              <div className="event-row-frame" aria-hidden="true">
                <span className="event-row-frame__chain event-row-frame__chain--top" />
                <span className="event-row-frame__chain event-row-frame__chain--bottom" />
              </div>

              <div className="event-thumb event-thumb--surgical">
                <img
                  src={thumb}
                  alt={event.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = REAL_EVENT_THUMBS[index % REAL_EVENT_THUMBS.length];
                  }}
                />
              </div>

              <div className="event-info event-info--surgical">
                <div className="event-kicker">{event.date}</div>
                <h4 className="event-title event-title--surgical">{event.title}</h4>
                <div className="event-meta event-meta--surgical">
                  <span>{event.venue}</span>
                  <span>•</span>
                  <span>{event.city}</span>
                  <span>•</span>
                  <span>{event.country}</span>
                </div>
                <p className="event-excerpt">{event.excerpt}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
