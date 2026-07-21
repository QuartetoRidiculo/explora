import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function UserRoute() {
  const { user } = useAuth();

  if (user && user.role !== "ROLE_USER") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
