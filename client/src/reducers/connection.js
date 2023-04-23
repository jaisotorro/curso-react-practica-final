import actionTypes from '../actions/actionTypes';

const initialState = {
    user: null,
    time: null
  }

  const connection = (state = initialState, action) => {
    switch(action.type) {
      case actionTypes.UPDATE_DATA:
        return {
          user: action.user,
          time: action.time
        }
      default:
        return state;
    }
  }
  export default connection;