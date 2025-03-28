import { NextRequest, NextResponse } from "next/server";
import { BASE_URL, JWT_SECRET } from "./ENV";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const redirectURL = BASE_URL + "/auth";

  console.log("redirectUrl", redirectURL);

  if (!token) return NextResponse.redirect(redirectURL);

  const secret = new TextEncoder().encode(JWT_SECRET);

  try {
    const { payload } = await jose.jwtVerify(token, secret);

    return NextResponse.next();
  } catch (err) {
    console.log("error", err);

    return NextResponse.redirect(redirectURL);
  }
}

export const config = {
  matcher: "/user/me",
};
