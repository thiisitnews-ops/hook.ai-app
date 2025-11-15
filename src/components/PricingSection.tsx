const handleCheckout = async (priceId: string) => {
  if (priceId === "free") {
    alert("Free trial activated — No payment needed!");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
      return;
    }

    alert("Checkout failed.");
  } catch (err) {
    console.error("Stripe error:", err);
    alert("Error connecting to Stripe.");
  }

  setLoading(false);
};
