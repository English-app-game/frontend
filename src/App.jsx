import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/modules/App.css";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={750}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="customToastContainer"
      />
    </>
  );
}
