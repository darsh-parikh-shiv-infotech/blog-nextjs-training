export const API_CONFIG = {
  DUMMYJSON_BASE_URL: "https://dummyjson.com",
} as const;

export const DUMMYJSON_ENDPOINTS = {
  POSTS: "/posts",
  POST_BY_ID: (id: number | string) => `/posts/${id}`,
  POSTS_BY_USER: (userId: number | string) => `/posts/user/${userId}`,
  POST_SEARCH: "/posts/search",
  USERS: "/users",
  USER_BY_ID: (id: number | string) => `/users/${id}`,
  LOGIN: "/auth/login",
  CURRENT_USER: "/auth/me",
  REFRESH_TOKEN: "/auth/refresh",
} as const;