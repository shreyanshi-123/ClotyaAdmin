import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ redirectPath = '/', children }) {
  const isLoggedIn = useSelector(state => state.loginAdmin.isLoggedIn);

  if (!isLoggedIn) {
    alert('notloggedin')
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

export default ProtectedRoute;
