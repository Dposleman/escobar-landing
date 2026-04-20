import { useCms } from "../hooks/useCms";
import { EventsPanel } from "../components/EventsPanel";

export default function Events() {
  const { state } = useCms();

  return <EventsPanel events={state.events} />;
}
