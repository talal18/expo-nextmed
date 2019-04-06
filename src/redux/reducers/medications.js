import {
  ADD_MEDICATION,
  UPDATE_MEDICATION,
  DELETE_MEDICATION,
  RESET_MEDICATIONS,
  UPDATE_HISTORY
} from "../types/medications";

const defaultState = {
  medications: {}
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_MEDICATION:
      return {
        ...state,
        medications: {
          ...state.medications,
          [action.medication.m_id]: action.medication
        }
      };
    case UPDATE_HISTORY:
      return {
        ...state,
        medications: {
          ...state.medications,
          [action.m_id]: {
            ...state.medications[action.m_id],
            history: action.history
          }
        }
      };
    case UPDATE_MEDICATION:
      return {
        ...state,
        medications: {
          ...state.medications,
          [action.medication.m_id]: action.medication
        }
      };
    case DELETE_MEDICATION:
      var medications = state.medications;
      if (action.m_id in medications) delete medications[action.m_id];
      return {
        ...state,
        medications
      };
    case RESET_MEDICATIONS:
      return {
        ...state,
        medications: {}
      };
    default:
      return state;
  }
}
