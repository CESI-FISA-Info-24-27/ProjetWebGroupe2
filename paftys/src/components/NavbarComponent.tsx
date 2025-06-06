import { NavLink, useNavigate } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/reducers/authSlice";

import logo from "@/assets/p_logo_paftys.svg";

export default function SideBarComponent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarContent className="flex flex-col justify-between h-full">
            <div>
              <div className="flex flex-col items-center justify-center pt-4 cursor-pointer transition-transform duration-300 hover:translate-y-[-2px] w-full">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <SidebarMenu>
                <SidebarMenuItem>
                  <NavLink to="/" className="w-full">
                    <SidebarMenuButton className="flex pl-10 text-2xl py-8 cursor-pointer hover:scale-102 transition-transform duration-200">
                      <div className="flex items-center gap-4">
                        <i className="bi bi-house leading-none align-middle"></i>
                        Accueil
                      </div>
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <NavLink to="/login" className="w-full">
                    <SidebarMenuButton className="flex pl-10 text-2xl py-8 cursor-pointer hover:scale-102 transition-transform duration-200">
                      <div className="flex items-center gap-4">
                        <i className="bi bi-chat-left leading-none align-middle"></i>
                        Messages
                      </div>
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <NavLink to="/notifications" className="w-full">
                    <SidebarMenuButton className="flex pl-10 text-2xl py-8 cursor-pointer hover:scale-102 transition-transform duration-200">
                      <div className="flex items-center gap-4">
                        <i className="bi bi-bell leading-none align-middle"></i>
                        Notifications
                      </div>
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <NavLink to="/myProfile" className="w-full">
                    <SidebarMenuButton className="flex pl-10 text-2xl py-8 cursor-pointer hover:scale-102 transition-transform duration-200">
                      <div className="flex items-center gap-4">
                        <i className="bi bi-person leading-none align-middle"></i>
                        Mon profil
                      </div>
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>

            {/* 🔘 Logout Button */}
            <div className="mb-4 w-full">
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="flex pl-10 text-2xl py-8 cursor-pointer hover:scale-102 transition-transform duration-200 text-red-500"
                >
                  <div className="flex items-center gap-4">
                    <i className="bi bi-box-arrow-right leading-none align-middle"></i>
                    Déconnexion
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </div>
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
