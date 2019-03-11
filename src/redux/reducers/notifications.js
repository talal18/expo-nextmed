import { Notifications } from "expo";

import {
  ADD_NOTIFICATIONS,
  DELETE_NOTIFICATIONS,
  UPDATE_NOTIFICATION
} from "../types/notifications";

const initialState = {
  notifications: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATIONS:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          [action.m_id]: action.notifications
        }
      };
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          [action.m_id]: {
            ...state.notifications[action.m_id],
            [action.id]: {
              ...state.notifications[action.m_id][action.id],
              status: action.status,
              notification_id: action.notification_id
            }
          }
        }
      };
    case DELETE_NOTIFICATIONS:
      var notifications = state.notifications;

      if (action.m_id in notifications) {
        var data = notifications[action.m_id];

        for (notification in data) {
          if (
            data[notification].status === true &&
            new Date(data[notification].date).getTime() >
              new Date(Date.now()).getTime()
          ) {
            if (data[notification].notification_id !== null) {
              Notifications.cancelScheduledNotificationAsync(
                data[notification].notification_id
              );
            }
          }
        }

        delete notifications[action.m_id];
      }

      return state;
    default:
      return state;
  }
};
