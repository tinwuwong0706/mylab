import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { route: 'dashboard', icon: '📊', label: 'Dashboard' },
    { route: 'patients', icon: '👥', label: 'Patients' },
    { route: 'clinical', icon: '🏥', label: 'Clinical' },
    { route: 'reports', icon: '📈', label: 'Reports' },
    { route: 'system', icon: '⚙️', label: 'System Administration' }
  ];

  const handleNavigation = (route) => {
    navigate(`/${route}`);
    toggleSidebar();
  };

  const isActive = (route) => {
    return location.pathname === `/${route}` || 
           (location.pathname === '/' && route === 'dashboard');
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
      <div className="sidebar-header">Navigation</div>
      <ul className="nav-menu">
        {navItems.map((item) => (
          <li
            key={item.route}
            className={`nav-item ${isActive(item.route) ? 'active' : ''}`}
            onClick={() => handleNavigation(item.route)}
          >
            <i>{item.icon}</i> <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;