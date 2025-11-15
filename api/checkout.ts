import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-08-16",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("DEBUG: Request received");

  if (req.method !== "POST") {
    console.log("DEBUG: Wrong method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("DEBUG: Request body:", req.body);
    console.log("DEBUG: Stripe key exists?", !!process.env.STRIPE_SECRET_KEY);
    console.log("DEBUG: BASE URL:", process.env.NEXT_PUBLIC_BASE_URL);

    const { priceId } = req.body;

    if (!priceId) {
      console.log("DEBUG: Missing priceId");
      return res.status(400).json({ error: "Missing priceId" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
    });

    console.log("DEBUG: Stripe session created:", session.id);
    return res.status(200).json({ url: session.url });

  } catch (error: any) {
    console.error("DEBUG: Stripe error:", error);
    return res.status(500).json({
      error: "Stripe Error",
      debug: error.message || error.toString()
    });
  }
}
