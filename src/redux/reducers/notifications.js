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
            if (action.notification.id === notification.id) {
              notificationsIndex = n;
              updatedNotification.id = action.notification.id;
              updatedNotification.status = !action.notification.status;
              updatedNotification.date = action.notification.date;
            }
          });
        }
      });

      data[dataIndex].notifications[notificationsIndex] = updatedNotification;

      console.log(data[dataIndex].notifications[notificationsIndex]);
      return {
        ...state,
        data
      };
    case GET_NOTIFICATIONS:
      return {
        ...state
      };
    default:
      return state;
  }
}
