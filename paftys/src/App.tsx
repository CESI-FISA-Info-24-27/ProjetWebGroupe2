import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import { SignupForm } from "./components/ui/signup-form";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import Navbar from "./components/NavbarComponent.tsx";

const App = () => {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex w-full">
      <div className="w-[20%]">
        {!hideSidebar && <Navbar />}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage form={<SignupForm />} />} />
      </Routes>
      </div>

    </ThemeProvider>
  );
};

export default App;
