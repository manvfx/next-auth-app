import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { COOKIE_NAME } from "@/constant";

const MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request: Request) {
  const body: any = request.json();
  const { email, password } = await body;

  if (email !== "admin@gmail.com" || password !== "admin") {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const jwtSecret = process.env.JWT_SECRET || "";
  const jwtToken = sign({ email }, jwtSecret, { expiresIn: MAX_AGE });
  const serializeToken = serialize(COOKIE_NAME, jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });
  const response = { message: "Authentication sucessful" };
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": serializeToken },
  });
}