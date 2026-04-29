/**
 * Local Storage Utility
 * Safe wrapper for localStorage operations
 */

import { STORAGE_KEYS } from "../constants/apiConstants";

export const storageUtil = {
  /**
   * Get item from localStorage
   */
  getItem: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage key: ${key}`, error);
      return null;
    }
  },

  /**
   * Set item in localStorage
   */
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage key: ${key}`, error);
    }
  },

  /**
   * Remove item from localStorage
   */
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key: ${key}`, error);
    }
  },

  /**
   * Clear all auth-related data
   */
  clearAuth: () => {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error("Error clearing auth data", error);
    }
  },

  /**
   * Get authentication token
   */
  getToken: () => {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  /**
   * Set authentication token
   */
  setToken: (token) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  /**
   * Get current user
   */
  getUser: () => {
    return storageUtil.getItem(STORAGE_KEYS.USER);
  },

  /**
   * Set current user
   */
  setUser: (user) => {
    storageUtil.setItem(STORAGE_KEYS.USER, user);
  },
};

export default storageUtil;
