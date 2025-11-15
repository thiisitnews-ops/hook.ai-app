import React, { useState } from "react";

interface StripeButtonProps {
  priceId: string; // Stripe Price ID
}

const StripeButton: React.FC<StripeButtonProps> = ({ priceId }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!priceId) {
      alert("Missing Stripe Price ID.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        alert("Checkout failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Error connecting to Stripe.");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full mt-6 py-3 px-6 rounded-lg font-semibold bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50"
    >
      {loading ? "Processing..." : "Choose Plan"}
    </button>
  );
};

export default StripeButton;
