export type Plan = {
  id: string;
  name: string;
  priceId: string;
  amountMonthly: number;
  currency: string;
  description: string;
  thumbnails: number;
  ctaLabel?: string;
};

const stripeProducts: Record<string, Plan> = {
  basic: {
    id: "basic",
    name: "Basic",
    priceId: "price_1SNQ9NIu8atC8qcjJ8gp98A3",
    amountMonthly: 15,
    currency: "usd",
    description: "For small creators — 30 thumbnails / month",
    thumbnails: 30,
    ctaLabel: "Choose Plan"
  },
  pro: {
    id: "pro",
    name: "Pro",
    priceId: "price_1SNQ8eIu8atC8qcjaddSKFNG",
    amountMonthly: 25,
    currency: "usd",
    description: "For consistent creators — 100 thumbnails / month",
    thumbnails: 100,
    ctaLabel: "Choose Plan"
  },
  agency: {
    id: "agency",
    name: "Agency",
    priceId: "price_1SNQ9lIu8atC8qcjoQFf5WtA",
    amountMonthly: 59,
    currency: "usd",
    description: "For agencies — 300 thumbnails / month",
    thumbnails: 300,
    ctaLabel: "Choose Plan"
  },
};

export default stripeProducts;
