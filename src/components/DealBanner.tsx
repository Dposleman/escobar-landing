import type { VenueState } from "../types";
import { useT } from "../i18n/strings";
import { formatMinutes, getHappyHourStatus } from "../utils/openStatus";
import { useNow } from "../hooks/useNow";

export function DealBanner({ venue }: { venue: VenueState }) {
  const t = useT();
  const now = useNow();
  const happy = venue.happyHour;
  const status = getHappyHourStatus(happy, venue, now);
  if (!status.enabled) return null;

  let line: string;
  if (status.active) {
    line = t.dealUntil(happy.price, status.until, formatMinutes(status.minutesLeft));
  } else {
    const day =
      status.dayOffset === 0 ? t.today : status.dayOffset === 1 ? t.tomorrow : t.weekdays[status.weekday];
    line = t.dealNext(`${day} ${status.from}`);
  }

  return (
    <aside className={`esc-deal ${status.active ? "is-live" : ""}`} aria-label={happy.title}>
      <span className="esc-deal__tag">{happy.title}</span>
      <span className="esc-deal__text">{happy.text}</span>
      <strong className="esc-deal__price">{line}</strong>
    </aside>
  );
}
