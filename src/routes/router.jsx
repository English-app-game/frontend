import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../ui/AppLayout";
import Home from "../ui/pages/Home";
import Login from "../ui/pages/Login";
import LoginGuest from "../ui/pages/LoginGuest";
import Register from "../ui/pages/Register";
import ServersRoom from "../ui/pages/ServersRoom";
import CreateRoom from "../ui/pages/CreateRoom/CreateRoom";
import WaitingRoom from "../ui/pages/WaitingRoom/components/WaitingRoom";
import ActiveRoom from "../ui/pages/ActiveRoom";
import { Error as ErrorPage } from "../ui/pages/Error";
import { ROUTES } from "./routes_consts";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage error={new Error("404 not found")} />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
        errorElement: <ErrorPage error={new Error("Can't get into home")} />,
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
        errorElement: <ErrorPage error={new Error("Can't get into login")} />,
      },
      {
        path: ROUTES.REGISTER,
        element: <Register />,
        errorElement: (
          <ErrorPage error={new Error("Can't get into register page")} />
        ),
      },
      {
        path: ROUTES.LOGIN_GUEST,
        element: <LoginGuest />,
        errorElement: (
          <ErrorPage error={new Error("Can't get into login guest page")} />
        ),
      },
      {
        path: ROUTES.ROOMS_LIST,
        element: <ServersRoom />,
        errorElement: (
          <ErrorPage error={new Error("Can't get into rooms list page")} />
        ),
      },
      {
        path: ROUTES.CREATE_ROOM,
        element: <CreateRoom />,
        errorElement: (
          <ErrorPage error={new Error("Can't get into create room page")} />
        ),
      },
      {
        path: ROUTES.WAITING_ROOM(),
        element: <WaitingRoom />,
        errorElement: (
          <ErrorPage error={new Error("Can't get into waiting room")} />
        ),
      },
      {
        path: ROUTES.ACTIVE_ROOM(),
        element: <ActiveRoom />,
        errorElement: (
          <ErrorPage error={new Error("Can't get into active room")} />
        ),
      },
    ],
  },
]);

export default router;
