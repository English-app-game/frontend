export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const REGISTER_PATH = "/users/register";
export const RESET_PASSWORD_PATH = "/users/login/resetPassword";
export const SET_NEW_PASSWORD_PATH = "/users/resetPassword";
export const GET_PLAYERS_ROUTE = `${BASE_URL}/rooms/players`;
export const LOGIN_API = "/login";
export const GUEST_API = "/guest";
export const SCORE_STATISTICS_PATH = "/statistics/scores";
export const GAMES_STATISTICS_PATH = "/statistics/games";
export const PLAYERS_STATISTICS_PATH = "/statistics/players";
export const PLAYER_SCORE = `${BASE_URL}/score/last`;
export const REMOVE_PLAYER_ROUTE = `${BASE_URL}/rooms/players/remove`;
export const JOIN_USER_ROOM_ROUTE = `${BASE_URL}/rooms/players/join`;
export const START_GAME_ROUTE = (roomKey = "") =>
  `${BASE_URL}/rooms/${roomKey}/start`;

