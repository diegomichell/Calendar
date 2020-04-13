import {combineReducers} from "redux";
import calendar from "./calendar.reducer";
import events from "./events.reducer";

export default combineReducers({
  calendar,
  events
})