import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { useStateContext } from "../Provider/StateProvider";

function ProtectedRoute({ children, role }) {
  const { user } = useStateContext();

  console.log("ProtectedRoute:", user);

  // User is not logged in
  if (!user) {
    if (role === "user") {
      return <Navigate to="/user-login" replace />;
    }

    if (role === "officer") {
      return <Navigate to="/officer-login" replace />;
    }

    if (role === "admin") {
      return <Navigate to="/admin-login" replace />;
    }
  }

  // Check role
  if (user !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;