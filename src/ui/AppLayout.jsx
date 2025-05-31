import { Outlet, useLocation } from "react-router-dom";
import UserInfoHeader from "./components/UserInfoHeader";

export default function AppLayout() {
  const location = useLocation();

  const hideHeaderOnRoutes = [
    "/",
    "/login",
    "/login/guest",
    "/register",
    "/login-guest",
    "/reset-password",
    "/set-new-password",
  ];

  const shouldShowHeader = !hideHeaderOnRoutes.includes(location.pathname);

  return (
    <div className="h-screen w-screen relative">
      {shouldShowHeader && <UserInfoHeader />}
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
