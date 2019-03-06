import { SET_LANGUAGE } from "../types/settings";

const defaultState = {
  language: "en"
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.language
      };
    default:
      return state;
  }
}
