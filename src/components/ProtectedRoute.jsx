import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAuthorization } from "../hooks/useAuthorization";
import { USER_ROLES } from "../constants/apiConstants";

/**
 * Protected Route Component
 * Redirects to login if not authenticated
 */
export const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, loading } = useAuth();
  const isAuthorized = useAuthorization(requiredRoles);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles.length > 0 && !isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return children;
};

/**
 * Admin Route Component
 * Only accessible by admin users
 */
export const AdminRoute = ({ children }) => {
  return (
    <ProtectedRoute requiredRoles={[USER_ROLES.ADMIN]}>
      {children}
    </ProtectedRoute>
  );
};

/**
 * Student Route Component
 * Only accessible by student users
 */
export const StudentRoute = ({ children }) => {
  return (
    <ProtectedRoute requiredRoles={[USER_ROLES.STUDENT]}>
      {children}
    </ProtectedRoute>
  );
};

/**
 * Public Route Component
 * Redirects to dashboard if already authenticated
 */
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
