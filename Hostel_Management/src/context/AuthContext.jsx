import { useState, useEffect } from "react";
import AuthContext from "./auth-context";

export const AuthProvider = ({ children }) => {
  // Pull directly from localStorage during initialization to prevent refresh logouts
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [role, setRole] = useState(() => localStorage.getItem("role") || "student");

  // LOGIN FUNCTION
  const login = (newToken, userRole = "student") => {
    if (!newToken) return;
    
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", userRole);

    setToken(newToken);
    setRole(userRole);
  };

  // LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setToken(null);
    setRole("student");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};