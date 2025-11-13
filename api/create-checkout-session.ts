// api/create-checkout-session.ts
import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2022-11-15" });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { priceId, successUrl, cancelUrl, userId } = req.body;

  if (!priceId) return res.status(400).json({ error: "Missing priceId" });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      client_reference_id: userId ?? undefined,
      // You can also attach metadata
      metadata: { userId: userId ?? "" },
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL}`}/?checkout=success`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL}`}/?checkout=cancel`
    });
    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
