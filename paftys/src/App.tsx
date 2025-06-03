import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import { SignupForm } from "./components/ui/signup-form";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/navbar-component.tsx";

const App = () => {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <ThemeProvider>
      {!hideSidebar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage form={<SignupForm />} />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
