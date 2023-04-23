import actionTypes from '../actions/actionTypes';

// Estado inicial
const initialState = {
  name: null
}

// Implementamos el reducer
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.UPDATE_NAME:
      return {
        name: action.name
      };
    default:
      return state;
  }
}

export default reducer;
