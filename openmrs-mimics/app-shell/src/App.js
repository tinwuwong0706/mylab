import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './components/Auth/Login';
import { CustomizationProvider } from './utils/customization';

function App() {
  return (
    <CustomizationProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </CustomizationProvider>
  );
}

export default App;