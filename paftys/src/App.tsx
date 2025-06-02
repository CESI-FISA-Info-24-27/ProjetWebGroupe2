import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import { SignupForm } from "./components/ui/signup-form";
import { ThemeProvider } from "./components/theme-provider";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "./components/ui/sidebar";


const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <SidebarProvider>
          <div className="flex">
            <Sidebar>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Home</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Login</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <SidebarTrigger />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/signup" element={<AuthPage form={<SignupForm />} />} />
              </Routes>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </Router>
    </ThemeProvider>
  );
};


export default App;
