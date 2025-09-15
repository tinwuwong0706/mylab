import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import CustomizationPanel from '../Common/CustomizationPanel';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div id="app-shell">
      <div id="main-app">
        <Header toggleSidebar={toggleSidebar} />
        <div className="main-container">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <main className="content-area">
            <div className="module-container">
              <Outlet />
            </div>
          </main>
        </div>
        <Footer />
        <CustomizationPanel />
      </div>
    </div>
  );
};

export default Layout;