import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
  request: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const user = await currentUser();

    const invalidUser =
      !user || !user.id || !user.emailAddresses[0].emailAddress;
    if (invalidUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: { id: params.courseId, isPublished: true },
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });
    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    if (purchase) {
      return new NextResponse("You have already purchased this course", {
        status: 400,
      });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: course.price! * 100,
        },
        quantity: 1,
      },
    ];

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: { userId: user.id },
      select: { stripeCustomerId: true },
    });
    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });
      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${course.id}?canceled=1`,
      customer: stripeCustomer.stripeCustomerId,
      metadata: {
        userId: user.id,
        courseId: course.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[CHECKOUT]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
