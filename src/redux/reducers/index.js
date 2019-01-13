import { combineReducers } from "redux";

import medications from "./medications";
import data from "./data";

const reducers = combineReducers({
  dataState: data,
  medState: medications
});

export default reducers;
