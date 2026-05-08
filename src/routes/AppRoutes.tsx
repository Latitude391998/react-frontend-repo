import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from '../components/auth/LoginPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import PublicRoute from '../components/auth/PublicRoute';
import Register from '../pages/Register';
import HomePage from '../pages/Home';
import AboutMe from '../pages/AboutMe';
import PublicLayout from '../layouts/PublicLayout';
import ContactMe from '../pages/ContactMe';

// Dummy components (replace later)
const Dashboard = () => <div>Dashboard</div>;

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {/* <Route
        path='/login'
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path='/register'
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      /> */}
      <Route element={<PublicLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/about-me' element={<AboutMe />} />
        <Route path='/contact-me' element={<ContactMe />} />

        <Route
          path='/login'
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path='/register'
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Route>

      {/* Open route */}
      <Route path='/' element={<HomePage />} />
      <Route path='/about-me' element={<AboutMe />} />

      {/* Protected Routes */}
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
