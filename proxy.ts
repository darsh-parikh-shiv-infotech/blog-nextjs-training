
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { APP_CONFIG, ROUTES } from "./lib/constants/constant";

const secret = process.env.SESSION_SECRET;

if (!secret) {
  throw new Error("SESSION_SECRET is not configured.");
}

const secretKey = new TextEncoder().encode(secret);

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(
    APP_CONFIG.SESSION_COOKIE,
  )?.value;

  if (!token) {
    return NextResponse.redirect(
      new URL(ROUTES.LOGIN, request.url),
    );
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);

    if (!payload.sub) {
      throw new Error("Invalid session.");
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(
      new URL(ROUTES.LOGIN, request.url),
    );
  }
}

export const config = {
  matcher: ["/my-blogs/:path*"],
};
