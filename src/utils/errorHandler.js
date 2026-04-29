/**
 * Error Handling Utility
 * Centralized error handling for API calls
 */

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.data?.message || "An error occurred";

    return {
      status,
      message,
      data: error.response.data,
    };
  } else if (error.request) {
    // Request made but no response
    return {
      status: null,
      message: "No response from server. Please check your connection.",
      data: null,
    };
  } else {
    // Error in request setup
    return {
      status: null,
      message: error.message || "An unexpected error occurred",
      data: null,
    };
  }
};

/**
 * Format error message for UI display
 */
export const getErrorMessage = (error) => {
  const errorObj = handleApiError(error);
  return errorObj.message;
};

/**
 * Check if error is authentication related
 */
export const isAuthError = (error) => {
  return error.response?.status === 401 || error.response?.status === 403;
};

/**
 * Check if error is not found
 */
export const isNotFoundError = (error) => {
  return error.response?.status === 404;
};

/**
 * Check if error is validation error
 */
export const isValidationError = (error) => {
  return error.response?.status === 400;
};

export default {
  handleApiError,
  getErrorMessage,
  isAuthError,
  isNotFoundError,
  isValidationError,
};
