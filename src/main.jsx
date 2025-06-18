import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { store } from "./store/index";
import { Provider } from "react-redux";
import './index.css'

createRoot(document.getElementById("root")).render(
  // bugs socket connection if used with StrictMode
  // <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </StrictMode>
);
