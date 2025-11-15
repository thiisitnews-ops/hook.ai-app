import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { priceId, customerEmail } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: "Missing priceId" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: customerEmail,
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
