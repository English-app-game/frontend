

import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const PORT = 5000;
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || `http://localhost:${PORT}/api`;
export const CLIENT_URL = window.location.origin;
export const REGISTER_PATH = "/users/register";
export const RESET_PASSWORD_PATH = "/users/login/resetPassword";
export const SET_NEW_PASSWORD_PATH = "/users/resetPassword";
export const GET_PLAYERS_ROUTE = `${BASE_URL}/rooms/players`;
export const LOGIN_API = "/login";
export const GUEST_API = "/guest";
export const SCORE_STATISTICS_PATH = "/statistics/scores";
export const GAMES_STATISTICS_PATH = "/statistics/games";
export const PLAYERS_STATISTICS_PATH = "/statistics/players";
export const GAMETYPE_ROUTE = "/game-types"
export const PLAYER_SCORE = `${BASE_URL}/score/last`;
export const REMOVE_PLAYER_ROUTE = `${BASE_URL}/rooms/players/remove`;
export const JOIN_USER_ROOM_ROUTE = `${BASE_URL}/rooms/players/join`;
export const ALL_WORDS = `${BASE_URL}/rooms/words`;
export const DEFAULT_WORD_AMOUNT = 500;
export const START_GAME_ROUTE = (roomKey = "") =>
  `${BASE_URL}/rooms/${roomKey}/start`;
export const DELETE_ROOM_ROUTE = (roomKey = "") =>
  `${BASE_URL}/rooms/${roomKey}`;
export const SAVE_USER_SCORE_ROUTE = `${BASE_URL}/score/save`
export const MEMORY_GAME_STATE = "memory-game/state";
export const MEMORY_GAME_END = "memory-game/end";
export const MEMORY_GAME_PLAYER_LEFT= "memory-game/player-left";
export const YOUR_TURN_MSG= "🎯 Your Turn!";
export const MAX_HINTS = 4;
export const MAX_SKIPS = 4;
export const DEFAULT_LEVEL = "easy";


export const MEMORY_GAME_JOIN = "memory-game/join";
export const MEMORY_GAME_FLIPCARD ="memory-game/flip-card";
export const MEMORY_GAME_MATCHCHECK ="memory-game/match-check";
