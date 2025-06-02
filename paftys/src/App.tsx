import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import { SignupForm } from "./components/ui/signup-form";
import { ThemeProvider } from "./components/theme-provider";
import { Sidebar } from "lucide-react";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Sidebar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage form={<SignupForm />} />} />
        </Routes>
        </Sidebar>
      </Router>
    </ThemeProvider>
  );
};

export default App;
