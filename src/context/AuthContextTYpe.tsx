import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useState, useEffect } from "react";

interface UserInfo {
    role: string;
    userId: number;
    email: string;
    username: string;
    name:string;
  }
  
  interface AuthContextType {
    user: UserInfo | null;
    login: (token: string) => void;
    logout: () => void;
  }
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserInfo | null>(null);
  
    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const decoded: any = jwtDecode(token);
        setUser(decoded.userInfo); // Extraindo as informações do `userInfo`
      }
    }, []);
  
    const login = (token: string) => {
      const decoded: any = jwtDecode(token);
      setUser(decoded.userInfo); // Extraindo as informações do `userInfo`
      localStorage.setItem("authToken", token);
    };
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem("authToken");
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };