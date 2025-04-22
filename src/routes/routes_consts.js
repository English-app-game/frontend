// These are for individual imports if we need in specific files
export const HOME = "/";
export const LOGIN = "/login";
export const LOGIN_GUEST = "/login/guest";
export const REGISTER = "/register";
export const ROOMS_LIST = "/rooms";
export const CREATE_ROOM = "/rooms/create";

export const WAITING_ROOM = (id = ":id") => `/rooms/${id}`;
export const ACTIVE_ROOM = (id = ":id") => `/rooms/active/${id}`;

// This is for if we need all of our routes (like in router.jsx) and if we need looping capabilities.
export const ROUTES = {
  HOME,
  LOGIN,
  LOGIN_GUEST,
  REGISTER,
  ROOMS_LIST,
  CREATE_ROOM,
  WAITING_ROOM,
  ACTIVE_ROOM,
};
