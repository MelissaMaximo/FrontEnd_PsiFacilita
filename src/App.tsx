import React from 'react';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/hooks/useAuth';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;