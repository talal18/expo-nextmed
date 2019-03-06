import { combineReducers } from "redux";

import data from "./data";
import settings from "./settings";

const reducers = combineReducers({
  dataState: data,
  settingsState: settings
});

export default reducers;
