// api/stripe-webhook.ts
import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

// helper to read raw body
async function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;
  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature error:", err?.message);
    return res.status(400).send(`Webhook Error: ${err?.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = (session.client_reference_id as string) || session.metadata?.userId || null;
      const subscriptionId = session.subscription as string | undefined;

      // If subscription created immediately, fetch subscription object
      let subscription: Stripe.Subscription | null = null;
      if (subscriptionId) {
        subscription = await stripe.subscriptions.retrieve(subscriptionId);
      }

      // Get period dates - FIXED: Use correct property access
      const currentPeriodStart = subscription?.current_period_start ?? null;
      const currentPeriodEnd = subscription?.current_period_end ?? null;

      // Upsert to Supabase (store mapping user -> subscription)
      if (userId) {
        const payload = {
          user_id: userId,
          stripe_subscription_id: subscription?.id ?? null,
          stripe_customer_id: session.customer as string | null,
          status: subscription?.status ?? "active",
          price_id: subscription?.items?.data?.[0]?.price?.id ?? session.metadata?.priceId ?? null,
          current_period_start: currentPeriodStart ? new Date(currentPeriodStart * 1000).toISOString() : null,
          current_period_end: currentPeriodEnd ? new Date(currentPeriodEnd * 1000).toISOString() : null,
        };

        const { error } = await supabaseAdmin.from("subscriptions").upsert(payload, { onConflict: "stripe_subscription_id" });

        if (error) console.error("Supabase upsert error:", error);
      }
    }

    // Handle other events like invoice.payment_succeeded, customer.subscription.updated, etc.
    res.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    res.status(500).send("Internal error");
  }
}