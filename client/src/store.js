// import { configureStore } from "@reduxjs/toolkit"; // no lo reconoce
import { createStore, combineReducers } from "redux"; 
import user from "./reducers/user"; 
import connection from "./reducers/connection";

export default createStore(combineReducers({ connection }));  //deprecado 
// export default createStore(combineReducers({ user }));   // provis
