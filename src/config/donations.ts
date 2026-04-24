export type DonationTierId = "50" | "100" | "custom";

export type DonationTier = {
  id: DonationTierId;
  amountLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  url: string;
};

const env = import.meta.env;

export const donationTiers: DonationTier[] = [
  {
    id: "50",
    amountLabel: "50 DKK",
    eyebrow: "Quick spark",
    title: "Buy one round of caffeine",
    description: "A small hit of fuel for late-night fixes, hosting polish and dirty little UI details.",
    ctaLabel: "Donate 50 DKK",
    url: env.VITE_REVOLUT_DONATION_50_URL ?? "",
  },
  {
    id: "100",
    amountLabel: "100 DKK",
    eyebrow: "Heavy fuel",
    title: "Back the next upgrade",
    description: "Keeps the site mean, alive and evolving with better visuals, music, content and CMS work.",
    ctaLabel: "Donate 100 DKK",
    url: env.VITE_REVOLUT_DONATION_100_URL ?? "",
  },
  {
    id: "custom",
    amountLabel: "Custom",
    eyebrow: "Your call",
    title: "Choose your own amount",
    description: "Set any amount through Revolut Business and feed the dev exactly how much you want.",
    ctaLabel: "Choose amount",
    url: env.VITE_REVOLUT_DONATION_CUSTOM_URL ?? "",
  },
];

export const hasDonationLinks = donationTiers.some((tier) => tier.url.trim().length > 0);
