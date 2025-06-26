import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import type { JSX } from "react";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRouteComponent = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const token = Cookies.get("token");

  if (loading) return null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.state === "banned") {
    return <Navigate to="/access-denied" replace />;
  }
  // Auth OK → afficher la page
  return children;
};

export default ProtectedRouteComponent;
