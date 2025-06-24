import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Vérification en cours...");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  const baseUrl = import.meta.env.VITE_DB_URI;

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setMessage("Lien invalide.");
      setStatus("error");
      return;
    }

    axios
      .post(`${baseUrl}/api/users/verify-email`, { token })
      .then((res) => {
        setMessage(res.data.message || "Email vérifié avec succès !");
        setStatus("success");
      })
      .catch((err) => {
        setMessage(
          err.response?.data?.message || "Erreur lors de la vérification."
        );
        setStatus("error");
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-4">
          {status === "success" ? (
            <span className="text-5xl">✅</span>
          ) : status === "error" ? (
            <span className="text-5xl">❌</span>
          ) : (
            <span className="text-5xl animate-spin inline-block">🔄</span>
          )}
        </div>
        <h2
          className={`text-2xl font-bold mb-2 ${
            status === "success"
              ? "text-green-600"
              : status === "error"
              ? "text-red-600"
              : "text-blue-600"
          }`}
        >
          {status === "success"
            ? "Succès"
            : status === "error"
            ? "Erreur"
            : "Vérification en cours..."}
        </h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}
