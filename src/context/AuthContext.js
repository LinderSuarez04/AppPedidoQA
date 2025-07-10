import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [businessUnit, setBusinessUnit] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const selectBusinessUnit = (unit) => {
    setBusinessUnit(unit);
  };

  const logout = () => {
    setUser(null);
    setBusinessUnit(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    businessUnit,
    isAuthenticated,
    login,
    selectBusinessUnit,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
