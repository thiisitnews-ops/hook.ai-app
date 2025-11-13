export const PRICING_PLANS = [
  {
    name: "Starter",
    price: "0",
    bestFor: "Individuals testing the app",
    features: ["Basic tools", "1 project", "Community support"],
    priceId: "price_1STARTER123", // ← your Stripe Starter price ID
  },
  {
    name: "Pro",
    price: "19",
    bestFor: "Creators and small teams",
    features: ["Advanced tools", "5 projects", "Priority support"],
    priceId: "price_1PRO12345", // ← your Stripe Pro price ID
  },
  {
    name: "Agency",
    price: "49",
    bestFor: "Businesses and agencies",
    features: ["All features", "Unlimited projects", "Dedicated support"],
    priceId: "price_1AGENCY123", // ← your Stripe Agency price ID
  },
];
