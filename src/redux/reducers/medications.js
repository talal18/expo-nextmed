import {
  ADD_MEDICATION,
  UPDATE_MEDICATION,
  DELETE_MEDICATION,
  RESET_MEDICATIONS
} from "../types/medications";

const defaultState = {
  medications: []
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_MEDICATION:
      return {
        ...state,
        medications: [...state.medications, action.medication]
      };
    case UPDATE_MEDICATION:
      return {
        ...state,
        medications: state.medications.map(item => {
          return item.m_id === action.medication.m_id
            ? {
                ...item,
                ...action.medication
              }
            : item;
        })
      };
    case DELETE_MEDICATION:
      return {
        ...state,
        medications: state.medications.filter(
          item => item.m_id !== action.medication.m_id
        )
      };
    case RESET_MEDICATIONS:
      return {
        ...state,
        medications: []
      };
    default:
      return state;
  }
}
