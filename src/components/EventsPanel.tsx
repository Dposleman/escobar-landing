import "../styles/final-polish.css";

type EventItem = {
  title: string;
  date: string;
  image?: string;
};

type Props = {
  events: EventItem[];
};

const fallbackImages = [
  "/ui-kit/event_item_01.png",
  "/ui-kit/event_item_02.png",
  "/ui-kit/event_item_03.png",
  "/ui-kit/event_item_04.png",
];

export default function EventsPanel({ events }: Props) {
  return (
    <div className="panel frame-primary events-panel" id="events">
      <div className="panel-header panel-header-image panel-header-events">
        <img src="/ui-kit/section_title.png" alt="Upcoming Events" />
      </div>

      <div className="events-list escobar-events-list">
        {events.map((e, i) => (
          <div key={i} className="event-row escobar-event-row">
            <div className="event-thumb escobar-event-thumb">
              <img src={e.image || fallbackImages[i % fallbackImages.length]} alt={e.title} />
            </div>

            <div className="event-info escobar-event-info">
              <div className="event-title">{e.title}</div>
              <div className="event-date">• {e.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
