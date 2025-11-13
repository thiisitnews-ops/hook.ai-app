// utils/stripeProducts.ts
export type Plan = {
  id: string;          // local identifier
  name: string;
  priceId: string;     // Stripe Price ID
  amountMonthly: number;
  currency: string;
  description: string;
  thumbnails: number;
  ctaLabel?: string;
};

const stripeProducts: Record<string, Plan> = {
  free_trial: {
    id: "free_trial",
    name: "Free Trial",
    priceId: "", // no Stripe price (free plan handled in-app)
    amountMonthly: 0,
    currency: "usd",
    description: "Try without credit card",
    thumbnails: 5,
    ctaLabel: "Start Free Trial"
  },
  basic: {
    id: "basic",
    name: "Basic",
    // Provided by you:
    priceId: "price_1SNQ9NIu8atC8qcjJ8gp9",
    amountMonthly: 15,
    currency: "usd",
    description: "Small YouTubers, hobbyists — 30 thumbnails / month",
    thumbnails: 30,
    ctaLabel: "Choose Plan"
  },
  pro: {
    id: "pro",
    name: "Pro",
    priceId: "price_1SNQ8eIu8atC8qcjaddSK",
    amountMonthly: 25,
    currency: "usd",
    description: "Frequent creators — 100 thumbnails / month",
    thumbnails: 100,
    ctaLabel: "Choose Plan"
  },
  agency: {
    id: "agency",
    name: "Agency",
    priceId: "price_1SNQ9lIu8atC8qcjoQFf5",
    amountMonthly: 59,
    currency: "usd",
    description: "Agencies — 300 thumbnails / month",
    thumbnails: 300,
    ctaLabel: "Choose Plan"
  }
};

export default stripeProducts;
