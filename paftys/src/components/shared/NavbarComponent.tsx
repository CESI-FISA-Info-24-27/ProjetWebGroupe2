import logo from "@/assets/p_logo_paftys.svg";
import { logout } from "@/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "./ModeToggleComponent";
import isEmptyHelper from "@/utils/isEmptyHelper";

export default function RightSidebar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  const linkClass = (isActive: boolean) =>
    `w-full transition-all duration-300 ease-in-out ${
      isActive ? "text-purple-700 translate-x-2" : "hover:translate-x-1"
    }`;

  return (
    <>
      <div className="hidden md:block">
        <div className="flex mr-6 h-full w-full flex-col justify-between bg-sidebar text-sidebar-foreground border-r border-sidebar-border items-center pt-4 pb-6">
          {/* Haut de la navbar */}
          <div className="flex flex-col items-center gap-7 w-full">
            <NavLink to="/" className="w-full flex justify-center">
              <img
                src={logo}
                alt="Logo"
                className="w-14 h-14 rounded-full object-cover cursor-pointer transition-transform duration-300 hover:translate-y-[-2px]"
              />
            </NavLink>
            <NavLink to="/" className={({ isActive }) => linkClass(isActive)}>
              <div className="flex p-2 pl-10 text-2xl cursor-pointer pr-4">
                <div className="flex items-center gap-4">
                  <i className="bi bi-house leading-none align-middle"></i>
                  Accueil
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/messages"
              className={({ isActive }) => linkClass(isActive)}
            >
              <div className="flex p-2 pl-10 text-2xl cursor-pointer pr-4">
                <div className="flex items-center gap-4">
                  <i className="bi bi-chat-left leading-none align-middle"></i>
                  Messages
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/myProfile"
              className={({ isActive }) => linkClass(isActive)}
            >
              <div className="flex p-2 pl-10 text-2xl cursor-pointer pr-4">
                <div className="flex items-center gap-4">
                  <i className="bi bi-person leading-none align-middle"></i>
                  Mon profil
                </div>
              </div>
            </NavLink>
            <NavLink
              to="/admin"
              hidden={isEmptyHelper(user) || (user?.role !== "admin" && user?.role !== "moderator")}
              className={({ isActive }) => linkClass(isActive)}
            >
              <div className="flex p-2 pl-10 text-2xl cursor-pointer pr-4">
                <div className="flex items-center gap-4">
                  <i className="bi bi-gear leading-none align-middle"></i>
                  Modération
                </div>
              </div>
            </NavLink>
          </div>

          {/* Bas de la navbar : bouton Déconnexion */}
          <div className="w-full flex flex-row items-center justify-between px-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 text-red-500 cursor-pointer hover:scale-102 text-xl py-2 w-full rounded-md"
            >
              <i className="bi bi-box-arrow-right leading-none align-middle"></i>
              Déconnexion
            </button>
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* Barre de navigation mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-sidebar text-sidebar-foreground border-t border-sidebar-border flex justify-around items-center py-2 md:hidden">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-2xl transition-transform duration-300 ${
              isActive ? "text-purple-700 -translate-y-1" : ""
            }`
          }
        >
          <i className="bi bi-house"></i>
        </NavLink>
        <NavLink
          to="/messages"
          className={({ isActive }) =>
            `text-2xl transition-transform duration-300 ${
              isActive ? "text-purple-700 -translate-y-1" : ""
            }`
          }
        >
          <i className="bi bi-chat-left"></i>
        </NavLink>
        <NavLink
          to="/myProfile"
          className={({ isActive }) =>
            `text-2xl transition-transform duration-300 ${
              isActive ? "text-purple-700 -translate-y-1" : ""
            }`
          }
        >
          <i className="bi bi-person"></i>
        </NavLink>
        {!(isEmptyHelper(user) || (user?.role !== "admin" && user?.role !== "moderator")) && (
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `text-2xl transition-transform duration-300 ${
              isActive ? "text-purple-700 -translate-y-1" : ""
              }`
            }
            >
                <i className="bi bi-gear"></i>            
          </NavLink>
        )}
        <ModeToggle />
      </div>
    </>
  );
}
