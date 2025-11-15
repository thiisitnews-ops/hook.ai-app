import React, { useState } from "react";

interface Plan {
  name: string;
  price: string;
  priceId: string;
  thumbnails: string;
  bestFor: string;
  features: string[];
}

export const PricingSection: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      name: "Free Trial",
      price: "0",
      priceId: "free",
      thumbnails: "15 thumbnails",
      bestFor: "Trying without credit card",
      features: [
        "Watermarked thumbnails",
        "HD upscaling",
        "Basic background removal",
        "Try without credit card",
      ],
    },
    {
      name: "Basic",
      price: "15",
      priceId: "price_1SNQ9NIu8atC8qcjJ8gp98A3",
      thumbnails: "30 thumbnails",
      bestFor: "Small YouTubers",
      features: [
        "HD thumbnail generation",
        "Background removal",
        "HD upscaling",
        "AI style suggestions",
      ],
    },
    {
      name: "Pro",
      price: "25",
      priceId: "price_1SNQ8eIu8atC8qcjaddSKFNG",
      thumbnails: "80 thumbnails",
      bestFor: "Growing channels",
      features: [
        "Everything in Basic",
        "Faster processing",
        "Priority rendering",
        "Smart face enhancement",
      ],
    },
    {
      name: "Agency",
      price: "59",
      priceId: "price_1SNQ9lIu8atC8qcjoQFf5WtA",
      thumbnails: "Unlimited thumbnails",
      bestFor: "Agencies / teams",
      features: ["Unlimited generations", "No watermark", "Team access", "API access"],
    },
  ];

  const handleCheckout = async (priceId: string) => {
    if (priceId === "free") {
      alert("Free trial activated — No payment needed!");
      return;
    }

    setLoading(priceId);

    try {
      // CORRECTED ENDPOINT
      const res = await fetch("/api/checkout", { ... })

        method: "POST",
        headers: { "Content-Type": "application/json" }
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout failed.");
      }
    } catch (err) {
      console.error("Stripe error:", err);
      alert("Error connecting to Stripe.");
    }

    setLoading(null);
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <h2 className="text-center text-4xl font-bold mb-12">Choose Your Plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="p-6 border border-gray-700 rounded-2xl bg-gray-800 shadow-lg hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-gray-300 mb-3">{plan.bestFor}</p>

            <p className="text-4xl font-extrabold mb-4">
              ${plan.price}
              <span className="text-lg font-normal text-gray-400"> /month</span>
            </p>

            <ul className="space-y-2 mb-6 text-gray-300">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center">
                  <span className="ml-2">{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(plan.priceId)}
              disabled={loading === plan.priceId}
              className={`mt-6 w-full py-3 rounded-lg font-semibold transition 
                ${plan.priceId === "free"
                  ? "bg-gray-600 hover:bg-gray-500"
                  : "bg-cyan-600 hover:bg-cyan-700"
                } disabled:opacity-50`}
            >
              {loading === plan.priceId ? "Processing..." : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};