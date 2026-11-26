import "server-only";

import {
  API_CONFIG,
  DUMMYJSON_ENDPOINTS,
} from "@/lib/constants/api.constants";

import type {
  DummyJSONPost,
  DummyJSONPostsResponse,
  DummyJSONUser,
  DummyJSONLoginResponse,
} from "@/lib/types/dummyjson.types";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`DummyJSON request failed: ${response.status}`);
  }

  return response.json();
}

async function dummyJSONFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_CONFIG.DUMMYJSON_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    cache: "no-store",
  });

  return handleResponse<T>(response);
}

/* Posts */

export async function fetchPosts(
  limit = 0,
): Promise<DummyJSONPostsResponse> {
  return dummyJSONFetch<DummyJSONPostsResponse>(
    `${DUMMYJSON_ENDPOINTS.POSTS}?limit=${limit}`,
  );
}

export async function fetchPostById(
  id: number | string,
): Promise<DummyJSONPost> {
  return dummyJSONFetch<DummyJSONPost>(
    DUMMYJSON_ENDPOINTS.POST_BY_ID(id),
  );
}

export async function fetchPostsByUser(
  userId: number | string,
): Promise<DummyJSONPostsResponse> {
  return dummyJSONFetch<DummyJSONPostsResponse>(
    DUMMYJSON_ENDPOINTS.POSTS_BY_USER(userId),
  );
}

/* Users */
export async function fetchUsers(): Promise<{
  users: DummyJSONUser[];
  total: number;
  skip: number;
  limit: number;
}> {
  return dummyJSONFetch(
    `${DUMMYJSON_ENDPOINTS.USERS}?limit=0`,
  );
}

export async function fetchUserById(
  id: number | string,
): Promise<DummyJSONUser> {
  return dummyJSONFetch<DummyJSONUser>(
    DUMMYJSON_ENDPOINTS.USER_BY_ID(id),
  );
}

/* Authentication */

export async function loginToDummyJSON(
  username: string,
  password: string,
): Promise<DummyJSONLoginResponse> {
  return dummyJSONFetch<DummyJSONLoginResponse>(
    DUMMYJSON_ENDPOINTS.LOGIN,
    {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 60,
      }),
    },
  );
}

export async function fetchAuthenticatedUser(
  accessToken: string,
): Promise<DummyJSONUser> {
  return dummyJSONFetch<DummyJSONUser>(
    DUMMYJSON_ENDPOINTS.CURRENT_USER,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}

/* CRUD */

export async function addPost(
  payload: Partial<DummyJSONPost>,
): Promise<DummyJSONPost> {
  return dummyJSONFetch<DummyJSONPost>(
    `${DUMMYJSON_ENDPOINTS.POSTS}/add`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

export async function updatePost(
  id: number | string,
  payload: Partial<DummyJSONPost>,
): Promise<DummyJSONPost> {
  return dummyJSONFetch<DummyJSONPost>(
    DUMMYJSON_ENDPOINTS.POST_BY_ID(id),
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
}

export async function removePost(
  id: number | string,
): Promise<DummyJSONPost> {
  return dummyJSONFetch<DummyJSONPost>(
    DUMMYJSON_ENDPOINTS.POST_BY_ID(id),
    {
      method: "DELETE",
    },
  );
}