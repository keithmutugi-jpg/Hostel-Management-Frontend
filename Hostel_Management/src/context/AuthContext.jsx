import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState("student"); // default role (backend will override later)

  // Load auth data on app start
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (savedToken) {
      setToken(savedToken);
    }

    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  // LOGIN FUNCTION
  const login = (newToken, userRole = "student") => {
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

// Custom hook for easy usage
export const useAuth = () => useContext(AuthContext);