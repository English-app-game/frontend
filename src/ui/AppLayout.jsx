import { Outlet, useLocation } from "react-router-dom";
import UserInfoHeader from "./components/UserInfoHeader";

export default function AppLayout() {
  const location = useLocation();
  const hideInMobile = ["/rooms", "/statistics"].includes(location.pathname);

  return (
    <div className="h-screen w-screen relative">
      <div className={`${hideInMobile ? "hidden sm:block" : "block"}`}>
        <UserInfoHeader />
      </div>
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
