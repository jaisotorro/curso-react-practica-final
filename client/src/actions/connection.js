import actionTypes from './actionTypes';

export const updateData = (connection) => ({
  type: actionTypes.UPDATE_DATA,
  user: connection.user,
  time: connection.time
});
