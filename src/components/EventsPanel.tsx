import "../styles/final-polish.css";

type EventItem = {
  title: string;
  date: string;
  coverImage?: string;
};

type Props = {
  events: EventItem[];
};

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
          <article key={index} className="event-row">
            <div className="event-thumb">
              {event.coverImage && <img src={event.coverImage} alt={event.title} />}
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
