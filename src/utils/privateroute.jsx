import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("jwtToken"); // Check if JWT token exists
  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token
  }
  return children; // If token exists, render the protected route
};

export default PrivateRoute;