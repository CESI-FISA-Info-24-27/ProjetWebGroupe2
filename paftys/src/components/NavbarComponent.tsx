import { NavLink } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";

import logo from "@/assets/p_logo_paftys.svg";

export default function SideBarComponent() {
  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar>
          <SidebarContent>
            <div className="flex flex-col items-center justify-center pt-4 cursor-pointer transition-transform duration-300 hover:translate-y-[-2px]">
              <img
                src={logo}
                alt="Logo"
                className="w-14 h-14 rounded-full object-cover"
              />
            </div>
            <div>
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
                  <NavLink to="/settings" className="w-full">
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
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
