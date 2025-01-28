import React from "react";
import { Navigate } from "react-router-dom";

// PrivateRoute2 component to protect routes based on email and password
const PrivateRoute2 = ({ element: Component, ...rest }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  // Valid email and password
  const validEmail = "teambullz369@gmail.com";
  const validPassword = "Dbullz@2212";

  // Check if stored email and password match the valid credentials
  if (
    !admin ||
    admin.email !== validEmail ||
    admin.password !== validPassword
  ) {
    // Redirect to login if unauthorized
    return <Navigate to="/adminLogin" />;
  }

  // If credentials are valid, render the protected component
  return <Component {...rest} />;
};

export default PrivateRoute2;
