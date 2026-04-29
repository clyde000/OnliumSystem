import apiClient from "./apiClient";
import { API_ENDPOINTS, ERROR_MESSAGES } from "../constants/apiConstants";

/**
 * Admin Service
 * Handles all admin-related API calls
 */

export const adminService = {
  /**
   * Get admin dashboard data
   */
  getDashboard: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.DASHBOARD);
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },

  /**
   * Get all students
   */
  getStudents: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.STUDENTS, {
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
   * Get student by ID
   */
  getStudent: async (id) => {
    try {
      const response = await apiClient.get(
        `${API_ENDPOINTS.ADMIN.STUDENTS}/${id}`,
      );
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || ERROR_MESSAGES.NOT_FOUND;
      return { success: false, error: message };
    }
  },

  /**
   * Get resources
   */
  getResources: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.RESOURCES);
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },

  /**
   * Get curriculum
   */
  getCurriculum: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.CURRICULUM);
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },

  /**
   * Get bulletins
   */
  getBulletins: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.BULLETIN);
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },

  /**
   * Create bulletin
   */
  createBulletin: async (bulletinData) => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.ADMIN.BULLETIN,
        bulletinData,
      );
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },

  /**
   * Get appointments
   */
  getAppointments: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.APPOINTMENTS);
      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      return { success: false, error: message };
    }
  },
};

export default adminService;
