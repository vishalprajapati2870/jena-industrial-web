import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  email: string;
  name: string;
  companyAddress: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string, companyAddress: string, phone?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load existing session on initial mount
    const storedUser = localStorage.getItem("customerUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user session", error);
      }
    }
  }, []);

  const login = (email: string, name: string, companyAddress: string, phone?: string) => {
    const newUser = { email, name, companyAddress, phone };
    setUser(newUser);
    localStorage.setItem("customerUser", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("customerUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
