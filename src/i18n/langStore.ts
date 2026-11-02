import { useSyncExternalStore } from "react";

export type Language = "en" | "da";

const STORAGE_KEY = "escobar-lang";
const listeners = new Set<() => void>();

function detect(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "da") return saved;
  } catch {
    /* storage can be blocked */
  }
  return (navigator.language || "").toLowerCase().startsWith("da") ? "da" : "en";
}

let current: Language = detect();

if (typeof document !== "undefined") document.documentElement.lang = current;

export function setLanguage(next: Language) {
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore */
  }
  if (typeof document !== "undefined") document.documentElement.lang = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useLanguage(): Language {
  return useSyncExternalStore(subscribe, () => current, () => "en" as Language);
}
