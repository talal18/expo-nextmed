import { Notifications } from "expo";

import {
  ADD_NOTIFICATIONS,
  DELETE_NOTIFICATIONS,
  UPDATE_NOTIFICATION,
  ADD_NOTIFICATION
} from "../types/notifications";

const initialState = {
  notifications: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          [action.notification.m_id]: {
            ...state.notifications[action.notification.m_id],
            [action.notification.id]: action.notification
          }
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
      let notifications = state.notifications;

      if (action.m_id in notifications) {
        let data = notifications[action.m_id];

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

      return {
        ...state,
        notifications
      };
    default:
      return state;
  }
};
