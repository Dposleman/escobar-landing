import type { VenueState } from "../types";

/**
 * Starting values taken from public directories (Spiseguiden Aarhus, VisitAarhus).
 * They are editable from /admin > VENUE and should be confirmed by the bar.
 */
export const defaultVenue: VenueState = {
  name: "Escobar",
  address: "Skolegade 32",
  postcode: "8000",
  city: "Aarhus C",
  phone: "+45 86 13 79 26",
  email: "dio.escobar.aarhus@gmail.com",
  instagram: "https://www.instagram.com/escobar_aarhus",
  facebook: "https://www.facebook.com/escobaraarhus",
  timezone: "Europe/Copenhagen",
  hours: [
    { open: "18:00", close: "02:00" }, // Sunday
    null, // Monday
    { open: "18:00", close: "02:00" },
    { open: "18:00", close: "02:00" },
    { open: "18:00", close: "02:00" },
    { open: "14:00", close: "04:00" }, // Friday
    { open: "14:00", close: "04:00" }, // Saturday
  ],
  closures: [],
  happyHour: {
    enabled: true,
    title: "Happy hour",
    text: "Draft beer on the cheap",
    price: "25 kr",
    days: [5, 6],
    from: "14:00",
    to: "18:00",
  },
  beers: [
    "Ceres Top | 40 kr | Large, on tap",
    "Thy Pilsner | | On tap",
    "Thy IPA | | On tap",
    "Guld Porse | | On tap",
    "Limfjordsporter | | On tap",
    "Craft beer | | From small breweries, ask at the bar",
    "Bottles | from 28 kr |",
    "Drinks & cocktails | 45-126 kr | About 20 on the list",
  ],
  beerFootnote: "No food, just loud music and cold beer.",
  stickers: [
    "666.ROCK",
    "HAIL ESCOBAR",
    "NO FOOD · ONLY BEER",
    "AARHUS HEAVY",
    "LOUD & PROUD",
    "SKOLEGADE 32",
    "STAY HEAVY",
    "RIFFS NOT RULES",
    "SUPPORT LOCAL METAL",
    "COLD BEER",
  ],
};
