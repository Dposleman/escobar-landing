export type MerchCategory = {
  id: string;
  label: string;
  danishLabel: string;
  price: number;
  images: string[];
};

const productImages = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, index) => `/assets/merch-collection/${prefix}-${index + 1}.png`);

export const merchCollection: MerchCategory[] = [
  { id: "shirts", label: "T-shirts", danishLabel: "T-shirts", price: 299, images: productImages("shirt", 3) },
  { id: "hoodies", label: "Hoodies", danishLabel: "Hættetrøjer", price: 549, images: productImages("hoodie", 3) },
  { id: "hats", label: "Caps & beanies", danishLabel: "Kasketter & huer", price: 249, images: productImages("hat", 3) },
  { id: "patches", label: "Patches", danishLabel: "Patches", price: 79, images: productImages("patch", 3) },
  { id: "stickers", label: "Stickers", danishLabel: "Stickers", price: 35, images: productImages("sticker", 2) },
];
