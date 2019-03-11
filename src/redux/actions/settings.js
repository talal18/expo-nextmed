import { SET_LANGUAGE } from "../types/settings";

export const set_language = language => {
  return dispatch => {
    dispatch({
      type: SET_LANGUAGE,
      language
    });
  };
};
