import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <div className="text-center mt-20">Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
