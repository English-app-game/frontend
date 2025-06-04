import { Outlet, useLocation } from "react-router-dom";
import UserInfoHeader from "./components/UserInfoHeader";
import {
  HOME,
  LOGIN,
  LOGIN_GUEST,
  REGISTER,
  RESET_PASSWORD,
  SET_NEW_PASSWORD,
} from "../routes/routes_consts";

export default function AppLayout() {
  const location = useLocation();

  const hideHeaderOnRoutes = [
  HOME,
  LOGIN,
  LOGIN_GUEST,
  REGISTER,
  RESET_PASSWORD,
  SET_NEW_PASSWORD,
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
