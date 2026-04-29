import apiClient from "./apiClient";
import { API_ENDPOINTS, ERROR_MESSAGES } from "../constants/apiConstants";

/**
 * Student Service
 * Handles all student-related API calls
 */

export const studentService = {
  /**
   * Get student dashboard data
   */
  getDashboard: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.STUDENT.DASHBOARD);
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },

  /**
   * Get student profile
   */
  getProfile: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.STUDENT.PROFILE);
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },

  /**
   * Get student appointments
   */
  getAppointments: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.STUDENT.APPOINTMENTS);
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },

  /**
   * Get student notifications
   */
  getNotifications: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.STUDENT.NOTIFICATIONS);
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },

  /**
   * Get student resources
   */
  getResources: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.STUDENT.RESOURCES);
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },

  /**
   * Get student study load
   */
  getStudyLoad: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.STUDENT.STUDYLOAD);
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },

  /**
   * Get student enrollment information
   */
  getEnrollment: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.STUDENT.ENROLLMENT);
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },
};

export default studentService;
