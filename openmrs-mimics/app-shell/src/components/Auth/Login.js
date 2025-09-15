import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateCredentials, generateUserData, saveUser, initializeAuth } from '../../utils/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Initialize auth state on app load
    const authState = initializeAuth();
    setCurrentUser(authState.currentUser);
    setIsLoggedIn(authState.isAuthenticated);
    setIsInitializing(false);
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    saveUser(userData);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    isLoggedIn,
    isInitializing,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isInitializing } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (!isInitializing && localStorage.getItem('currentUser')) {
      navigate('/dashboard');
    }
  }, [isInitializing, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (validateCredentials(username, password)) {
        const userData = generateUserData(username);
        login(userData);
        navigate('/dashboard');
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect fill='%230078a8' width='100' height='100' rx='10'/><path fill='white' d='M65 30H35c-2.8 0-5 2.2-5 5v30c0 2.8 2.2 5 5 5h30c2.8 0 5-2.2 5-5V35c0-2.8-2.2-5-5-5zm-5 15H40c-1.1 0-2-.9-2-2s.9-2 2-2h20c1.1 0 2 .9 2 2s-.9 2-2 2zm0 8H40c-1.1 0-2-.9-2-2s.9-2 2-2h20c1.1 0 2 .9 2 2s-.9 2-2 2zm0 8H40c-1.1 0-2-.9-2-2s.9-2 2-2h20c1.1 0 2 .9 2 2s-.9 2-2 2z'/></svg>" alt="OpenMRS-like Logo" />
        </div>
        <div className="login-header">
          <h2>Welcome to OpenMRS-like EMR</h2>
          <p>Please sign in to continue</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit" 
            className="btn"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        {error && (
          <div className="error-message show">
            {error}
          </div>
        )}
        {/* Demo credentials hint */}
        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>
          <p>Demo: Any username/password will work</p>
        </div>
      </div>
    </div>
  );
};

export default Login;