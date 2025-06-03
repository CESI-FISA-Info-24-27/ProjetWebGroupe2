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
                <SidebarMenu>
                  <SidebarMenuButton className="flex flex-row justify-center text-xl cursor-pointer mb-5 relative group pb-3 hover:scale-[1.03] transition-transform duration-200 after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4  after:h-px after:bg-gray-300 group-hover:after:bg-gray-400">
                Home
                </SidebarMenuButton>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="flex flex-row justify-center text-xl cursor-pointer mb-5 relative group pb-3 hover:scale-[1.03] transition-transform duration-200 after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:bg-gray-300 group-hover:after:bg-gray-400">Login</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="flex flex-row justify-center text-xl cursor-pointer mb-5 relative group pb-3 hover:scale-[1.03] transition-transform duration-200 after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:bg-gray-300 group-hover:after:bg-gray-400">Notifications</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="flex flex-row justify-center text-xl cursor-pointer mb-5 relative group pb-3 hover:scale-[1.03] transition-transform duration-200 after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:bg-gray-300 group-hover:after:bg-gray-400">Friend list</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="flex flex-row justify-center text-xl cursor-pointer mb-5 relative group pb-3 hover:scale-[1.03] transition-transform duration-200 after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:bg-gray-300 group-hover:after:bg-gray-400">Paramètres</SidebarMenuButton>
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
};