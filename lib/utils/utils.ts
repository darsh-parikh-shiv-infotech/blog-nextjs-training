
import "server-only";

import bcrypt from "bcryptjs";
import { cache } from "react";
import { AuthUser } from "../types/common.types";
import { getSession } from "./session";
import { getUserById } from "../services/users";
import { redirect } from "next/navigation";
import { ROUTES } from "../constants/constant";

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

    const user = await getUserById(session.userId);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },
);

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  return user;
}

