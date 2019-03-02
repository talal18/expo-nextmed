import {
  SET_DATES,
  SET_DOSAGE,
  SET_NOTES,
  SET_RECURRENCE,
  SET_TIMES,
  SET_TITLE,
  SET_TYPE,
  RESET_DATA,
  SET_START_DATE,
  SET_END_DATE,
  ADD_TIME,
  DELETE_TIME,
  SET_USER_ID,
  SET_M_ID,
  SET_IMAGE_URI
} from "../types/data";

const defaultState = {
  data: {
    userId: "",
    m_id: "",
    title: "",
    type: "capsules",
    dosage: 1.0,
    recurrence: "day",
    notes: "",
    intake_times: [],
    start_date: "",
    end_date: "",
    uri: ""
  }
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_IMAGE_URI:
      return { ...state, data: { ...state.data, uri: action.uri } };
    case SET_USER_ID:
      return { ...state, data: { ...state.data, userId: action.userId } };
    case SET_M_ID:
      return { ...state, data: { ...state.data, m_id: action.m_id } };
    case SET_TITLE:
      return { ...state, data: { ...state.data, title: action.title } };
    case SET_TYPE:
      return { ...state, data: { ...state.data, type: action.medType } };
    case SET_RECURRENCE:
      return {
        ...state,
        data: { ...state.data, recurrence: action.recurrence }
      };
    case SET_DOSAGE:
      return {
        ...state,
        data: { ...state.data, dosage: action.dosage }
      };
    case ADD_TIME:
      return {
        ...state,
        data: {
          ...state.data,
          intake_times: [...state.data.intake_times, action.time]
        }
      };
    case DELETE_TIME:
      return {
        ...state,
        data: {
          ...state.data,
          intake_times: state.data.intake_times.filter(item => {
            if (item !== action.time) {
              return item;
            }
          })
        }
      };
    case SET_START_DATE:
      return {
        ...state,
        data: { ...state.data, start_date: action.start_date }
      };
    case SET_END_DATE:
      return { ...state, data: { ...state.data, end_date: action.end_date } };
    case SET_NOTES:
      return { ...state, data: { ...state.data, notes: action.notes } };
    case RESET_DATA:
      return {
        ...state,
        data: {
          userId: "",
          m_id: "",
          title: "",
          type: "capsules",
          dosage: 1.0,
          recurrence: "day",
          notes: "",
          intake_times: [],
          start_date: "",
          end_date: "",
          uri: ""
        }
      };
    default:
      return state;
  }
}
