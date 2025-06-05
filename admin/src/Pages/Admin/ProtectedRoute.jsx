import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children  }) => {
  const isLoggedIn = useSelector(state => state.loginAdmin.isLoggedIn);
  const storedValue = localStorage.getItem('user');
  
  if (!storedValue) {
    // If not logged in, redirect to login page
    return <Navigate to="/" replace />;
  }

  // If logged in, render the children (protected component)
  return children;
};

export default ProtectedRoute;
