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
  // One per line: "image path | alt text | width/height ratio". A line without a path renders as a text sticker.
  membership: { open: false, priceLabel: "", checkoutUrl: "" },
  texts: {},
  stickersRev: 2,
  stickers: [
    "/assets/stickers/katla.webp | Katla, Scandinavian Pain | 1.79",
    "/assets/stickers/avarice.webp | Avarice, Perpetual Ruin | 0.99",
    "/assets/stickers/chc-bones.webp | CHC crossed bones | 1.00",
    "/assets/stickers/svn.webp | SVN | 1.00",
    "/assets/stickers/heroes-2-none.webp | Heroes 2 None, Aarhus street punk | 3.38",
    "/assets/stickers/luftens-helte.webp | Luftens Helte | 0.99",
    "/assets/stickers/dancy-daughters.webp | Dancy & Daughters | 0.96",
    "/assets/stickers/nvlvs-blueprint.webp | NVLVS | 2.02",
    "/assets/stickers/ceekalt.webp | Ceekalt, Faceless Man | 1.01",
    "/assets/stickers/red-metal-logo.webp | Red metal logo | 1.89",
    "/assets/stickers/snegle.webp | Snegle (@snegleband) | 1.00",
    "/assets/stickers/farlige-typer.webp | Farlige Typer | 0.98",
    "/assets/stickers/hudsult.webp | Hudsult | 1.55",
    "/assets/stickers/sots-dkhc.webp | SOTS DKHC | 0.98",
    "/assets/stickers/nvlvs-red.webp | NVLVS | 2.57",
    "/assets/stickers/situationsfornaermelse.webp | Situationsfornaermelse | 1.38",
    "/assets/stickers/den-tunge-radio.webp | Den Tunge Radio | 0.97",
  ],


};
