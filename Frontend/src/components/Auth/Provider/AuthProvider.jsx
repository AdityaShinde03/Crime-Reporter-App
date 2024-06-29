import React, { createContext, useState, useEffect } from "react";

// Create a context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [data, setData] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginData = (data) => {
    setData(data);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (loginData) {
      handleLoginData(loginData);
    }
  }, [loginData]);

  return (
    <AuthContext.Provider value={{ data, isAuthenticated, handleLoginData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;