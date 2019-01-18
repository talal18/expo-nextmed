import { combineReducers } from "redux";

import medications from "./medications";
import data from "./data";
import notifications from "./notifications";

const reducers = combineReducers({
  dataState: data,
  medState: medications,
  notificationsState: notifications
});

export default reducers;
