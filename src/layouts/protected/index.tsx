import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IProps> = ({ children }) => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();

  if (!token) {
    console.log("No token found, redirecting to login.");
    return (
      <Navigate to="/auth/login" replace={true} state={{ from: location }} />
    );
  }

  return children;
};

export default ProtectedRoute;
