import { combineReducers } from "redux";
import loadingReducer from "./loadingReducer";
import darkmodeReducer from "./darkmodeReducer";
import countriesReducer from "./countriesReducer";

export default combineReducers({
  darkmode: darkmodeReducer,
  loading: loadingReducer,
  countries: countriesReducer,
});
