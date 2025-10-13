// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken"); // check if admin is logged in
  if (!token) {
    return <Navigate to="/login" replace />; // redirect to login if not authenticated
  }
  return children;
};

export default ProtectedRoute;
