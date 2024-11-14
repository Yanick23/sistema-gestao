import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContextTYpe";

interface PrivateRouteProps {
    children: React.ReactNode;
    allowedRoles: string[];
  }
  
  const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
    const { user } = useAuth();
  
    if (!user) {
      return <Navigate to="/" />;
    }
  
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/admin" />;
    }
  
    return <>{children}</>;
  };
  
  export default PrivateRoute;