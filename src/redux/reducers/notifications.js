import { Notifications } from "expo";

import {
  ADD_NOTIFICATIONS,
  DELETE_NOTIFICATIONS,
  UPDATE_NOTIFICATION,
  IS_LOADING_NOTIFICATIONS,
  ADD_NOTIFICATION
} from "../types/notifications";

const initialState = {
  notifications: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING_NOTIFICATIONS:
      return {
        ...state,
        loading: action.loading
      };
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
      let notifications = state.notifications;

      /**
       * Scheduale notifications and generate ids -> store them in an array = { generated_id, date,  }
       * Insert each generated id from previous to redux
       */

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

      return state;
    default:
      return state;
  }
};
