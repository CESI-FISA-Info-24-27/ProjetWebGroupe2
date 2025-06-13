import logo from "@/assets/p_logo_paftys.svg";
import { NavLink } from "react-router-dom";
export default function RightSidebar() {
  return (
    <>
      <div className="hidden md:block md:w-[20%]">
        <div className="flex h-full w-full flex-col bg-[#18181B] border-r border-gray-700 items-center justify-start gap-7 pt-4">
          <NavLink to="/" className="w-full flex justify-center">
            <img
              src={logo}
              alt="Logo"
              className="w-14 h-14 rounded-full object-cover cursor-pointer transition-transform duration-300 hover:translate-y-[-2px]"
            />
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              (isActive ? "bg-purple-700" : "") + " w-full"
            }
          >
            <div className="flex p-2 pl-10 text-2xl cursor-pointer hover:scale-102 transition-transform duration-200 pr-4">
              <div className="flex items-center gap-4">
                <i className="bi bi-house leading-none align-middle"></i>
                Accueil
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              (isActive ? "bg-purple-700" : "") + " w-full"
            }
          >
            <div className="flex p-2 pl-10 text-2xl cursor-pointer hover:scale-102 transition-transform duration-200 pr-4">
              <div className="flex items-center gap-4">
                <i className="bi bi-chat-left leading-none align-middle"></i>
                Messages
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              (isActive ? "bg-purple-700" : "") + " w-full"
            }
          >
            <div className="flex p-2 pl-10 text-2xl cursor-pointer hover:scale-102 transition-transform duration-200 pr-4">
              <div className="flex items-center gap-4">
                <i className="bi bi-bell leading-none align-middle"></i>
                Notifications
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/myProfile"
            className={({ isActive }) =>
              (isActive ? "bg-purple-700" : "") + " w-full"
            }
          >
            <div className="flex p-2 pl-10 text-2xl cursor-pointer hover:scale-102 transition-transform duration-200 pr-4">
              <div className="flex items-center gap-4">
                <i className="bi bi-person leading-none align-middle"></i>
                Mon profil
              </div>
            </div>
          </NavLink>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#18181B] border-t border-gray-700 flex justify-around items-center py-2 md:hidden">
        <NavLink to="/">
          <i className="bi bi-house text-2xl text-white"></i>
        </NavLink>
        <NavLink to="/login">
          <i className="bi bi-chat-left text-2xl text-white"></i>
        </NavLink>
        <NavLink to="/notifications">
          <i className="bi bi-bell text-2xl text-white"></i>
        </NavLink>
        <NavLink to="/myProfile">
          <i className="bi bi-person text-2xl text-white"></i>
        </NavLink>
      </div>
    </>
  );
}
