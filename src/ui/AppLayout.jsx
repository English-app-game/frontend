import useAuthRedirect from "../hooks/useAuthRedirect";
import { useLocation } from "react-router-dom";
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
  STATISTICS
} from "../routes/routes_consts";

const publicRoutes = [
  HOME,
  LOGIN,
  LOGIN_GUEST,
  REGISTER,
  RESET_PASSWORD,
  SET_NEW_PASSWORD,
];

export default function AppLayout() {
  const location = useLocation();
  const isPublic = publicRoutes.includes(location.pathname);
  const shouldShowHeader = !isPublic;
  const hideInMobile = [ROOMS_LIST, STATISTICS].includes(location.pathname);

  useAuthRedirect({ mode: isPublic ? "loggedOut" : "loggedIn" });

  return (
    <div className="h-screen w-screen relative">
      {shouldShowHeader && (
        <div className={`${hideInMobile ? "hidden sm:block" : "block"}`}>
          <UserInfoHeader />
        </div>
      )}
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
