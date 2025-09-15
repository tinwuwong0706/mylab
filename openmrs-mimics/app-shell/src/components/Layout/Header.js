import React from 'react';
import { useAuth } from '../Auth/Login';

const Header = ({ toggleSidebar }) => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="navbar">
      <button className="menu-toggle" id="menu-toggle" onClick={toggleSidebar}>☰</button>
      <div className="navbar-brand">
        <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect fill='white' width='100' height='100' rx='10'/><path fill='%230078a8' d='M65 30H35c-2.8 0-5 2.2-5 5v30c0 2.8 2.2 5 5 5h30c2.8 0 5-2.2 5-5V35c0-2.8-2.2-5-5-5zm-5 15H40c-1.1 0-2-.9-2-2s.9-2 2-2h20c1.1 0 2 .9 2 2s-.9 2-2 2zm0 8H40c-1.1 0-2-.9-2-2s.9-2 2-2h20c1.1 0 2 .9 2 2s-.9 2-2 2zm0 8H40c-1.1 0-2-.9-2-2s.9-2 2-2h20c1.1 0 2 .9 2 2s-.9 2-2 2z'/></svg>" alt="OpenMRS-like Logo" />
        <span>OpenMRS-like EMR</span>
      </div>
      <div className="user-info">
        <span id="user-display">{currentUser?.displayName}</span>
        <span className="user-actions" id="logout-btn" onClick={logout}>(Logout)</span>
      </div>
    </header>
  );
};

export default Header;