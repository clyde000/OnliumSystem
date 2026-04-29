import { createContext, useState, useCallback, useEffect } from "react";
import authService from "../services/authService";
import { STORAGE_KEYS } from "../constants/apiConstants";

/**
 * Authentication Context
 * Manages global authentication state
 */
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Initialize user from localStorage
   */
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = authService.getCurrentUser();
        const isAuthenticated = authService.isAuthenticated();

        if (isAuthenticated && storedUser) {
          setUser(storedUser);
        }
      } catch (err) {
        console.error("Error initializing auth:", err);
        setError("Failed to initialize authentication");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Handle user login
   */
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    const result = await authService.login(email, password);

    if (result.success) {
      setUser(result.user);
      return { success: true, user: result.user };
    } else {
      setError(result.error);
      return { success: false, error: result.error };
    }
  }, []);

  /**
   * Handle user logout
   */
  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError("Failed to logout");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Handle user registration
   */
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);

    const result = await authService.register(userData);

    if (result.success) {
      setUser(result.user);
      return { success: true, user: result.user };
    } else {
      setError(result.error);
      return { success: false, error: result.error };
    }
  }, []);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Get user role
   */
  const getUserRole = useCallback(() => {
    return authService.getUserRole();
  }, []);

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = useCallback(() => {
    return authService.isAuthenticated();
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    clearError,
    getUserRole,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
