import "server-only";

import { SignJWT, jwtVerify } from "jose";

const secret = process.env.SESSION_SECRET;

if (!secret) {
  throw new Error("SESSION_SECRET is not configured.");
}

const secretKey = new TextEncoder().encode(secret);

interface SessionPayload {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export async function createSessionToken(
  userId: string,
  accessToken: string,
  refreshToken: string,
) {
  return new SignJWT({
    accessToken,
    refreshToken,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);

    if (
      !payload.sub ||
      typeof payload.accessToken !== "string" ||
      typeof payload.refreshToken !== "string"
    ) {
      return null;
    }

    return {
      userId: payload.sub,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    };
  } catch {
    return null;
  }
}