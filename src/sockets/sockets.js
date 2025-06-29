import { io } from "socket.io-client";
import { PORT } from "../consts/consts";
// "undefined" means the URL will be computed from the `window.location` object

// Use the same base URL as API but without /api suffix for socket connection
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || `http://localhost:${PORT}/api`;
export const URL = API_BASE_URL.replace("/api", ""); // Remove /api for socket connection

export const socket = io(URL, {
  autoConnect: false,
});
