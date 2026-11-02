import { useLanguage, type Language } from "./langStore";

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

  weekdays: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],
  weekdaysShort: ["søn", "man", "tir", "ons", "tor", "fre", "lør"],
};

export const STRINGS: Record<Language, Strings> = { en, da };

export function useT(): Strings & { lang: Language } {
  const lang = useLanguage();
  return { ...STRINGS[lang], lang };
}
