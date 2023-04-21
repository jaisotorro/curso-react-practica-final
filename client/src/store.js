// import { configureStore } from "@reduxjs/toolkit"; // no lo reconoce
import { createStore, combineReducers } from "redux";  //deprecado
import connection from "./reducers/connection";


// export default configureStore({reducer: connection});
// export default createStore({connection}); //deprecado
// export default createStore(connection); //deprecado
export default createStore(combineReducers({ connection })); 
