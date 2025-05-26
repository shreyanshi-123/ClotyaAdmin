import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, redirectPath, children }) {
  if (!isLoggedIn) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to={redirectPath} />;
  }

  // If the user is logged in, render the protected content (dashboard)
  return children;
}

export default ProtectedRoute;
