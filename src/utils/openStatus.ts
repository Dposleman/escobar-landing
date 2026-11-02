import type { HappyHour, OpeningHours, VenueState } from "../types";

const WEEKDAYS: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

type Clock = { weekday: number; minutes: number; date: string };

export function getClock(timezone: string, now: Date): Clock {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone,
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now);
    const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
    return {
      weekday: WEEKDAYS[get("weekday")] ?? 0,
      minutes: Number(get("hour")) * 60 + Number(get("minute")),
      date: `${get("year")}-${get("month")}-${get("day")}`,
    };
  } catch {
    return { weekday: now.getDay(), minutes: now.getHours() * 60 + now.getMinutes(), date: now.toISOString().slice(0, 10) };
  }
}

export function toMinutes(value: string): number {
  const [h, m] = value.split(":").map(Number);
  return (Number.isFinite(h) ? h : 0) * 60 + (Number.isFinite(m) ? m : 0);
}

function addDays(date: string, days: number): string {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export type OpenStatus =
  | { isOpen: true; closesAt: string }
  | { isOpen: false; opensAt: string | null; dayOffset: number; weekday: number };

function validHours(hours: OpeningHours | null | undefined): hours is OpeningHours {
  return Boolean(hours && hours.open && hours.close);
}

export function getOpenStatus(venue: VenueState, now: Date = new Date()): OpenStatus {
  const clock = getClock(venue.timezone, now);
  const closed = new Set(venue.closures);

  // Yesterday's late session can still be running (e.g. Fri 14:00-04:00 at 01:00 on Saturday).
  const yesterday = venue.hours[(clock.weekday + 6) % 7];
  if (validHours(yesterday) && !closed.has(addDays(clock.date, -1))) {
    const open = toMinutes(yesterday.open);
    const close = toMinutes(yesterday.close);
    if (close <= open && clock.minutes < close) return { isOpen: true, closesAt: yesterday.close };
  }

  const today = venue.hours[clock.weekday];
  if (validHours(today) && !closed.has(clock.date)) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (close > open ? clock.minutes >= open && clock.minutes < close : clock.minutes >= open) {
      return { isOpen: true, closesAt: today.close };
    }
  }

  for (let offset = 0; offset <= 7; offset += 1) {
    const weekday = (clock.weekday + offset) % 7;
    const hours = venue.hours[weekday];
    if (!validHours(hours) || closed.has(addDays(clock.date, offset))) continue;
    if (offset === 0 && toMinutes(hours.open) <= clock.minutes) continue;
    return { isOpen: false, opensAt: hours.open, dayOffset: offset, weekday };
  }

  return { isOpen: false, opensAt: null, dayOffset: 0, weekday: clock.weekday };
}

export type HappyHourStatus =
  | { enabled: false }
  | { enabled: true; active: true; minutesLeft: number; until: string }
  | { enabled: true; active: false; dayOffset: number; weekday: number; from: string };

export function getHappyHourStatus(
  happy: HappyHour,
  venue: VenueState,
  now: Date = new Date()
): HappyHourStatus {
  if (!happy.enabled || happy.days.length === 0) return { enabled: false };
  const clock = getClock(venue.timezone, now);
  const from = toMinutes(happy.from);
  const to = toMinutes(happy.to);

  if (happy.days.includes(clock.weekday) && !venue.closures.includes(clock.date)) {
    if (clock.minutes >= from && clock.minutes < to) {
      return { enabled: true, active: true, minutesLeft: to - clock.minutes, until: happy.to };
    }
  }

  for (let offset = 0; offset <= 7; offset += 1) {
    const weekday = (clock.weekday + offset) % 7;
    if (!happy.days.includes(weekday) || venue.closures.includes(addDays(clock.date, offset))) continue;
    if (offset === 0 && from <= clock.minutes) continue;
    return { enabled: true, active: false, dayOffset: offset, weekday, from: happy.from };
  }
  return { enabled: false };
}

export function formatMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h > 0 ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m`;
}

export function parseBeerLine(line: string): { name: string; price: string; note: string } {
  const [name = "", price = "", ...rest] = line.split("|").map((part) => part.trim());
  return { name, price, note: rest.join(" | ") };
}
