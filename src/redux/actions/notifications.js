import {
  ADD_NOTIFICATION,
  UPDATE_NOTIFICATION,
  DELETE_NOTIFICATIONS
} from "../types/notifications";

export const addNotification = notification => {
  return dispatch => {
    dispatch({
      type: ADD_NOTIFICATION,
      notification
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
