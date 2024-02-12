// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   

  const login = (formData) => {
    localStorage.setItem('isLogin', '1');
    localStorage.setItem('email', formData.user.email);
    localStorage.setItem('username', formData.user.fullname);

    setIsLoggedIn(true);
  };
  
  const logout = () => {
    localStorage.setItem('isLogin', '0');
    localStorage.setItem('email', '');
    localStorage.setItem('username', '');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;