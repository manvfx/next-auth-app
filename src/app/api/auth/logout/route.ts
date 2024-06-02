import { serialize } from "cookie";
import { COOKIE_NAME } from "@/constant";

export async function GET() {
  
  const serializeToken = serialize(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });
  const response = { message: "Logout sucessful" };
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": serializeToken },
  });
}
