import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token && token.token) {
    return { Authorization: `Bearer ${token.token}` };
  }
  <Navigate to="/login" />;
};

const PageIndex = () => {
  useEffect(() => {
    const authHeader = getAuthHeader();
  }, []);
  return <h3>Index Page</h3>;
};

export { PageIndex };
