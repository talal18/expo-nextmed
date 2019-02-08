import {
  ADD_NOTIFICATION,
  UPDATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  DELETE_NOTIFICATIONS,
  SEARCH_TEXT
} from "../types/notifications";

const defaultState = {
  data: [],
  searchText: ""
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SEARCH_TEXT:
      return {
        ...state,
        searchText: action.searchText
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        data: [...state.data, action.notification]
      };
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        data: state.data.map(item => {
          return item.m_id === action.notification.m_id &&
            item.notifi_id === action.notification.notifi_id
            ? {
                ...item,
                status: action.status,
                id: action.newId
              }
            : item;
        })
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        data: state.data.filter(item => {
          return item.m_id !== action.m_id;
        })
      };
    case DELETE_NOTIFICATIONS:
      return {
        ...state,
        data: []
      };
    default:
      return state;
  }
}
