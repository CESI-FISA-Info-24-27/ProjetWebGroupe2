import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

export default function NotFoundPage() {
  return (
    <div className="bg-[#18181B] w-screen h-screen">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <div className="text-lg w-full max-w-lg text-center mb-4">
          On ne sait pas trop comment vous vous êtes retrouvés ici, mais la page
          que vous cherchez est innaccessible, ou à été supprimée.
        </div>
        <NavLink to="/">
          <Button className="cursor-pointer">Retourner en lieu sûr ?</Button>
        </NavLink>
        <img
          src="https://media1.tenor.com/m/v5lxzTqe79AAAAAd/outer-wilds.gif"
          className="scale-75"
        ></img>
      </div>
    </div>
  );
}
