import "../styles/final-polish.css";

type EventItem = {
  title: string;
  date: string;
  image?: string;
};

type Props = {
  events: EventItem[];
};

export default function EventsPanel({ events }: Props) {
  return (
    <div className="panel frame-primary events-panel">
      <div className="panel-header">
        <h2>UPCOMING EVENTS</h2>
      </div>

      <div className="events-list">
        {events.map((e, i) => (
          <div key={i} className="event-row">
            <div className="event-thumb">
              {e.image && <img src={e.image} alt={e.title} />}
            </div>

            <div className="event-info">
              <div className="event-title">{e.title}</div>
              <div className="event-date">{e.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}