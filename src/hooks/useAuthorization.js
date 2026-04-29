import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

/**
 * Custom hook to check if user has specific role
 */
export const useAuthorization = (requiredRoles = []) => {
  const { user, getUserRole } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsAuthorized(false);
      return;
    }

    if (requiredRoles.length === 0) {
      setIsAuthorized(true);
      return;
    }

    const userRole = getUserRole();
    setIsAuthorized(requiredRoles.includes(userRole));
  }, [user, getUserRole, requiredRoles]);

  return isAuthorized;
};

export default useAuthorization;
