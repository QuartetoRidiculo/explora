import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/layout/Loading";

export function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ROLE_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}