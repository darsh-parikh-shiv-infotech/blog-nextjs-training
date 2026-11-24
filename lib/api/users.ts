import "server-only";
import { User } from "../types/common.types";

const USERS_ENDPOINT = `${process.env.JSON_SERVER_URL}/users`;

export async function getUserByEmail(email: string): Promise<User | null> {
  const query = new URLSearchParams({ email });

  const response = await fetch(`${USERS_ENDPOINT}?${query}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to retrieve user.");
  }

  const users: User[] = await response.json();

  return users[0] ?? null;
}

export async function getUserById(id: string): Promise<User | null> {
  const response = await fetch(`${USERS_ENDPOINT}/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to retrieve user.");
  }

  return response.json();
}

export async function createUser(
  user: Omit<User, "id">,
): Promise<User> {
  const response = await fetch(USERS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to create user.");
  }

  return response.json();
}
