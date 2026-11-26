import "server-only";

import { cookies } from "next/headers";
import { createSessionToken, verifySessionToken } from "./token";
import { APP_CONFIG } from "../constants/constant";

export async function createSession(
  userId: string,
  accessToken: string,
  refreshToken: string,
) {
  const token = await createSessionToken(
    userId,
    accessToken,
    refreshToken,
  );

  const cookieStore = await cookies();

  cookieStore.set(APP_CONFIG.SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: APP_CONFIG.SESSION_DURATION,
  });
}

export async function getSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get(APP_CONFIG.SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

export async function deleteSession() {
  const cookieStore = await cookies();

  cookieStore.delete(APP_CONFIG.SESSION_COOKIE);
}