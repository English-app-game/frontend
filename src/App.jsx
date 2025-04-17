import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/pages/Home";
import Login from "./ui/pages/Login";
import LoginGuest from "./ui/pages/LoginGuest";
import Register from "./ui/pages/Register";
import ServersRoom from "./ui/pages/ServersRoom";
import CreateRoom from "./ui/pages/CreateRoom";
import WaitingRoom from "./ui/pages/WaitingRoom";
import ActiveRoom from "./ui/pages/ActiveRoom";
import { Error as ErrorPage } from "./ui/pages/Error";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <ErrorPage error={new Error("404 not found")} />,
      children: [
        {
          path: "/",
          element: <Home />,
          errorElement: <ErrorPage error={new Error("cant get into home")} />,
        },
        {
          path: "/login",
          element: <Login />,
          errorElement: <ErrorPage error={new Error("cant get into login")} />,
        },
        {
          path: "/register",
          element: <Register />,
          errorElement: (
            <ErrorPage error={new Error("cant get into register page")} />
          ),
        },
        {
          path: "/login/guest",
          element: <LoginGuest />,
          errorElement: (
            <ErrorPage error={new Error("cant get into login guest page")} />
          ),
        },
        {
          path: "/rooms",
          element: <ServersRoom />,
          errorElement: (
            <ErrorPage error={new Error("cant get into rooms list page")} />
          ),
        },
        {
          path: "/rooms/create",
          element: <CreateRoom />,
          errorElement: (
            <ErrorPage error={new Error("cant get into create room page")} />
          ),
        },
        {
          path: "/rooms/:id",
          element: <WaitingRoom />,
          errorElement: (
            <ErrorPage error={new Error("cant get into waiting room")} />
          ),
        },
        {
          path: "/rooms/active/:id",
          element: <ActiveRoom />,
          errorElement: (
            <ErrorPage error={new Error("cant get into active room")} />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

/*

  /root -- welcome

  /login
  /login/guest
  /register

  /rooms --- servers list
  /rooms/create --- create new room
  /rooms/:id --- waiting
  /rooms/active/:id --- active (playing) room

*/
