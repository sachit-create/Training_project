import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, type }) => {
  const token = localStorage.getItem(type === "admin" ? "adminToken" : "employeeToken");
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
