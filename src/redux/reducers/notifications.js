import {
  ADD_NOTIFICATION,
  UPDATE_NOTIFICATIONS,
  GET_NOTIFICATIONS,
  ADD_M_ID,
  DELETE_NOTIFICATION,
  DELETE_NOTIFICATIONS_ID,
  GET_DATA
} from "../types/notifications";

const defaultState = {
  data: []
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case GET_DATA:
      console.log(state.data);
      return {
        ...state
      };
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
            notifi_id: action.notification.notifi_id,
            date: action.notification.date,
            status: action.notification.status,
            body: action.notification.body,
            title: action.notification.title
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
      //         notifi_id,
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
            if (action.notification.notifi_id === notification.notifi_id) {
              notificationsIndex = n;
              updatedNotification.id = action.notification.id;
              updatedNotification.notifi_id = action.notification.notifi_id;
              updatedNotification.status = !action.notification.status;
              updatedNotification.date = action.notification.date;
              updatedNotification.title = action.notification.title;
              updatedNotification.body = action.notification.body;
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

      var newData = data.map(item => {
        return action.m_id !== item.m_id;
      });

      return {
        ...state,
        data: newData
      };
    case DELETE_NOTIFICATIONS_ID:
      var data = state.data;

      var itemIndex = -1;

      data.map((item, index) => {
        if (action.m_id === item.m_id) {
          itemIndex = index;
        }
      });

      data[itemIndex].notifications = [];

      return {
        ...state,
        data
      };
    default:
      return state;
  }
}
