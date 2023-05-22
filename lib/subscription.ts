import { prisma } from "~/prisma/db";
import { client } from "./lemons";

export async function getUserSubscriptionPlan(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscriptionId: true,
      currentPeriodEnd: true,
      customerId: true,
      variantId: true,
    },
  });

  if (!user) throw new Error("User not found");

  // Check if user is on a pro plan.
  const isPro =
    user.variantId &&
    user.currentPeriodEnd &&
    user.currentPeriodEnd.getTime() + 86_400_000 > Date.now();

  const subscription = await client.retrieveSubscription({ id: user.subscriptionId });

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;

  if (isPro && user.subscriptionId) {
    isCanceled = subscription.data.attributes.cancelled;
  }

  return {
    ...user,
    currentPeriodEnd: user.currentPeriodEnd?.getTime(),
    isCanceled,
    isPro,
    updatePaymentMethodURL: subscription.data.attributes.urls.update_payment_method,
  };
}
