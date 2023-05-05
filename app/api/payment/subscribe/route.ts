import type { CreateCheckoutResult } from "lemonsqueezy.ts/dist/types";
import { NextResponse } from "next/server";
import { axios } from "~/lib/axios";
import { client } from "~/lib/lemons";
import { prisma } from "~/prisma/db";

export type CreateCheckoutResponse = {
  checkoutURL: string;
};

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });

    if (!user) return NextResponse.json({ message: "Your account was not found" }, { status: 404 });

    const variant = (
      await client.listAllVariants({ productId: process.env.LEMONS_SQUEEZY_PRODUCT_ID })
    ).data[0];

    const checkout = (await axios.post(
      "https://api.lemonsqueezy.com/v1/checkouts",
      {
        data: {
          type: "checkouts",
          attributes: { checkout_data: { email: user.email, custom: [user.id] } },
          relationships: {
            store: { data: { type: "stores", id: process.env.LEMON_SQUEEZY_STORE_ID } },
            variant: { data: { type: "variants", id: variant.id } },
          },
        },
      },
      { headers: { Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}` } }
    )) as CreateCheckoutResult;

    return NextResponse.json({ checkoutURL: checkout.data.attributes.url }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || err }, { status: 500 });
  }
}
