import { NavLink } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "../components/ui/sidebar";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar>
          <SidebarContent>
            <div className="flex items-center py-4 px-4">
              <NavLink to="/">
                <img
                  src="https://img.freepik.com/vecteurs-libre/nouvelle-conception-icone-x-du-logo-twitter-2023_1017-45418.jpg?semt=ais_hybrid&w=740"
                  alt="Logo"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </NavLink>
            </div>
            <div className="">  
              <SidebarMenu>
                <SidebarMenuItem>
                  <NavLink to="/" className="w-full">
                    <SidebarMenuButton className="flex pl-20 text-xl py-6 cursor-pointer hover:scale-105 transition-transform duration-200">
                      Home
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <NavLink to="/login" className="w-full">
                    <SidebarMenuButton className="flex pl-20 text-xl py-6 cursor-pointer hover:scale-105 transition-transform duration-200">
                      Login
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <NavLink to="/notifications" className="w-full">
                    <SidebarMenuButton className="flex pl-20 text-xl py-6 cursor-pointer hover:scale-105 transition-transform duration-200">
                      Notifications
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <NavLink to="/friends" className="w-full">
                    <SidebarMenuButton className="flex pl-20 text-xl py-6 cursor-pointer hover:scale-105 transition-transform duration-200">
                      Friend list
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <NavLink to="/settings" className="w-full">
                    <SidebarMenuButton className="flex pl-20 text-xl py-6 cursor-pointer hover:scale-105 transition-transform duration-200">
                      Paramètres
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <SidebarTrigger />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
