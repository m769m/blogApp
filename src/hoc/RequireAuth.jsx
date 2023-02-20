import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ children, typePage = "CONTENT" }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (typePage === "CONTENT") {
    if (!token) {
      return <Navigate to="/sign-in" state={{ from: location }} />;
    }
  } else if (typePage === "SIGN") {
    if (token) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default RequireAuth;
