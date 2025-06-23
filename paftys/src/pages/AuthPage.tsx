import fullLogo from "@/assets/full_logo_paftys.svg";
import logo from "@/assets/p_logo_paftys.svg";
import { LoginForm } from "@/components/ui/login-form";
import { Link } from "react-router-dom";

export default function AuthPage({ form }: { form?: React.ReactNode }) {
  return (
    <div className="grid min-h-svh w-full lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            Paftys
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{form || <LoginForm />}</div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img src={fullLogo} alt="logo" className="h-full w-full scale-75" />
      </div>
    </div>
  );
}
