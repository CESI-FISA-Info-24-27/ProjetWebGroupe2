import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import { SignupForm } from "./components/ui/signup-form";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import Navbar from "./components/NavbarComponent.tsx";
import ProtectedRoute from "./components/ProtectedRoute";
import MyProfilePage from "./pages/MyProfilePage.tsx";

const App = () => {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <ThemeProvider defaultTheme="dark">
      <></>
      <div className="flex flex-row h-full w-full">
        {!hideSidebar && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage form={<SignupForm />} />} />
          <Route path="/myProfile" element={<MyProfilePage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
