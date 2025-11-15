import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { priceId, userId } = req.body ?? {};

    if (!priceId) {
      return res.status(400).json({ error: "Missing priceId" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_creation: "if_required",
      client_reference_id: userId ?? undefined,
      metadata: { userId: userId ?? "" },
      success_url: `${req.headers.origin}/?checkout=success`,
      cancel_url: `${req.headers.origin}/?checkout=cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe session error:", err);
    return res.status(500).json({ error: err.message });
  }
}
