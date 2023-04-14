import actionTypes from '../actions/actionTypes';

const initialState = {
    user: "",
    time: null
  }

  const connection = (state = initialState, action) => {
    switch(action.type) {
      case actionTypes.CONNECT:
        return {
          name: action.user,
          time: new Date()
        };
      case actionTypes.DISCONNECT:
        return {
          name: action.user,
          time: action.time
        };
      default:
      return state;
    }
  }
  export default connection;