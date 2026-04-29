/**
 * Validation Utility
 * Common validation functions for forms
 */

export const validationUtil = {
  /**
   * Validate email format
   */
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate password strength
   */
  isValidPassword: (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  },

  /**
   * Get password strength level
   */
  getPasswordStrength: (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  },

  /**
   * Validate name
   */
  isValidName: (name) => {
    return name && name.trim().length >= 2;
  },

  /**
   * Validate phone number
   */
  isValidPhoneNumber: (phone) => {
    const phoneRegex = /^[0-9\-\+\(\)\s]+$/;
    return phone && phone.trim().length >= 10 && phoneRegex.test(phone);
  },

  /**
   * Validate required field
   */
  isRequired: (value) => {
    if (typeof value === "string") {
      return value.trim().length > 0;
    }
    return value != null;
  },

  /**
   * Validate file size (in MB)
   */
  isValidFileSize: (file, maxSizeMB) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
  },

  /**
   * Validate file type
   */
  isValidFileType: (file, allowedTypes) => {
    return allowedTypes.includes(file.type);
  },
};

export default validationUtil;
