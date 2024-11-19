"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { absoluteUrl } from "@/lib/utils";
import { getUserSubscription } from "../../db/queries";
import { stripe } from "@/lib/stripe";

const returnUrl = absoluteUrl("/shop");

export async function createStripeUrl() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.email || !user.id) throw new Error("Unauthorized");

  const userSubscription = await getUserSubscription();
  if (userSubscription && userSubscription.stripeCustomerId) {
    const stripSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: returnUrl,
    });

    return { data: stripSession.url };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: user.email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "INR",
          product_data: {
            name: "Idiom Pro",
            description: "Unlimited Hearts",
          },
          unit_amount: 2000,
          recurring: {
            interval: "month",
          },
        },
      },
    ],
    metadata: {
      userId: user.id,
    },
    success_url: returnUrl,
    cancel_url: returnUrl,
  });

  return { data: stripeSession.url };
}
