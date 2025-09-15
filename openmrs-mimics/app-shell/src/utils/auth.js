// Authentication utility functions

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is authenticated
 */
export const isAuthenticated = () => {
  const user = localStorage.getItem('currentUser');
  return !!user;
};

/**
 * Get current user data
 * @returns {Object|null} User object or null if not authenticated
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

/**
 * Save user data to localStorage
 * @param {Object} userData - User data to save
 */
export const saveUser = (userData) => {
  localStorage.setItem('currentUser', JSON.stringify(userData));
};

/**
 * Remove user data from localStorage (logout)
 */
export const removeUser = () => {
  localStorage.removeItem('currentUser');
};

/**
 * Validate login credentials
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {boolean} True if credentials are valid
 */
export const validateCredentials = (username, password) => {
  // For demo purposes, any non-empty credentials will work
  // In a real application, this would call an API
  return username.trim() !== '' && password.trim() !== '';
};

/**
 * Generate user data from credentials
 * @param {string} username - Username
 * @returns {Object} User data object
 */
export const generateUserData = (username) => {
  return {
    username: username,
    displayName: username.charAt(0).toUpperCase() + username.slice(1),
    role: 'admin',
    id: Date.now().toString(),
    loginTime: new Date().toISOString()
  };
};

/**
 * Check if user session is still valid
 * @returns {boolean} True if session is valid
 */
export const isSessionValid = () => {
  const user = getCurrentUser();
  if (!user) return false;
  
  // Check if session is older than 8 hours (for demo purposes)
  if (user.loginTime) {
    const loginTime = new Date(user.loginTime);
    const currentTime = new Date();
    const hoursDiff = (currentTime - loginTime) / (1000 * 60 * 60);
    return hoursDiff < 8;
  }
  
  return true;
};

/**
 * Refresh user session
 */
export const refreshSession = () => {
  const user = getCurrentUser();
  if (user) {
    user.loginTime = new Date().toISOString();
    saveUser(user);
  }
};

/**
 * Check if user has specific role
 * @param {string} role - Role to check
 * @returns {boolean} True if user has the role
 */
export const hasRole = (role) => {
  const user = getCurrentUser();
  return user && user.role === role;
};

/**
 * Get user permissions based on role
 * @returns {Array} Array of permissions
 */
export const getUserPermissions = () => {
  const user = getCurrentUser();
  if (!user) return [];
  
  // Define permissions based on roles
  const permissions = {
    admin: [
      'view_patients',
      'edit_patients',
      'delete_patients',
      'view_reports',
      'generate_reports',
      'manage_users',
      'system_settings'
    ],
    doctor: [
      'view_patients',
      'edit_patients',
      'view_reports'
    ],
    nurse: [
      'view_patients',
      'edit_patients'
    ]
  };
  
  return permissions[user.role] || [];
};

/**
 * Check if user has specific permission
 * @param {string} permission - Permission to check
 * @returns {boolean} True if user has the permission
 */
export const hasPermission = (permission) => {
  const permissions = getUserPermissions();
  return permissions.includes(permission);
};

/**
 * Logout user and clear all auth data
 */
export const logoutUser = () => {
  removeUser();
  // Clear any other auth-related data
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_session');
};

/**
 * Initialize authentication state
 * @returns {Object} Initial auth state
 */
export const initializeAuth = () => {
  const user = getCurrentUser();
  const authenticated = !!user && isSessionValid();
  
  if (authenticated) {
    refreshSession();
  } else if (user) {
    // Session expired, logout
    logoutUser();
  }
  
  return {
    isAuthenticated: authenticated,
    currentUser: authenticated ? user : null,
    permissions: authenticated ? getUserPermissions() : []
  };
};

export default {
  isAuthenticated,
  getCurrentUser,
  saveUser,
  removeUser,
  validateCredentials,
  generateUserData,
  isSessionValid,
  refreshSession,
  hasRole,
  getUserPermissions,
  hasPermission,
  logoutUser,
  initializeAuth
};