import { StatusCodes } from "http-status-codes";

export {StatusCodes};

export const APP_CONFIG = {
  NAME: "BlogNext",
  DESCRIPTION: "Ideas, stories, and perspectives for curious minds.",
  DEFAULT_LOCALE: "en",
  PAGE_SIZE: 9,
  CURRENT_FULL_YEAR: 2026,
  SESSION_COOKIE: "blognext_session",
  SESSION_DURATION: 60 * 60 * 24 * 7,
} as const;

export const ROUTES = {
  HOME: "/",
  BLOGS: "/blogs",
  DASHBOARD: "/dashboard",
  DASHBOARD_BLOGS: "/dashboard/blogs",
  DASHBOARD_BLOG_CREATE: "/dashboard/blogs/create",
  DASHBOARD_CATEGORIES: "/dashboard/categories",
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/api/auth/logout",
  ME: "/api/auth/me",
  MY_BLOGS: "/my-blogs",
} as const;

export const getBlogDetailsRoute = (slug: string) => `${ROUTES.BLOGS}/${slug}`;

export const getBlogEditRoute = (id: string) =>
  `${ROUTES.DASHBOARD_BLOGS}/${id}/edit`;

export const MESSAGES = {
  COMMON: {
    SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
    REQUIRED_FIELD: "This field is required.",
    INVALID_EMAIL: "Please enter a valid email address.",
  },
  AUTH: {
    INVALID_CREDENTIALS: "Invalid email or password.",
    EMAIL_ALREADY_EXISTS: "An account with this email already exists.",
    REGISTRATION_SUCCESS: "Your account has been created successfully.",
    LOGIN_SUCCESS: "Welcome back!",
    LOGOUT_SUCCESS: "You have been logged out.",
    UNAUTHORIZED: "Please log in to continue.",
    SERVER_ERROR: "Something went wrong. Please try again.",
  },
  BLOG: {
    CREATED: "Blog post created successfully.",
    UPDATED: "Blog post updated successfully.",
    DELETED: "Blog post deleted successfully.",
    NOT_FOUND: "The requested blog post could not be found.",
  },
  CATEGORY: {
    CREATED: "Category created successfully.",
    UPDATED: "Category updated successfully.",
    DELETED: "Category deleted successfully.",
  },
} as const;

export const NAVIGATION_LABELS = {
  HOME: "Home",
  STORIES: "Stories",
  ABOUT: "About",
  LOGIN: "Log in",
} as const;

export const HOME_CONTENT = {
  EYEBROW: "Fresh from the journal",
  HEADING: "A few good reads.",
  VIEW_ALL: "View all stories",
} as const;

export const BLOG_PAGE_CONTENT = {
  TITLE: "Blogs",
  EYEBROW: "The BlogNext journal",
  HEADING: "All stories",
  DESCRIPTION: "Explore articles, ideas, and perspectives from our collection.",
  EMPTY: "No blog posts are available right now.",
  NO_BLOGS_FOUND: "No articles found",
  FALLBACK_NO_BLOGS_FOUND: "Try a different search term.",
  BACK_TO_HOME:"Back To Home"
} as const;

export const BLOG_DETAILS_CONTENT = {
  BACK_TO_BLOGS: "Back to all stories",
  WRITTEN_BY: "Written by",
  NOT_FOUND_TITLE: "Blog not found",
} as const;

export const COMMON_UI_STRING = {
  CLEAR_SEARCH: "Clear search",
  NEXT: "Next",
  PREVIOUS: "Previous",
};
