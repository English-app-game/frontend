export const WAITING_ROOM_EVENTS = {
  JOIN: 'join-waiting-room',
  LEAVE: 'leave-waiting-room',
  REMOVE: 'remove-from-waiting-room',
  PLAYERS_UPDATED: 'waiting-room-players-updated',
  HOST_LEFT: 'host-left',
  ROOM_CLOSED: 'room-closed'
};

export const SOCKET_CONNECTION_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  CONNECT_ERROR: 'connect_error',
  RECONNECT: 'reconnect',
  RECONNECT_ATTEMPT: 'reconnect_attempt'
}; 