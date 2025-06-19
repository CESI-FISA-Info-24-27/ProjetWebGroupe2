import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import { SignupForm } from "./components/ui/signup-form";
import { ThemeProviderComponent } from "./components/app/ThemeProviderComponent.tsx";
import Navbar from "./components/shared/NavbarComponent.tsx";
import ProtectedRouteComponent from "./components/app/ProtectedRouteComponent.tsx";
import MyProfilePage from "./pages/MyProfilePage.tsx";
import NotFoundPage from "./components/404/NotFoundComponent.tsx";
import MessagesPage from "./pages/MessagesPage.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import { PostPage } from "./pages/PostPage.tsx";
import TagPage from "./pages/TagPage.tsx";
const App = () => {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/404";

  return (
    <ThemeProviderComponent defaultTheme="dark">
      <></>
      <div className="flex flex-row h-full w-full">
        {!hideSidebar && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteComponent>
                <Home />
              </ProtectedRouteComponent>
            }
          />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage form={<SignupForm />} />} />
          <Route
            path="/messages"
            element={
              <ProtectedRouteComponent>
                <MessagesPage />
              </ProtectedRouteComponent>
            }
          />
          <Route
            path="/myProfile"
            element={
              <ProtectedRouteComponent>
                <MyProfilePage />
              </ProtectedRouteComponent>
            }
          />
          <Route
            path="/profile/*"
            element={
              <ProtectedRouteComponent>
                <UserProfilePage />
              </ProtectedRouteComponent>
            }
          />
          <Route
            path="/tags/:tagId"
            element={
              <ProtectedRouteComponent>
                <TagPage />
              </ProtectedRouteComponent>
            }
          />
          <Route
            path="/post/:postId"
            element={
              <ProtectedRouteComponent>
                <PostPage />
              </ProtectedRouteComponent>
            }
          />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </ThemeProviderComponent>
  );
};

export default App;
