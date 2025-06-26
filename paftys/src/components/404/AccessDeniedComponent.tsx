import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

export default function AccessDenied() {
  return (
    <div className="bg-background text-foreground w-screen h-screen transition-colors">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-4xl font-bold mb-4">403</h1>
        <div className="text-lg w-full max-w-lg text-center mb-4">
          Accès refusé. Vous avez été banni.
        </div>
        <NavLink to="/login">
          <Button className="cursor-pointer">Retourner à la connexion</Button>
        </NavLink>
        <img
          src="https://www.wpsignalisation.com/wp-content/uploads/2018/06/panneau-d-interdiction-sens-interdit-a-tout-vehicule-b1.png"
          className="w-50 m-10"
          alt="404"
        />
      </div>
    </div>
  );
}