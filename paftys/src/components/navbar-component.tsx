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
            <div className="flex justify-center items-center py-6">
              <a href="/">
                <img
                  src="https://img.freepik.com/vecteurs-libre/nouvelle-conception-icone-x-du-logo-twitter-2023_1017-45418.jpg?semt=ais_hybrid&w=740"
                  alt="Logo"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </a>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <a href="/" className="w-full">
                  <SidebarMenuButton className="flex justify-center text-xl py-6 cursor-pointer hover:scale-105 transition-transform duration-200">
                    Home
                  </SidebarMenuButton>
                </a>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <a href="/login" className="w-full">
                  <SidebarMenuButton className="flex justify-center text-xl py-6 cursor-pointer hover:scale-105 transition-transform duration-200">
                    Login
                  </SidebarMenuButton>
                </a>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <a href="/notifications" className="w-full">
                  <SidebarMenuButton className="flex justify-center text-xl py-6 cursor-pointer hover:scale-105 transition-transform duration-200">
                    Notifications
                  </SidebarMenuButton>
                </a>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <a href="/friends" className="w-full">
                  <SidebarMenuButton className="flex justify-center text-xl py-6 cursor-pointer hover:scale-105 transition-transform duration-200">
                    Friend list
                  </SidebarMenuButton>
                </a>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <a href="/settings" className="w-full">
                  <SidebarMenuButton className="flex justify-center text-xl py-6 cursor-pointer hover:scale-105 transition-transform duration-200">
                    Paramètres
                  </SidebarMenuButton>
                </a>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <SidebarTrigger />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
