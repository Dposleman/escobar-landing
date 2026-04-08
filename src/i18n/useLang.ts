import { UI } from "./ui";

export type Lang = "en" | "da";

let currentLang: Lang = "en";

export function setLang(lang: Lang) {
  currentLang = lang;
}

export function useLang() {
  return UI[currentLang];
}