import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PublicAuthRoute() {
  const { isAuthenticated } = useAuth();

  // If already authenticated, they shouldn't see the login page again.
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}
