import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Patients from './pages/Patients';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import MainLayout from './components/layout/MainLayout/MainLayout';
import { Playground } from '../src/playground/playground';

const AppRoutes: React.FC = () => {
  // Estado para o sidebar (agora sendo gerenciado aqui)
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <Routes>
      {/* Rotas sem layout */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      
      {/* Rotas com layout */}
      <Route element={<MainLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Rota do Playground - sem layout */}
      <Route path="/playground" element={<Playground />} />
    </Routes>
  );
};

export default AppRoutes;