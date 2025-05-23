import { Outlet } from "react-router-dom";
import UserInfoHeader from "./components/UserInfoHeader";
import useAuthRedirect from "../hooks/useAuthRedirect";

export default function AppLayout() {
  
  useAuthRedirect();

  return (
      <div className="h-screen w-screen relative">
      <UserInfoHeader />
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
