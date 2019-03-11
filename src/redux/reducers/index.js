import { combineReducers } from "redux";

import notifications from "./notifications";
import medications from "./medications";
import settings from "./settings";
import data from "./data";

const reducers = combineReducers({
  notState: notifications,
  medState: medications,
  settingsState: settings,
  dataState: data
});

export default reducers;
