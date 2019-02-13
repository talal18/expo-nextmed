import {
  ADD_NOTIFICATION,
  UPDATE_NOTIFICATION,
  DELETE_NOTIFICATION,
  SEARCH_TEXT
} from "../types/notifications";
import { Notifications } from "expo";

export const set_status = (notification, status) => {
  return dispatch => {
    dispatch({
      type: UPDATE_NOTIFICATION,
      notification,
      status,
      newId: notification.id
    });
  };
};

export const set_search_text = searchText => {
  return dispatch => {
    dispatch({
      type: SEARCH_TEXT,
      searchText
    });
  };
};

export const update_notification = (notification, status) => {
  return dispatch => {
    if (status) {
      const localNotification = {
        title: notification.title,
        body: notification.body, // (string) — body text of the notification.
        ios: {
          // (optional) (object) — notification configuration specific to iOS.
          sound: true // (optional) (boolean) — if true, play a sound. Default: false.
        },
        // (optional) (object) — notification configuration specific to Android.
        android: {
          channelId: "nextmedNotifications",
          sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
          //icon (optional) (string) — URL of icon to display in notification drawer.
          //color (optional) (string) — color of the notification icon in notification drawer.
          priority: "high", // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
          sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
          vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
          // link (optional) (string) — external link to open when notification is selected.
        }
      };

      let t = new Date(notification.date);

      var schedulingOptions = {
        time: t.getTime()
      };

      Notifications.scheduleLocalNotificationAsync(
        localNotification,
        schedulingOptions
      ).then(id => {
        schedulingOptions = {
          time: t.getTime()
        };

        dispatch({
          type: UPDATE_NOTIFICATION,
          notification,
          status,
          newId: id
        });
      });
    } else {
      Notifications.cancelScheduledNotificationAsync(notification.id);

      dispatch({
        type: UPDATE_NOTIFICATION,
        notification,
        status,
        newId: notification.id
      });
    }
  };
};

export const add_notification = (
  m_id,
  title,
  body,
  repeat,
  date,
  end_date,
  status
) => {
  return dispatch => {
    const localNotification = {
      title: title,
      body: body, // (string) — body text of the notification.
      ios: {
        // (optional) (object) — notification configuration specific to iOS.
        sound: true // (optional) (boolean) — if true, play a sound. Default: false.
      },
      // (optional) (object) — notification configuration specific to Android.
      android: {
        channelId: "nextmedNotifications",
        sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
        //icon (optional) (string) — URL of icon to display in notification drawer.
        //color (optional) (string) — color of the notification icon in notification drawer.
        priority: "high", // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
        sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
        vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
        // link (optional) (string) — external link to open when notification is selected.
      }
    };

    var today = new Date(Date.now());
    var start_day = date.getDate();
    var start_month = date.getMonth();
    var start_year = date.getFullYear();

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var isBeforeNow = false;

    if (
      start_day === today.getDate() &&
      start_month === today.getMonth() &&
      start_year === today.getFullYear()
    ) {
      if (today.getHours() === hours) {
        if (today.getMinutes() >= minutes) {
          isBeforeNow = true;
        } else {
          isBeforeNow = false;
        }
      } else {
        if (today.getHours() > hours) {
          isBeforeNow = true;
        } else {
          isBeforeNow = false;
        }
      }
    } else {
      isBeforeNow = false;
    }

    Date.daysBetween = function(date1, date2) {
      //Get 1 day in milliseconds
      var one_day = 1000 * 60 * 60 * 24;

      // Convert both dates to milliseconds
      var date1_ms = date1.getTime();
      var date2_ms = date2.getTime();

      // Calculate the difference in milliseconds
      var difference_ms = date2_ms - date1_ms;

      // Convert back to days and return
      return Math.round(difference_ms / one_day);
    };

    if (end_date.length > 0) {
      if (repeat === "day") {
        var days = Date.daysBetween(
          new Date(start_year, start_month, start_day, 0, 0, 0, 0),
          new Date(end_date)
        );

        if (days > 365) {
          days = 365;
        }

        days = days - 1;

        for (var i = isBeforeNow ? 1 : 0; i <= days; i++) {
          let t = new Date(date);
          t.setDate(t.getDate() + i);

          var schedulingOptions = {
            time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
          };

          // console.log(new Date(schedulingOptions.time).toString());

          if (status === true) {
            Notifications.scheduleLocalNotificationAsync(
              localNotification,
              schedulingOptions
            ).then(id => {
              schedulingOptions = {
                time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
              };

              dispatch({
                type: ADD_NOTIFICATION,
                notification: {
                  id: id,
                  notifi_id:
                    "_" +
                    Math.random()
                      .toString(36)
                      .substr(2, 9) +
                    Date.now(),
                  m_id,
                  date: new Date(schedulingOptions.time).toString(),
                  status,
                  title,
                  body
                }
              });
            });
          } else {
            dispatch({
              type: ADD_NOTIFICATION,
              notification: {
                id: id,
                notifi_id:
                  "_" +
                  Math.random()
                    .toString(36)
                    .substr(2, 9) +
                  Date.now(),
                m_id,
                date: new Date(schedulingOptions.time).toString(),
                status,
                title,
                body
              }
            });
          }
        }
      } else if (repeat === "week") {
        var days = Date.daysBetween(
          new Date(start_year, start_month, start_day, 0, 0, 0, 0),
          new Date(end_date)
        );
        days = days - 1;

        if (days > 365) {
          days = 365;
        }

        var weeks = days / 7;

        weeks = Math.floor(weeks);

        for (var i = isBeforeNow ? 1 : 0; i <= weeks; i++) {
          let t = new Date(date);
          t.setDate(t.getDate() + i * 7);

          var schedulingOptions = {
            time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
          };

          if (status === true) {
            Notifications.scheduleLocalNotificationAsync(
              localNotification,
              schedulingOptions
            ).then(id => {
              schedulingOptions = {
                time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
              };

              dispatch({
                type: ADD_NOTIFICATION,
                notification: {
                  id,
                  notifi_id:
                    "_" +
                    Math.random()
                      .toString(36)
                      .substr(2, 9) +
                    Date.now(),
                  m_id,
                  date: new Date(schedulingOptions.time).toString(),
                  status,
                  title,
                  body
                }
              });
            });
          } else {
            dispatch({
              type: ADD_NOTIFICATION,
              notification: {
                id,
                notifi_id:
                  "_" +
                  Math.random()
                    .toString(36)
                    .substr(2, 9) +
                  Date.now(),
                m_id,
                date: new Date(schedulingOptions.time).toString(),
                status,
                title,
                body
              }
            });
          }
        }
      } else if (repeat === "month") {
        var months = 0;
        var endDate = new Date(end_date);

        if (date.getMonth() === endDate.getMonth()) {
          if (endDate.getFullYear() > date.getFullYear()) {
            var years = endDate.getFullYear() - date.getFullYear();
            months += 12 * years;
          }
        } else {
          months = endDate.getMonth() - date.getMonth();
        }

        for (var i = isBeforeNow ? 1 : 0; i <= months; i++) {
          let t = new Date(date);
          t.setMonth(t.getMonth() + i);

          var schedulingOptions = {
            time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
          };

          if (status === true) {
            Notifications.scheduleLocalNotificationAsync(
              localNotification,
              schedulingOptions
            ).then(id => {
              schedulingOptions = {
                time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
              };

              dispatch({
                type: ADD_NOTIFICATION,
                notification: {
                  id,
                  notifi_id:
                    "_" +
                    Math.random()
                      .toString(36)
                      .substr(2, 9) +
                    Date.now(),
                  m_id,
                  date: new Date(schedulingOptions.time).toString(),
                  status,
                  title,
                  body
                }
              });
            });
          } else {
            dispatch({
              type: ADD_NOTIFICATION,
              notification: {
                id,
                notifi_id:
                  "_" +
                  Math.random()
                    .toString(36)
                    .substr(2, 9) +
                  Date.now(),
                m_id,
                date: new Date(schedulingOptions.time).toString(),
                status,
                title,
                body
              }
            });
          }
        }
      } else if (repeat === "year") {
        var years = 0;

        var endDate = new Date(end_date);

        if (start_year === endDate.getFullYear()) {
          if (!isBeforeNow) {
            years = 1;
          }
        } else {
          years = endDate.getFullYear() - start_year;
        }

        for (var i = 0; i < years; i++) {
          let t = new Date(date);
          t.setFullYear(t.getFullYear() + i);

          var schedulingOptions = {
            time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
          };

          if (status === true) {
            Notifications.scheduleLocalNotificationAsync(
              localNotification,
              schedulingOptions
            ).then(id => {
              schedulingOptions = {
                time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
              };

              dispatch({
                type: ADD_NOTIFICATION,
                notification: {
                  id,
                  notifi_id:
                    "_" +
                    Math.random()
                      .toString(36)
                      .substr(2, 9) +
                    Date.now(),
                  m_id,
                  date: new Date(schedulingOptions.time).toString(),
                  status,
                  title,
                  body
                }
              });
            });
          } else {
            dispatch({
              type: ADD_NOTIFICATION,
              notification: {
                id,
                notifi_id:
                  "_" +
                  Math.random()
                    .toString(36)
                    .substr(2, 9) +
                  Date.now(),
                m_id,
                date: new Date(schedulingOptions.time).toString(),
                status,
                title,
                body
              }
            });
          }
        }
      }
    }
  };
};

export const delete_notifications = (notifications, m_id) => {
  return dispatch => {
    notifications.map(item => {
      if (item.m_id === m_id && item.status === true) {
        Notifications.cancelScheduledNotificationAsync(item.id);
      }
    });

    dispatch({
      type: DELETE_NOTIFICATION,
      m_id
    });
  };
};

export const update_notifications = (
  m_id,
  title,
  body,
  repeat,
  date,
  end_date,
  status,
  orig_notifications
) => {
  return dispatch => {
    const localNotification = {
      title: title,
      body: body, // (string) — body text of the notification.
      ios: {
        // (optional) (object) — notification configuration specific to iOS.
        sound: true // (optional) (boolean) — if true, play a sound. Default: false.
      },
      // (optional) (object) — notification configuration specific to Android.
      android: {
        channelId: "nextmedNotifications",
        sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
        //icon (optional) (string) — URL of icon to display in notification drawer.
        //color (optional) (string) — color of the notification icon in notification drawer.
        priority: "high", // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
        sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
        vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
        // link (optional) (string) — external link to open when notification is selected.
      }
    };

    var today = new Date(Date.now());
    var start_day = date.getDate();
    var start_month = date.getMonth();
    var start_year = date.getFullYear();

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var isBeforeNow = false;

    if (
      start_day === today.getDate() &&
      start_month === today.getMonth() &&
      start_year === today.getFullYear()
    ) {
      if (today.getHours() === hours) {
        if (today.getMinutes() >= minutes) {
          isBeforeNow = true;
        } else {
          isBeforeNow = false;
        }
      } else {
        if (today.getHours() > hours) {
          isBeforeNow = true;
        } else {
          isBeforeNow = false;
        }
      }
    } else {
      isBeforeNow = false;
    }

    Date.daysBetween = function(date1, date2) {
      //Get 1 day in milliseconds
      var one_day = 1000 * 60 * 60 * 24;

      // Convert both dates to milliseconds
      var date1_ms = date1.getTime();
      var date2_ms = date2.getTime();

      // Calculate the difference in milliseconds
      var difference_ms = date2_ms - date1_ms;

      // Convert back to days and return
      return Math.round(difference_ms / one_day);
    };

    if (end_date.length > 0) {
      if (repeat === "day") {
        var days = Date.daysBetween(
          new Date(start_year, start_month, start_day, 0, 0, 0, 0),
          new Date(end_date)
        );

        if (days > 365) {
          days = 365;
        }

        days = days - 1;

        for (var i = isBeforeNow ? 1 : 0; i <= days; i++) {
          let t = new Date(date);
          t.setDate(t.getDate() + i);

          var schedulingOptions = {
            time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
          };

          // console.log(new Date(schedulingOptions.time).toString());

          var result = orig_notifications.filter(origNotification => {
            return origNotification.date === t.toString();
          });

          if (result.length > 0) {
            if (result[0].status === true) {
              Notifications.scheduleLocalNotificationAsync(
                localNotification,
                schedulingOptions
              ).then(id => {
                schedulingOptions = {
                  time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
                };

                dispatch({
                  type: ADD_NOTIFICATION,
                  notification: {
                    id: id,
                    notifi_id:
                      "_" +
                      Math.random()
                        .toString(36)
                        .substr(2, 9) +
                      Date.now(),
                    m_id,
                    date: new Date(schedulingOptions.time).toString(),
                    status: true,
                    title,
                    body
                  }
                });
              });
            } else {
              dispatch({
                type: ADD_NOTIFICATION,
                notification: {
                  id: result[0].id,
                  notifi_id:
                    "_" +
                    Math.random()
                      .toString(36)
                      .substr(2, 9) +
                    Date.now(),
                  m_id,
                  date: new Date(schedulingOptions.time).toString(),
                  status: false,
                  title,
                  body
                }
              });
            }
          } else {
            Notifications.scheduleLocalNotificationAsync(
              localNotification,
              schedulingOptions
            ).then(id => {
              schedulingOptions = {
                time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
              };

              dispatch({
                type: ADD_NOTIFICATION,
                notification: {
                  id: id,
                  notifi_id:
                    "_" +
                    Math.random()
                      .toString(36)
                      .substr(2, 9) +
                    Date.now(),
                  m_id,
                  date: new Date(schedulingOptions.time).toString(),
                  status: true,
                  title,
                  body
                }
              });
            });
          }
        }
      } else if (repeat === "week") {
        var days = Date.daysBetween(
          new Date(start_year, start_month, start_day, 0, 0, 0, 0),
          new Date(end_date)
        );
        days = days - 1;

        if (days > 365) {
          days = 365;
        }

        var weeks = days / 7;

        weeks = Math.floor(weeks);

        for (var i = isBeforeNow ? 1 : 0; i <= weeks; i++) {
          let t = new Date(date);
          t.setDate(t.getDate() + i * 7);

          var schedulingOptions = {
            time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
          };

          var result = orig_notifications.filter(origNotification => {
            return origNotification.date === t.toString();
          });

          if (result.length > 0) {
            if (result[0].status === true) {
              Notifications.scheduleLocalNotificationAsync(
                localNotification,
                schedulingOptions
              ).then(id => {
                schedulingOptions = {
                  time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
                };

                dispatch({
                  type: ADD_NOTIFICATION,
                  notification: {
                    id: id,
                    notifi_id:
                      "_" +
                      Math.random()
                        .toString(36)
                        .substr(2, 9) +
                      Date.now(),
                    m_id,
                    date: new Date(schedulingOptions.time).toString(),
                    status: true,
                    title,
                    body
                  }
                });
              });
            } else {
              dispatch({
                type: ADD_NOTIFICATION,
                notification: {
                  id: result[0].id,
                  notifi_id:
                    "_" +
                    Math.random()
                      .toString(36)
                      .substr(2, 9) +
                    Date.now(),
                  m_id,
                  date: new Date(schedulingOptions.time).toString(),
                  status: false,
                  title,
                  body
                }
              });
            }
          } else {
            Notifications.scheduleLocalNotificationAsync(
              localNotification,
              schedulingOptions
            ).then(id => {
              schedulingOptions = {
                time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
              };

              dispatch({
                type: ADD_NOTIFICATION,
                notification: {
                  id: id,
                  notifi_id:
                    "_" +
                    Math.random()
                      .toString(36)
                      .substr(2, 9) +
                    Date.now(),
                  m_id,
                  date: new Date(schedulingOptions.time).toString(),
                  status: true,
                  title,
                  body
                }
              });
            });
          }
        }
      } else if (repeat === "month") {
        var months = 0;
        var endDate = new Date(end_date);

        if (date.getMonth() === endDate.getMonth()) {
          if (endDate.getFullYear() > date.getFullYear()) {
            var years = endDate.getFullYear() - date.getFullYear();
            months += 12 * years;
          }
        } else {
          months = endDate.getMonth() - date.getMonth();
        }

        for (var i = isBeforeNow ? 1 : 0; i <= months; i++) {
          let t = new Date(date);
          t.setMonth(t.getMonth() + i);

          var schedulingOptions = {
            time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
          };

          var result = orig_notifications.filter(origNotification => {
            return origNotification.date === t.toString();
          });

          if (result.length > 0) {
            if (result[0].status === true) {
              Notifications.scheduleLocalNotificationAsync(
                localNotification,
                schedulingOptions
              ).then(id => {
                schedulingOptions = {
                  time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
                };

                dispatch({
                  type: ADD_NOTIFICATION,
                  notification: {
                    id: id,
                    notifi_id:
                      "_" +
                      Math.random()
                        .toString(36)
                        .substr(2, 9) +
                      Date.now(),
                    m_id,
                    date: new Date(schedulingOptions.time).toString(),
                    status: true,
                    title,
                    body
                  }
                });
              });
            } else {
              dispatch({
                type: ADD_NOTIFICATION,
                notification: {
                  id: result[0].id,
                  notifi_id:
                    "_" +
                    Math.random()
                      .toString(36)
                      .substr(2, 9) +
                    Date.now(),
                  m_id,
                  date: new Date(schedulingOptions.time).toString(),
                  status: false,
                  title,
                  body
                }
              });
            }
          } else {
            Notifications.scheduleLocalNotificationAsync(
              localNotification,
              schedulingOptions
            ).then(id => {
              schedulingOptions = {
                time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
              };

              dispatch({
                type: ADD_NOTIFICATION,
                notification: {
                  id: id,
                  notifi_id:
                    "_" +
                    Math.random()
                      .toString(36)
                      .substr(2, 9) +
                    Date.now(),
                  m_id,
                  date: new Date(schedulingOptions.time).toString(),
                  status: true,
                  title,
                  body
                }
              });
            });
          }
        }
      } else if (repeat === "year") {
        var years = 0;

        var endDate = new Date(end_date);

        if (start_year === endDate.getFullYear()) {
          if (!isBeforeNow) {
            years = 1;
          }
        } else {
          years = endDate.getFullYear() - start_year;
        }

        for (var i = 0; i < years; i++) {
          let t = new Date(date);
          t.setFullYear(t.getFullYear() + i);

          var schedulingOptions = {
            time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
          };
          var result = orig_notifications.filter(origNotification => {
            return origNotification.date === t.toString();
          });

          if (result.length > 0) {
            if (result[0].status === true) {
              Notifications.scheduleLocalNotificationAsync(
                localNotification,
                schedulingOptions
              ).then(id => {
                schedulingOptions = {
                  time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
                };

                dispatch({
                  type: ADD_NOTIFICATION,
                  notification: {
                    id: id,
                    notifi_id:
                      "_" +
                      Math.random()
                        .toString(36)
                        .substr(2, 9) +
                      Date.now(),
                    m_id,
                    date: new Date(schedulingOptions.time).toString(),
                    status: true,
                    title,
                    body
                  }
                });
              });
            } else {
              dispatch({
                type: ADD_NOTIFICATION,
                notification: {
                  id: result[0].id,
                  notifi_id:
                    "_" +
                    Math.random()
                      .toString(36)
                      .substr(2, 9) +
                    Date.now(),
                  m_id,
                  date: new Date(schedulingOptions.time).toString(),
                  status: false,
                  title,
                  body
                }
              });
            }
          } else {
            Notifications.scheduleLocalNotificationAsync(
              localNotification,
              schedulingOptions
            ).then(id => {
              schedulingOptions = {
                time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
              };

              dispatch({
                type: ADD_NOTIFICATION,
                notification: {
                  id: id,
                  notifi_id:
                    "_" +
                    Math.random()
                      .toString(36)
                      .substr(2, 9) +
                    Date.now(),
                  m_id,
                  date: new Date(schedulingOptions.time).toString(),
                  status: true,
                  title,
                  body
                }
              });
            });
          }
        }
      }
    }
  };
};
