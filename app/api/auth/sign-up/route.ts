import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "~/prisma/db";
import { User } from "~/providers/auth";

export type SignUpResponse = {
  user: User;
  message: string;
};

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const prevUser = await prisma.user.findUnique({
      where: { email },
    });

    if (prevUser) return NextResponse.json({ message: "Email already in use" }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
      select: { id: true, email: true },
    });

    return NextResponse.json({
      user,
      message: "Your account has been created!",
    } satisfies SignUpResponse);
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
}
