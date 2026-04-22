import "../styles/final-polish.css";

type EventItem = {
  title: string;
  date: string;
  coverImage?: string;
};

type Props = {
  events: EventItem[];
};

const EVENT_FALLBACKS = [
  "/ui-kit/event_item_01.png",
  "/ui-kit/event_item_02.png",
  "/ui-kit/event_item_03.png",
  "/ui-kit/event_item_04.png",
];

export default function EventsPanel({ events }: Props) {
  return (
    <section className="events-panel metal-panel battered-panel js-reveal" id="events">
      <div className="section-title section-title-tight">
        <span />
        <h3>UPCOMING EVENTS</h3>
        <span />
      </div>

      <div className="events-list">
        {events.map((event, index) => (
          <article key={`${event.title}-${index}`} className="event-row">
            <div className="event-thumb">
              <img
                src={event.coverImage?.trim() || EVENT_FALLBACKS[index % EVENT_FALLBACKS.length]}
                alt={event.title}
                onError={(e) => {
                  e.currentTarget.src = EVENT_FALLBACKS[index % EVENT_FALLBACKS.length];
                }}
              />
            </div>

            <div className="event-info">
              <div className="event-title">{event.title}</div>
              <div className="event-separator">•</div>
              <div className="event-date">{event.date}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
