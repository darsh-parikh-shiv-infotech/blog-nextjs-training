import { StatusCodes } from "http-status-codes";

export { StatusCodes };

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
  LOGIN: "/login",
  REGISTER: "/register",
  MY_BLOGS: "/my-blogs",
} as const;

export const AUTH_API_ROUTES = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  LOGOUT: "/api/auth/logout",
  ME: "/api/auth/me",
} as const;

export const BLOG_API_ROUTES = {
  BLOGS: "/blogs",
} as const;

export const getBlogDetailsRoute = (slug: string) => `${ROUTES.BLOGS}/${slug}`;

export const getMyBlogEditRoute = (id: string) =>
  `${ROUTES.MY_BLOGS}/${id}/edit`;

export const MESSAGES = {
  COMMON: {
    SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
    NETWORK_ERROR: "Unable to connect. Please try again.",
    INVALID_FORM: "Please check your submitted information.",
    REQUIRED_FIELD: "This field is required.",
    INVALID_EMAIL: "Please enter a valid email address.",
  },

  API: {
    USER_FETCH_FAILED: "Unable to retrieve user.",
    USER_CREATE_FAILED: "Unable to create user.",
  },

  AUTH: {
    INVALID_CREDENTIALS: "Invalid username or password.",
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
    CREATE_FAILED: "Unable to create your blog. Please try again.",
    UPDATE_FAILED: "Unable to update your blog. Please try again.",
    DELETE_FAILED: "Unable to delete your blog. Please try again.",
    UNAUTHORIZED_ACTION: "You are not allowed to modify this blog.",
  },
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: "Field is required.",
  EMAIL_REQUIRED: "Email is required.",
  EMAIL_INVALID: "Enter a valid email address.",
  PASSWORD_REQUIRED: "Password is required.",
  PASSWORD_MIN: "Password must contain at least 8 characters.",
  NAME_REQUIRED: "Name is required.",
  NAME_MIN: "Name must contain at least 2 characters.",
  NAME_MAX: "Name cannot exceed 50 characters.",
  CONFIRM_PASSWORD_REQUIRED: "Please confirm your password.",
  PASSWORDS_NOT_MATCH: "Passwords do not match.",
} as const;

export const AUTH_CONTENT = {
  LOGIN: {
    TITLE: "Welcome back",
    DESCRIPTION: "Log in to manage your blogs.",
    SUBMIT: "Log in",
    SUBMITTING: "Logging in...",
    DEMO_CREDENTIALS: {
      USERNAME: "emilys",
      PASSWORD: "emilyspass",
    },
  },

  DEMO_CREDENTIALS: {
    USERNAME: "emilys",
    PASSWORD: "emilyspass",
  },

  REGISTER: {
    TITLE: "Create your account",
    DESCRIPTION: "Start writing and sharing your stories.",
    SUBMIT: "Create account",
    SUBMITTING: "Creating account...",
    HAS_ACCOUNT: "Already have an account?",
    LOGIN_LINK: "Log in",
  },

  FIELDS: {
    NAME: "Name",
    NAME_PLACEHOLDER: "Your name",

    USERNAME: "Username",
    USERNAME_PLACEHOLDER: "Enter your username",

    EMAIL: "Email",
    EMAIL_PLACEHOLDER: "you@example.com",

    PASSWORD: "Password",
    LOGIN_PASSWORD_PLACEHOLDER: "Enter your password",
    REGISTER_PASSWORD_PLACEHOLDER: "At least 8 characters",
    CONFIRM_PASSWORD: "Confirm password",
    CONFIRM_PASSWORD_PLACEHOLDER: "Re-enter your password",
  },

  RETURN_HOME: "Return to Home",
} as const;

export const NAVIGATION_LABELS = {
  HOME: "Home",
  STORIES: "Stories",
  ABOUT: "About",
  LOGIN: "Log in",
  MY_BLOGS: "My Blogs",
  LOGOUT: "Log out",
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
  BACK_TO_HOME: "Back To Home",
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
  LOADING: "Loading...",
  LOGGING_OUT: "Logging out...",
  CHECKING_AUTH: "Checking authentication...",
} as const;

export const MY_BLOGS_CONTENT = {
  TITLE: "My Blogs",
  GREETING: "Welcome,",
  CREATE_BLOG: "Create Blog",
  BLOG_COUNT: "blogs",
  EMPTY_TITLE: "Your writing space is ready",
  EMPTY_DESCRIPTION:
    "You haven't created any blogs yet. Start writing your first article.",
  CREATE_FIRST_BLOG: "Create your first blog",
} as const;

export const BLOG_FORM_CONTENT = {
  TITLE: "Create a new blog",
  DESCRIPTION: "Share your ideas, experiences, and stories with the world.",
  FIELDS: {
    TITLE: "Blog title",
    TITLE_PLACEHOLDER: "Give your blog a meaningful title",
    DESCRIPTION: "Short description",
    COVER_IMAGE: "Cover Image",
    DESCRIPTION_PLACEHOLDER: "What is this article about?",
    CATEGORY: "Category",
    CONTENT: "Your story",
    CONTENT_PLACEHOLDER: "Start writing your story...",
  },
  SUBMIT: "Create blog",
  SUBMITTING: "Creating blog...",
  CANCEL: "Cancel",
  BACK: "Back to My Blogs",
  EDIT_TITLE: "Edit your blog",
  EDIT_DESCRIPTION: "Make changes to your article.",
  UPDATE: "Save changes",
  UPDATING: "Saving changes...",
  UPLOADING: "Uploading...",
} as const;
