
import "server-only";

import bcrypt from "bcryptjs";
import { cache } from "react";
import { AuthUser } from "../types/common.types";
import { getSession } from "./session";
import { redirect } from "next/navigation";
import { ROUTES } from "../constants/constant";
import { fetchAuthenticatedUser } from "../services/dummyjson.service";

const SALT_ROUNDS = 12;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  passwordHash: string,
) {
  return bcrypt.compare(password, passwordHash);
}

export const getCurrentUser = cache(
  async (): Promise<AuthUser | null> => {
    const session = await getSession();

    if (!session) {
      return null;
    }

    try {
      const user = await fetchAuthenticatedUser(session.accessToken);

      return {
        id: String(user.id),
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      };
    } catch {
      return null;
    }
  },
);

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  return user;
}

