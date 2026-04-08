import { UI } from "./ui";

export type Lang = keyof typeof UI;

let currentLang: Lang = "da";

export function setLang(lang: Lang) {
  currentLang = lang;
}

export function useLang() {
  return UI[currentLang];
}