/**
 * Enrollment Service
 * Handles all enrollment-related API calls
 */

import apiClient from "./apiClient";
import { API_ENDPOINTS, ERROR_MESSAGES } from "../constants/apiConstants";

export const enrollmentService = {
  /**
   * Get enrollment list
   */
  getEnrollments: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ENROLLMENT.LIST, {
        params,
      });
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },

  /**
   * Create new enrollment
   */
  createEnrollment: async (enrollmentData) => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.ENROLLMENT.CREATE,
        enrollmentData,
      );
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },

  /**
   * Get enrollment by ID
   */
  getEnrollment: async (id) => {
    try {
      const response = await apiClient.get(
        API_ENDPOINTS.ENROLLMENT.UPDATE.replace(":id", id),
      );
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || ERROR_MESSAGES.NOT_FOUND;
      return { success: false, error: message };
    }
  },

  /**
   * Update enrollment
   */
  updateEnrollment: async (id, enrollmentData) => {
    try {
      const response = await apiClient.put(
        API_ENDPOINTS.ENROLLMENT.UPDATE.replace(":id", id),
        enrollmentData,
      );
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },

  /**
   * Submit requirements
   */
  submitRequirements: async (id, formData) => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.ENROLLMENT.SUBMIT_REQUIREMENTS.replace(":id", id),
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },

  /**
   * Get available schedules
   */
  getSchedules: async (programId) => {
    try {
      const response = await apiClient.get(
        API_ENDPOINTS.ENROLLMENT.GET_SCHEDULE,
        {
          params: { programId },
        },
      );
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },

  /**
   * Delete enrollment
   */
  deleteEnrollment: async (id) => {
    try {
      const response = await apiClient.delete(
        API_ENDPOINTS.ENROLLMENT.DELETE.replace(":id", id),
      );
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },
};

export default enrollmentService;
