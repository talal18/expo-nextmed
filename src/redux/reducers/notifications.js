import {
  ADD_NOTIFICATION,
  UPDATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  DELETE_NOTIFICATIONS
} from "../types/notifications";

const defaultState = {
  data: []
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
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
        data: []
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
