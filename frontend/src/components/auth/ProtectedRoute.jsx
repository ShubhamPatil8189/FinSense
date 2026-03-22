import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  
  // If no token exists, firmly kick the user to the login screen
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Render child routes if logged in
  return <Outlet />;
};
