import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("Stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.log("[WEBHOOK ERROR]", error);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const userId = session.metadata?.userId;
  const courseId = session.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      return new NextResponse("Invalid session", { status: 400 });
    }
    await db.purchase.create({
      data: {
        userId,
        courseId,
      },
    });
  } else {
    console.log("Unhandled event type", event.type);
    return new NextResponse("Unhandled event type", { status: 200 });
  }

  return new NextResponse("OK", { status: 200 });
}
