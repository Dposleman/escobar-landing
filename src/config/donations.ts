export type DonationOption = {
  id: string;
  label: string;
  amountLabel: string;
  description: string;
  url: string;
};

const env = import.meta.env;

export const donationOptions: DonationOption[] = [
  {
    id: "donation-50",
    label: "Send 50 DKK",
    amountLabel: "50 DKK",
    description: "A small round for the developer.",
    url: env.VITE_REVOLUT_DONATION_50_URL ?? "",
  },
  {
    id: "donation-100",
    label: "Send 100 DKK",
    amountLabel: "100 DKK",
    description: "Fuel the next visual pass.",
    url: env.VITE_REVOLUT_DONATION_100_URL ?? "",
  },
  {
    id: "donation-custom",
    label: "Choose amount",
    amountLabel: "Custom",
    description: "Pick any amount directly in Revolut.",
    url: env.VITE_REVOLUT_DONATION_CUSTOM_URL ?? "",
  },
];
