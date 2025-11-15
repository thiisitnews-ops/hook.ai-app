import React from "react";

interface StripeButtonProps {
  priceId: string;
}

const StripeButton: React.FC<StripeButtonProps> = ({ priceId }) => {

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        alert("Checkout failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="w-full mt-10 py-3 px-6 rounded-lg font-semibold bg-cyan-600 hover:bg-cyan-700 transition-transform transform hover:scale-105 text-white"
    >
      Choose Plan
    </button>
  );
};

export default StripeButton;
