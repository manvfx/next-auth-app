import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { COOKIE_NAME } from "@/constant";
import User from "@/models/user";
import dbConnection from "@/db/connection";
import bcrypt from "bcrypt";

const MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request: Request) {
  await dbConnection();

  try {
    const body = await request.json();
    const { email, password } = body;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
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

    const response = { message: "Authentication successful" };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Set-Cookie": serializeToken },
    });
  } catch (error) {
    console.error("Error in POST /api/auth/login:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
