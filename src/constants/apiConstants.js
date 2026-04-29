/**
 * API Endpoints Configuration
 * Define all backend API endpoints here for easy maintenance
 */

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    REFRESH_TOKEN: "/auth/refresh",
    VERIFY_EMAIL: "/auth/verify-email",
  },

  // Admin
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    STUDENTS: "/admin/students",
    RESOURCES: "/admin/resources",
    CURRICULUM: "/admin/curriculum",
    BULLETIN: "/admin/bulletin",
    APPOINTMENTS: "/admin/appointments",
  },

  // Students
  STUDENT: {
    PROFILE: "/student/profile",
    DASHBOARD: "/student/dashboard",
    ENROLLMENT: "/student/enrollment",
    APPOINTMENTS: "/student/appointments",
    NOTIFICATIONS: "/student/notifications",
    RESOURCES: "/student/resources",
    STUDYLOAD: "/student/studyload",
  },

  // Enrollment
  ENROLLMENT: {
    LIST: "/enrollment",
    CREATE: "/enrollment",
    UPDATE: "/enrollment/:id",
    DELETE: "/enrollment/:id",
    SUBMIT_REQUIREMENTS: "/enrollment/:id/requirements",
    GET_SCHEDULE: "/enrollment/schedule",
  },

  // User Management
  USER: {
    PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/profile",
    CHANGE_PASSWORD: "/user/change-password",
  },
};

/**
 * API Response Codes
 */
export const API_RESPONSE_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNAUTHORIZED: "Unauthorized. Please login again.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  USER_NOT_FOUND: "User not found.",
  EMAIL_ALREADY_EXISTS: "Email already registered.",
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
};

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "onlium_access_token",
  REFRESH_TOKEN: "onlium_refresh_token",
  USER: "onlium_user",
  USER_ROLE: "onlium_user_role",
};

/**
 * User Roles
 */
export const USER_ROLES = {
  ADMIN: "admin",
  STUDENT: "student",
  MODERATOR: "moderator",
};
