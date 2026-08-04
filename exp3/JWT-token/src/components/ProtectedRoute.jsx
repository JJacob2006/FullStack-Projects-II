import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const location = useLocation();

  // If user is not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Admin route protection
  if (location.pathname === "/admin" && role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // User route protection
  if (location.pathname === "/dashboard" && role !== "user") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}