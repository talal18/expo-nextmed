import { combineReducers } from "redux";

import medications from "./medications";
import data from "./data";
import notifications from "./notifications";
import settings from "./settings";

const reducers = combineReducers({
  dataState: data,
  medState: medications,
  notificationsState: notifications,
  settingsState: settings
});

export default reducers;
