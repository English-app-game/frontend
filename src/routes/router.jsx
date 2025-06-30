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
import GameOver from "../ui/pages/GameOver";
import { Error as ErrorPage } from "../ui/pages/Error";
import { ROUTES } from "./routes_consts";
import Auth from "../ui/components/Auth";
import MemoryGame  from "../ui/components/MemoryGame/MemoryGame";
import { notFound } from "../consts/strings";
import { cantGetIntoActiveRoom, cantGetIntoCreate, cantGetIntoGameOver, cantGetIntoHome, cantGetIntoLogin, cantGetIntoLoginGuest, cantGetIntoRegister, cantGetIntoResetPassword, cantGetIntoRoomsPage, cantGetIntoSetPassword, cantGetIntoStatistics, cantGetIntoWaitingRoom } from "./routesString";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage error={new Error(notFound)} />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
        errorElement: <ErrorPage error={new Error(cantGetIntoHome)} />,
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
        errorElement: <ErrorPage error={new Error(cantGetIntoLogin)} />,
      },
      {
        path: ROUTES.REGISTER,
        element: <Register />,
        errorElement: (
          <ErrorPage error={new Error(cantGetIntoRegister)} />
        ),
      },
      {
        path: ROUTES.LOGIN_GUEST,
        element: <LoginGuest />,
        errorElement: (
          <ErrorPage error={new Error(cantGetIntoLoginGuest)} />
        ),
      },
      {
        path: ROUTES.RESET_PASSWORD,
        element: <ResetPassword />,
        errorElement: (
          <ErrorPage error={new Error(cantGetIntoResetPassword)} />
        ),
      },
      {
        path: ROUTES.SET_NEW_PASSWORD,
        element: <SetNewPassword />,
        errorElement: (
          <ErrorPage error={new Error(cantGetIntoSetPassword)} />
        ),
      },
      {
        path: ROUTES.ROOMS_LIST,
        element: <ServersRoom />,
        errorElement: (
          <ErrorPage error={new Error(cantGetIntoRoomsPage)} />
        ),
      },
      {
        path: ROUTES.CREATE_ROOM,
        element: <CreateRoom />,
        errorElement: (
          <ErrorPage error={new Error(cantGetIntoCreate)} />
        ),
      },
      {
        path: ROUTES.STATISTICS,
        element: <Statistics />,
        errorElement: (
          <ErrorPage error={new Error(cantGetIntoStatistics)} />
        ),
      },
      {
        path: ROUTES.WAITING_ROOM(),
        element: <WaitingRoom />,
        errorElement: (
          <ErrorPage error={new Error(cantGetIntoWaitingRoom)} />
        ),
      },
      {
        path: ROUTES.ACTIVE_ROOM(),
        element: (
          // <Auth>
          <ActiveRoom />
          // </Auth>
        ),
        errorElement: (
          <ErrorPage error={new Error(cantGetIntoActiveRoom)} />
        ),
      },
      {
        path: ROUTES.GAME_OVER,
        element: <GameOver />,
        errorElement: (
          <ErrorPage error={new Error(cantGetIntoGameOver)} />
        ),
      },

    ],
  },
]);

export default router;
