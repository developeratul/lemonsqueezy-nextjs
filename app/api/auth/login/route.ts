import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "~/prisma/db";

export async function POST(req: Request) {
  const { email: emailInput, password: passwordInput } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: emailInput },
    select: { id: true, email: true, password: true },
  });

  if (!user) return NextResponse.json({ message: "Your account does not exist" }, { status: 404 });

  const { id, password, email } = user;

  const passwordMatched = await bcrypt.compare(passwordInput, password);

  if (!passwordMatched)
    return NextResponse.json({ message: "Invalid credentials" }, { status: 403 });

  return NextResponse.json({ user: { id, email }, message: "Welcome back!" });
}
