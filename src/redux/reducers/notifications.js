import {
  ADD_NOTIFICATION,
  UPDATE_NOTIFICATIONS,
  GET_NOTIFICATIONS,
  ADD_M_ID
} from "../types/notifications";

const defaultState = {
  data: [{}]
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_M_ID:
      return {
        ...state,
        data: [...state.data, { m_id: action.m_id, notifications: [] }]
      };
    case ADD_NOTIFICATION:
      var data = state.data;

      data.map(item => {
        if (action.notification.m_id === item.m_id) {
          item.notifications.push({
            id: action.notification.id,
            date: action.notification.date
          });
        }
      });

      return {
        ...state,
        data
      };
    case UPDATE_NOTIFICATIONS:
      return {
        ...state
      };
    case GET_NOTIFICATIONS:
      return {
        ...state
      };
    default:
      return state;
  }
}
