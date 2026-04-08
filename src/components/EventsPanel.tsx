
type EventStatus = "upcoming" | "live" | "ended";

interface Event {
  date: string;
  title: string;
  description: string;
  location: string;
  city: string;
  status: EventStatus;
}

const statusMap: Record<EventStatus, string> = {
  upcoming: "COMING SOON",
  live: "LIVE",
  ended: "ENDED",
};

const events: Event[] = [
  {
    date: "Friday, May 10",
    title: "Metal Karaoke Night",
    description: "Riffs, smoke and late-night signal pressure.",
    location: "Escobar Main Hall",
    city: "Aarhus · Denmark",
    status: "upcoming",
  },
  {
    date: "Saturday, May 18",
    title: "Vinyl Rock Night",
    description: "Needle dust, amber glow and hard-cut selection.",
    location: "Escobar Radio Room",
    city: "Aarhus · Denmark",
    status: "live",
  },
  {
    date: "June 1",
    title: "Danish Underground Bands",
    description: "Dark room showcase with raw local sound.",
    location: "Escobar Main Hall",
    city: "Aarhus · Denmark",
    status: "live",
  },
  {
    date: "Thursday, October 31",
    title: "Halloween Metal Party",
    description: "Full grunge decor, heavy set and burn-orange light.",
    location: "Escobar Main Hall",
    city: "Aarhus · Denmark",
    status: "live",
  },
];

export default function EventsPanel() {
  return (
    <section className="events-panel">
      <div className="events-grid">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <div className="event-image">
              <span className="event-status">
                {statusMap[event.status]}
              </span>
            </div>

            <div className="event-content">
              <div className="event-date">{event.date}</div>
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>

              <div className="event-footer">
                <span>{event.location}</span>
                <span>{event.city}</span>
              </div>

              <div className="event-actions">
                <button className="btn-primary">Open</button>
                <button className="btn-secondary">Gallery</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}