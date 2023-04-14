import actionTypes from './actionTypes';

export const connect = (connection) => ({
  type: actionTypes.CONNECT,
  user: connection.user,
  time: connection.time
});

export const disconnect = (connection) => ({
  type: actionTypes.DISCONNECT,
  user: "",
  time: ""
});
