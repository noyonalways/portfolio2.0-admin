import { selectToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import React from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IProps> = ({ children }) => {
  const token = useAppSelector(selectToken);

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
