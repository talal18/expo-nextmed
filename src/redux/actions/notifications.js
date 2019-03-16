import {
  ADD_NOTIFICATION,
  ADD_NOTIFICATIONS,
  UPDATE_NOTIFICATION,
  DELETE_NOTIFICATIONS,
  IS_LOADING_NOTIFICATIONS
} from "../types/notifications";

export const set_loading_notifications = loading => {
  return dispatch => {
    dispatch({
      type: IS_LOADING_NOTIFICATIONS,
      loading
    });
  };
};

export const addNotification = notification => {
  return dispatch => {
    dispatch({
      type: IS_LOADING_NOTIFICATIONS,
      loading: true
    });

    dispatch({
      type: ADD_NOTIFICATION,
      notification
    });
  };
};

export const addNotifications = (m_id, notifications) => {
  return dispatch => {
    dispatch({
      type: ADD_NOTIFICATIONS,
      m_id,
      notifications
    });
  };
};

export const deleteNotifications = m_id => {
  return dispatch => {
    dispatch({
      type: DELETE_NOTIFICATIONS,
      m_id
    });
  };
};

export const updateNotification = (id, m_id, notification_id, status) => {
  return dispatch => {
    dispatch({
      type: UPDATE_NOTIFICATION,
      id,
      m_id,
      notification_id,
      status
    });
  };
};
