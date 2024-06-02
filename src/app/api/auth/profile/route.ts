import { verify, JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constant";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function GET() {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get(COOKIE_NAME);

  if (!jwtToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { value } = jwtToken;
  const jwtSecret = process.env.JWT_SECRET || "";

  try {
    const result = verify(value, jwtSecret) as JwtPayload;
    if (typeof result === "object" && "email" in result) {
      const userFromDB = await User.findOne({ email: result.email });
      if (!userFromDB) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      const response = {
        user: { email: userFromDB.email, name: userFromDB.name },
      };
      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid token payload" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}
