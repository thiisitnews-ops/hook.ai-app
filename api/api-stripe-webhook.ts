import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

// This MUST be your real secret from Stripe Dashboard
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
  api: {
    bodyParser: false, // Stripe requires raw body
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await buffer(req);
    const signature = req.headers["stripe-signature"]!;

    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle subscription events
  if (event.type === "checkout.session.completed") {
    console.log("Subscription completed:", event.data.object);
  }

  if (event.type === "customer.subscription.updated") {
    console.log("Subscription updated:", event.data.object);
  }

  if (event.type === "customer.subscription.deleted") {
    console.log("Subscription canceled:", event.data.object);
  }

  res.status(200).json({ received: true });
}

// Helper to get raw buffer
function buffer(req: any): Promise<Buffer> {
  return new Promise((resolve) => {
    const chunks: Uint8Array[] = [];
    req.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
  });
}
