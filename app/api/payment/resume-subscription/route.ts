import { NextResponse } from "next/server";
import { axios } from "~/lib/axios";
import { getUserSubscriptionPlan } from "~/lib/subscription";
import { prisma } from "~/prisma/db";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        subscriptionId: true,
        variantId: true,
        currentPeriodEnd: true,
      },
    });

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const { isPro } = await getUserSubscriptionPlan(user.id);

    if (!isPro) return NextResponse.json({ message: "You are not subscribed" }, { status: 402 });

    await axios.patch(
      `https://api.lemonsqueezy.com/v1/subscriptions/${user.subscriptionId}`,
      {
        data: {
          type: "subscriptions",
          id: user.subscriptionId,
          attributes: {
            cancelled: false,
          },
        },
      },
      {
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        },
      }
    );

    return NextResponse.json({
      message: `Your subscription has been resumed.`,
    });
  } catch (err) {
    console.log({ err });
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}
