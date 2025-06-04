export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const REGISTER_PATH = "/users/register";
export const RESET_PASSWORD_PATH = "/users/login/resetPassword";
export const SET_NEW_PASSWORD_PATH = "/users/resetPassword";
export const GET_PLAYERS_ROUTE = `${BASE_URL}/rooms/players`
export const LOGIN_API = "/login";
export const GUEST_API = "/guest";