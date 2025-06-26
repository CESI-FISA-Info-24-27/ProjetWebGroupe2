import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signup } from "@/reducers/authSlice";
import { Link } from "react-router-dom";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return alert("Les mots de passe sont différents");

    const result = await dispatch(signup({ email, password, userName }));
    if (signup.fulfilled.match(result)) {
      setSuccessMessage(
        "🎉 Compte créé ! Vérifiez votre e-mail pour valider votre inscription."
      );
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Créez votre compte</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Entrez vos informations afin de vous inscrire.
        </p>
      </div>

      {successMessage && (
        <p className="text-green-600 text-sm text-center">{successMessage}</p>
      )}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Pseudo</Label>
          <Input
            id="name"
            type="text"
            placeholder="Xxx_DarkSasuke15_xxX"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="exemple@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirm-password">Confirmez le mot de passe</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={loading}
        >
          {loading ? "Création..." : "S'enregistrer"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Vous avez déjà un compte ?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Se connecter
        </Link>
      </div>
    </form>
  );
}
