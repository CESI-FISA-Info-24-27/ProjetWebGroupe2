import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import type { JSX } from "react";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRouteComponent = ({ children }: ProtectedRouteProps) => {
  const { loading } = useAppSelector((state) => state.auth);
  const token = Cookies.get("token");

  // Tant que Redux est en train de charger (ex: après login)
  if (loading) return null; // ou un spinner si tu veux

  // Pas de token → redirection vers login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Auth OK → afficher la page
  return children;
};

export default ProtectedRouteComponent;
