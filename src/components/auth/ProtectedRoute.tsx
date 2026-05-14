import React, { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  if (!accessToken) {
    toast.info('Login to access other features.');
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedRoute;
