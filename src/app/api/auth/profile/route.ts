import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constant";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get(COOKIE_NAME);

  if (!jwtToken) {
    return NextResponse.json({ message: "Unauthorizaed" }, { status: 401 });
  }

  const { value } = jwtToken;
  const jwtSecret = process.env.JWT_SECRET || "";

  try {
    let userEmail = "";
    verify(value, jwtSecret, function (error: any, decoded: any) {
      // console.log(error);
      // console.log(decoded); // call with database fetch user info
      userEmail = decoded.email;
    });
    const response = { user: { email: userEmail } };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}
