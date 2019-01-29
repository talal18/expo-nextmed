import {
  ADD_NOTIFICATION,
  UPDATE_NOTIFICATIONS,
  GET_NOTIFICATIONS,
  ADD_M_ID,
  DELETE_NOTIFICATION
} from "../types/notifications";

const defaultState = {
  data: []
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
          console.log(action.notification.date);

          item.notifications.push({
            id: action.notification.id,
            date: action.notification.date,
            status: action.notification.status
          });
        }
      });

      return {
        ...state,
        data
      };
    case UPDATE_NOTIFICATIONS:
      var data = state.data;

      // data: [
      //   {
      //     m_id,
      //     item: [
      //       {
      //         id,
      //         date,
      //         status
      //       }
      //     ]
      //   }
      // ];

      var dataIndex = -1;
      var notificationsIndex = -1;
      var updatedNotification = {};

      data.map((item, d) => {
        if (action.notification.m_id === item.m_id) {
          dataIndex = d;
          item.notifications.map((notification, n) => {
            if (action.notification.prevId === notification.id) {
              notificationsIndex = n;
              updatedNotification.id = action.notification.id;
              updatedNotification.status = !action.notification.status;
              updatedNotification.date = action.notification.date;
            }
          });
        }
      });

      data[dataIndex].notifications[notificationsIndex] = updatedNotification;

      return {
        ...state,
        data
      };
    case GET_NOTIFICATIONS:
      return {
        ...state
      };
    case DELETE_NOTIFICATION:
      var data = state.data;

      var newDate = data.map(item => {
        return action.m_id !== item.m_id;
      });

      return {
        ...state,
        data: []
      };
    default:
      return state;
  }
}
