import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Patients from './pages/Patients';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import MainLayout from './components/layout/MainLayout/MainLayout';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rotas sem layout */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      
      {/* Rotas com layout */}
      <Route element={<MainLayout children={undefined} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;