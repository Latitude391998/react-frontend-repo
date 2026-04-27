import React, { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: any) => state.auth.token);

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedRoute;
