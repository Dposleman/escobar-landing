import { useMemo } from "react";
import { useLanguage, type Language } from "./langStore";
import { useTextOverrides } from "./textStore";

const en = {
  navHome: "Home",
  navRadio: "Radio Escobar",
  navEvents: "Events",
  navMerch: "Merch Store",
  navContact: "Contact",
  navLabel: "Primary",
  langLabel: "Language",

  location: "AARHUS • DENMARK",
  tagline: "ROCK • METAL • BEER • COMMUNITY",

  isOpen: "Is Escobar open?",
  open: "OPEN",
  closed: "CLOSED",
  closesAt: (time: string) => `until ${time}`,
  opensToday: (time: string) => `opens today ${time}`,
  opensTomorrow: (time: string) => `opens tomorrow ${time}`,
  opensOn: (day: string, time: string) => `opens ${day} ${time}`,
  closedNoHours: "check back soon",

  vinyl: "Vinyl of the Night",
  nowSpinning: "Now spinning",
  paused: "Paused",
  onTheDeck: "On the deck",
  playingTonight: "Playing tonight at Escobar",
  nowPlayingLive: "Now playing live",
  moreEvents: "More events",
  openInSpotify: "Open in Spotify",

  upcomingEvents: "Upcoming Events",
  pastEvent: "Past",
  noEvents: "New dates are being locked in. Check back soon.",
  gallery: "Photo Gallery",
  merchTitle: "Escobar Merch Store",
  shopMerch: "Shop merch",

  dealUntil: (price: string, until: string, left: string) => `${price} · until ${until} · ${left} left`,
  dealNext: (when: string) => `Next: ${when}`,
  today: "today",
  tomorrow: "tomorrow",

  requestTitle: "Tell the DJ",
  requestIntro: "Want to hear something? Send a song or an artist to the booth.",
  requestSong: "Song or artist",
  requestName: "Your name (optional)",
  requestSend: "Send request",

  beerTitle: "On Tap & Behind the Bar",
  beerFoot: "Prices can change. Ask at the bar.",
  askAtBar: "ask at the bar",

  findTitle: "Find Us",
  address: "Address",
  phone: "Phone",
  email: "Email",
  hours: "Opening hours",
  directions: "Get directions",
  closedDay: "Closed",
  followUs: "Follow",

  stickersTitle: "Sticker Wall",
  stickersIntro: "Our walls are covered in stickers. Got one? Slap it on, or send us yours.",
  stickersCta: "Send us your sticker",

  gigTitle: "Book a Gig",
  gigIntro: "Playing heavy music? Tell us about your band.",
  bandName: "Band name",
  genre: "Genre",
  link: "Bandcamp / Spotify / YouTube link",
  yourEmail: "Your email",
  message: "Message",
  sendBand: "Send to Escobar",

  newsletterTitle: "Join the Pit",
  newsletterIntro: "One email when there is a night worth coming to. No spam.",
  consent: "I agree that Escobar can email me about events.",
  subscribe: "Subscribe",

  sending: "Sending…",
  sent: "Sent. Thanks!",
  fallbackNote: "The form is offline right now. We opened your email app instead.",
  errorGeneric: "Could not send. Please try again.",
  required: "Please fill in the required fields.",

  bbKicker: "Coming soon",
  bbTitle: "Escobarbarians",
  bbIntro: "Join the Escobar family. A monthly membership is on its way, with exclusive benefits and gifts for the people who keep the place loud.",
  bbBenefit1: "Exclusive member-only gifts",
  bbBenefit2: "First access to events and merch drops",
  bbBenefit3: "A place in the Escobar family",
  bbJoin: "Become an Escobarbarian",
  bbRole: "Escobarbarian",
  newsScopeLabel: "Show shows in",
  newsScopeDk: "DK",
  newsScopeAarhus: "AARHUS",
  newsPinned: "Don't miss",
  newsUpcoming: (place: string) => `Upcoming metal & rock in ${place}`,
  newsPlaceDk: "Denmark",
  newsPlaceAarhus: "Aarhus",
  newsLoading: "Loading shows…",
  newsEmpty: "No shows listed right now. Check back soon.",
  newsError: "Could not load the listings. Try again in a bit.",
  newsTickets: "Tickets",
  newsMore: "More info",
  newsVia: "Listings via Ticketmaster",
  castKicker: "Coming soon",
  castTitle: "EscoCast",
  castIntro: "The Escobar podcast. Stories, guests and noise straight from the bar. We hit record soon.",

  weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

type Strings = typeof en;

const da: Strings = {
  navHome: "Hjem",
  navRadio: "Radio Escobar",
  navEvents: "Events",
  navMerch: "Merch",
  navContact: "Kontakt",
  navLabel: "Hovedmenu",
  langLabel: "Sprog",

  location: "AARHUS • DANMARK",
  tagline: "ROCK • METAL • ØL • FÆLLESSKAB",

  isOpen: "Har Escobar åbent?",
  open: "ÅBENT",
  closed: "LUKKET",
  closesAt: (time) => `til ${time}`,
  opensToday: (time) => `åbner i dag ${time}`,
  opensTomorrow: (time) => `åbner i morgen ${time}`,
  opensOn: (day, time) => `åbner ${day} ${time}`,
  closedNoHours: "kig forbi snart",

  vinyl: "Aftenens vinyl",
  nowSpinning: "Spiller nu",
  paused: "På pause",
  onTheDeck: "På pladespilleren",
  playingTonight: "Spiller i aften på Escobar",
  nowPlayingLive: "Spiller live nu",
  moreEvents: "Flere events",
  openInSpotify: "Åbn i Spotify",

  upcomingEvents: "Kommende events",
  pastEvent: "Afholdt",
  noEvents: "Nye datoer er på vej. Kig forbi igen snart.",
  gallery: "Fotogalleri",
  merchTitle: "Escobar Merch",
  shopMerch: "Se merch",

  dealUntil: (price, until, left) => `${price} · til ${until} · ${left} tilbage`,
  dealNext: (when) => `Næste: ${when}`,
  today: "i dag",
  tomorrow: "i morgen",

  requestTitle: "Sig det til DJ'en",
  requestIntro: "Vil du høre noget bestemt? Send en sang eller en kunstner til båsen.",
  requestSong: "Sang eller kunstner",
  requestName: "Dit navn (valgfrit)",
  requestSend: "Send ønske",

  beerTitle: "På hanen og bag baren",
  beerFoot: "Priser kan ændre sig. Spørg i baren.",
  askAtBar: "spørg i baren",

  findTitle: "Find os",
  address: "Adresse",
  phone: "Telefon",
  email: "E-mail",
  hours: "Åbningstider",
  directions: "Vis vej",
  closedDay: "Lukket",
  followUs: "Følg",

  stickersTitle: "Klistermærkevæggen",
  stickersIntro: "Vores vægge er dækket af klistermærker. Har du et? Sæt det op, eller send os dit.",
  stickersCta: "Send os dit klistermærke",

  gigTitle: "Book en koncert",
  gigIntro: "Spiller du tung musik? Fortæl os om dit band.",
  bandName: "Bandnavn",
  genre: "Genre",
  link: "Bandcamp / Spotify / YouTube-link",
  yourEmail: "Din e-mail",
  message: "Besked",
  sendBand: "Send til Escobar",

  newsletterTitle: "Kom med i pitten",
  newsletterIntro: "Én mail, når der er en aften værd at komme til. Ingen spam.",
  consent: "Jeg accepterer, at Escobar må sende mig mails om events.",
  subscribe: "Tilmeld",

  sending: "Sender…",
  sent: "Sendt. Tak!",
  fallbackNote: "Formularen er offline lige nu. Vi åbnede din mailapp i stedet.",
  errorGeneric: "Kunne ikke sendes. Prøv igen.",
  required: "Udfyld de påkrævede felter.",

  bbKicker: "Kommer snart",
  bbTitle: "Escobarbarians",
  bbIntro: "Bliv en del af Escobar-familien. Et månedligt medlemskab er på vej med eksklusive fordele og gaver til dem, der holder stedet højt.",
  bbBenefit1: "Eksklusive gaver kun til medlemmer",
  bbBenefit2: "Først adgang til events og merch-drops",
  bbBenefit3: "En plads i Escobar-familien",
  bbJoin: "Bliv en Escobarbarian",
  bbRole: "Escobarbarian",
  newsScopeLabel: "Vis koncerter i",
  newsScopeDk: "DK",
  newsScopeAarhus: "AARHUS",
  newsPinned: "Gå ikke glip af",
  newsUpcoming: (place: string) => `Kommende metal og rock i ${place}`,
  newsPlaceDk: "Danmark",
  newsPlaceAarhus: "Aarhus",
  newsLoading: "Henter koncerter…",
  newsEmpty: "Ingen koncerter på listen lige nu. Kig forbi igen snart.",
  newsError: "Kunne ikke hente listen. Prøv igen om lidt.",
  newsTickets: "Billetter",
  newsMore: "Læs mere",
  newsVia: "Koncertliste via Ticketmaster",
  castKicker: "Kommer snart",
  castTitle: "EscoCast",
  castIntro: "Escobars podcast. Historier, gæster og larm direkte fra baren. Vi trykker snart på optag.",

  weekdays: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],
  weekdaysShort: ["søn", "man", "tir", "ons", "tor", "fre", "lør"],
};

export const STRINGS: Record<Language, Strings> = { en, da };

/** Plain-text strings the owner can rewrite from the admin panel. */
export const EDITABLE_TEXT_KEYS = (Object.keys(en) as Array<keyof Strings>).filter(
  (key) => typeof en[key] === "string" && key !== "navLabel" && key !== "langLabel"
) as string[];

export function textOverrideKey(lang: Language, key: string) {
  return `${lang}.${key}`;
}

export function useT(): Strings & { lang: Language } {
  const lang = useLanguage();
  const overrides = useTextOverrides();
  return useMemo(() => {
    const merged: Record<string, unknown> = { ...STRINGS[lang] };
    for (const key of EDITABLE_TEXT_KEYS) {
      const custom = overrides[textOverrideKey(lang, key)];
      if (custom && custom.trim()) merged[key] = custom;
    }
    return { ...(merged as Strings), lang };
  }, [lang, overrides]);
}
