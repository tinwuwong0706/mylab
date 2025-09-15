import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Layout from './components/Layout';
import PrivateRoute from './components/Auth/PrivateRoute';
import Dashboard from './components/Modules/Dashboard';
import Patients from './components/Modules/Patients';
import Clinical from './components/Modules/Clinical';
import Reports from './components/Modules/Reports';
import System from './components/Modules/System';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="clinical" element={<Clinical />} />
        <Route path="reports" element={<Reports />} />
        <Route path="system" element={<System />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;