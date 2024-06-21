import React from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return props.element;
};

export default ProtectedRoute;
