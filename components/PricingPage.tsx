// components/PricingPage.tsx
import React from "react";
import stripeProducts from "../utils/stripeProducts";

async function createCheckout(priceId: string) {
  const res = await fetch("/api/checkout"
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId })
  });
  const data = await res.json();
  if (data?.url) {
    // redirect the browser
    window.location.href = data.url;
  } else {
    alert("Failed to create api /checkout");
    console.error("createCheckout error", data);
  }
}

export default function PricingPage() {
  return (
    <div className="pricing-grid">
      {Object.values(stripeProducts).map((p) => {
        // skip free trial in checkout list (special handling)
        const isFree = p.id === "free_trial";
        return (
          <div key={p.id} className="plan-card">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <div className="price">
              ${p.amountMonthly}/{p.amountMonthly === 0 ? "month" : "month"}
            </div>
            <ul>
              <li>{p.thumbnails} thumbnails</li>
            </ul>

            {isFree ? (
              <button onClick={() => { /* keep existing free-trial flow */ }}>
                {p.ctaLabel || "Start Free Trial"}
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!p.priceId) {
                    alert("Price not configured for this plan");
                    return;
                  }
                  void createCheckout(p.priceId);
                }}
              >
                {p.ctaLabel || "Choose Plan"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
