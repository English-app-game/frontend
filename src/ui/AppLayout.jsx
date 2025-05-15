import { Outlet } from "react-router-dom";
import UserInfoHeader from "./components/UserInfoHeader";


export default function AppLayout() {
  return (
    <div className="h-screen w-screen relative">
      <UserInfoHeader />
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
