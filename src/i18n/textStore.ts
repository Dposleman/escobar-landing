import { useSyncExternalStore } from "react";

type Overrides = Record<string, string>;

const EMPTY: Overrides = {};
let overrides: Overrides = EMPTY;
const listeners = new Set<() => void>();

/** Texts the owner rewrote in the admin panel, keyed "<lang>.<string key>". */
export function setTextOverrides(next: Overrides | undefined) {
  const value = next ?? EMPTY;
  if (JSON.stringify(value) === JSON.stringify(overrides)) return;
  overrides = value;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useTextOverrides(): Overrides {
  return useSyncExternalStore(subscribe, () => overrides, () => EMPTY);
}
