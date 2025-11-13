import React, { useState } from "react";

export const PricingSection: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // Plans shown on your page
  const plans = [
    {
      name: "Free Trial",
      price: "0",
      thumbnails: "5 thumbnails",
      bestFor: "New users, casual creators",
      features: [
        "Watermarked thumbnails",
        "HD upscaling",
        "Basic background removal",
        "Try without credit card",
      ],
      priceId: "free", // no Stripe checkout
    },
    {
      name: "Basic",
      price: "15",
      thumbnails: "30 thumbnails",
      bestFor: "Small YouTubers, hobbyists",
      features: [
        "HD thumbnail generation",
        "Background removal",
        "HD upscaling",
        "AI style suggestions",
        "Limited batch processing",
      ],
      priceId: "price_basic_xxxxx", // 👈 replace with your Stripe Price ID
    },
    {
      name: "Pro",
      price: "25",
      thumbnails: "100 thumbnails",
      bestFor: "Frequent creators, influencers",
      features: [
        "4K thumbnail generation",
        "Advanced background removal",
        "4K upscaling",
        "AI style variations",
        "Batch uploads",
        "Priority support",
      ],
      priceId: "price_pro_xxxxx", // 👈 replace with your Stripe Price ID
    },
    {
      name: "Agency",
      price: "59",
      thumbnails: "300 thumbnails",
      bestFor: "Agencies, studios, multi-channel editors",
      features: [
        "4K+ thumbnail generation",
        "Unlimited style variations",
        "Full batch uploads",
        "Multi-seat / team access",
        "API access & white label",
        "Priority support",
      ],
      priceId: "price_agency_xxxxx", // 👈 replace with your Stripe Price ID
    },
  ];

  // --- Stripe Checkout handler ---
  const handleCheckout = async (priceId: string) => {
    if (priceId === "free") {
      alert("Free trial activated — no payment needed!");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Checkout failed. Please try again.");
    } catch (err) {
      console.error("Stripe error:", err);
      alert("Error connecting to Stripe.");
    } finally {
      setLoading(false);
    }
  };

  // --- UI ---
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold sm:text-5xl">Pricing</h2>
        <p className="mt-4 text-lg text-gray-400">
          Choose a plan that fits your needs
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-2xl border border-gray-700 bg-gray-800 p-8 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-4">{plan.bestFor}</p>
              <p className="text-5xl font-extrabold mb-2">${plan.price}</p>
              <p className="text-gray-400 mb-4">/month</p>
              <p className="text-gray-400 text-sm mb-4">{plan.thumbnails}</p>

              <ul className="space-y-3 text-left">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center text-gray-300">
                    <svg
                      className="h-5 w-5 text-cyan-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-2">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleCheckout(plan.priceId)}
              disabled={loading}
              className="mt-10 w-full py-3 px-6 rounded-lg bg-cyan-600 hover:bg-cyan-700 font-semibold transition-transform transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
