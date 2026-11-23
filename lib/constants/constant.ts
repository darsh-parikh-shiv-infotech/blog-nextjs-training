
export const ROUTES = {
  HOME: "/",
  BLOGS: "/blogs",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  DASHBOARD_BLOGS: "/dashboard/blogs",
  DASHBOARD_BLOG_CREATE: "/dashboard/blogs/create",
  DASHBOARD_CATEGORIES: "/dashboard/categories",
} as const;

export const getBlogDetailsRoute = (slug: string) =>
  `${ROUTES.BLOGS}/${slug}`;

export const getBlogEditRoute = (id: string) =>
  `${ROUTES.DASHBOARD_BLOGS}/${id}/edit`;


export const MESSAGES = {
  COMMON: {
    SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
    REQUIRED_FIELD: "This field is required.",
    INVALID_EMAIL: "Please enter a valid email address.",
  },
  AUTH: {
    LOGIN_SUCCESS: "You have logged in successfully.",
    LOGIN_FAILED: "Invalid email or password.",
    UNAUTHORIZED: "You need to log in to continue.",
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

export const APP_CONFIG = {
  NAME: "BlogNext",
  DESCRIPTION: "Ideas, stories, and perspectives for curious minds.",
  DEFAULT_LOCALE: "en",
} as const;