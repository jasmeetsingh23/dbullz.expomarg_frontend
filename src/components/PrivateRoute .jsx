// import React from "react";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   // Replace with your authentication logic
//   const isAuthenticated = !!localStorage.getItem("authToken");

//   return isAuthenticated ? children : <Navigate to="/" />;
// };

// export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";

// PrivateRoute component to protect routes
const PrivateRoute = ({ element: Component, ...rest }) => {
  const authToken = localStorage.getItem("authToken");

  // Log the token for debugging
  console.log("Auth Token from localStorage:", authToken);

  if (!authToken) {
    // If there's no token, redirect to the login page
    return <Navigate to="/" />;
  }

  // If there's a token, render the protected component
  return <Component {...rest} />;
};

export default PrivateRoute;
