import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../ui/AppLayout";
import Home from "../ui/pages/Home";
import Login from "../ui/pages/Login/Login";
import LoginGuest from "../ui/pages/LoginGuest";
import Register from "../ui/pages/Register";
import ServersRoom from "../ui/pages/ServersRoom";
import CreateRoom from "../ui/pages/CreateRoom/CreateRoom";
import WaitingRoom from "../ui/pages/WaitingRoom/components/WaitingRoom";
import ActiveRoom from "../ui/pages/ActiveRoom";
import ResetPassword from "../ui/pages/ResetPassword";
import SetNewPassword from "../ui/pages/SetNewPassword";
import Statistics from "../ui/pages/Statistics/index";
import { Error as ErrorPage } from "../ui/pages/Error";
import { ROUTES } from "./routes_consts";
import ProtectedRoute from "../auth/ProtectedRoute";
import PublicRoute from "../auth/PublicRoute";


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage error={new Error("404 not found")} />,
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <PublicRoute>
            <Home />
          </PublicRoute>
        ),
        errorElement: <ErrorPage error={new Error("Can't get into home")} />,
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
        errorElement: <ErrorPage error={new Error("Can't get into login")} />,
      },
      {
        path: ROUTES.REGISTER,
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
        errorElement: (
          <ErrorPage error={new Error("Can't get into register page")} />
        ),
      },
      {
        path: ROUTES.LOGIN_GUEST,
        element: (
          <PublicRoute>
            <LoginGuest />
          </PublicRoute>
        ),
        errorElement: (
          <ErrorPage error={new Error("Can't get into login guest page")} />
        ),
      },
      {
        path: ROUTES.RESET_PASSWORD,
        element: (<PublicRoute>
          <ResetPassword />
        </PublicRoute>
        ),
        errorElement: (
          <ErrorPage error={new Error("Can't get into reset password room")} />
        ),
      },
      {
        path: ROUTES.SET_NEW_PASSWORD,
        element: (
          <PublicRoute>
            <SetNewPassword />
          </PublicRoute>
        ),
        errorElement: (
          <ErrorPage error={new Error("Can't get into reset password room")} />
        ),
      },
      {
        path: ROUTES.ROOMS_LIST,
        element: (
          <ProtectedRoute>
            <ServersRoom />
          </ProtectedRoute>
        ),
        errorElement: (
          <ErrorPage error={new Error("Can't get into rooms list page")} />
        ),
      },
      {
        path: ROUTES.CREATE_ROOM,
        element: (
          <ProtectedRoute>
            <CreateRoom />
          </ProtectedRoute>
        ),
        errorElement: (
          <ErrorPage error={new Error("Can't get into create room page")} />
        ),
      },
      {
        path: ROUTES.STATISTICS,
        element: (
          <ProtectedRoute>
            <Statistics />
          </ProtectedRoute>
        ),
        errorElement: (
          <ErrorPage error={new Error("Can't get into statistics page")} />
        ),
      },
      {
        path: ROUTES.WAITING_ROOM(),
        element: (
          <ProtectedRoute>
            <WaitingRoom />
          </ProtectedRoute>
        ),
        errorElement: (
          <ErrorPage error={new Error("Can't get into waiting room")} />
        ),
      },
      {
        path: ROUTES.ACTIVE_ROOM(),
        element: (
          <ProtectedRoute>
            <ActiveRoom />
          </ProtectedRoute>
        ),
        errorElement: (
          <ErrorPage error={new Error("Can't get into active room")} />
        ),
      },
    ],
  },
]);
export default router;
