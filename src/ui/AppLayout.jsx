import useAuthRedirect from "../hooks/useAuthRedirect";
import { useLocation, matchPath } from "react-router-dom";
import { Outlet } from "react-router-dom";
import UserInfoHeader from "./components/UserInfoHeader";
import {
  HOME,
  LOGIN,
  LOGIN_GUEST,
  REGISTER,
  RESET_PASSWORD,
  SET_NEW_PASSWORD,
  ROOMS_LIST,
  STATISTICS,
  WAITING_ROOM,
} from "../routes/routes_consts";

const publicRoutes = [
  HOME,
  LOGIN,
  LOGIN_GUEST,
  REGISTER,
  RESET_PASSWORD,
];

export default function AppLayout() {
  const location = useLocation();
  const isResetPasswordPage = location.pathname.startsWith(`/${SET_NEW_PASSWORD}`);
  const isPublic = publicRoutes.includes(location.pathname);
  const shouldShowHeader = !isPublic;
  const desktopOnlyHeaderRoutes = [ROOMS_LIST, STATISTICS, WAITING_ROOM()];
  const shouldShowHeaderOnlyOnDesktop = desktopOnlyHeaderRoutes.some((route) =>
    matchPath(route, location.pathname)
  );

  if (!isResetPasswordPage) {
    useAuthRedirect({ mode: isPublic ? "loggedOut" : "loggedIn" });
  }

  return (
    <div className="h-screen w-screen relative">
      {shouldShowHeader && (
        <div
          className={`${
            shouldShowHeaderOnlyOnDesktop ? "hidden sm:block" : "block"
          }`}
        >
          <UserInfoHeader />
        </div>
      )}
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
