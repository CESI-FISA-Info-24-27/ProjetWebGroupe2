import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

export default function AdminPage() {
  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    if (user?.role !== "admin" && user?.role !== "moderator") {
      window.location.href = "/404";
    }
  }, []);
  return (
    <div className="flex flex-col items-center h-screen p-4 max-w-[100%] w-full">
      <h1 className="text-3xl font-bold mb-6">Page d'administration</h1>
      <p className="text-lg text-gray-700">
        Cette page est réservée aux administrateurs.
      </p>
    </div>
  );
}