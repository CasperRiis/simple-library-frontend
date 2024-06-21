import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  element: React.ReactNode;
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  requiredRoles,
}) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated || !requiredRoles?.includes(role!)) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
