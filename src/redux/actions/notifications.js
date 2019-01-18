import { ADD_NOTIFICATION, ADD_M_ID } from "../types/notifications";

import { Notifications } from "expo";

export const add_m_id = m_id => {
  return dispatch => {
    dispatch({
      type: ADD_M_ID,
      m_id
    });
  };
};

export const add_notification = (m_id, title, body, repeat, date, end_date) => {
  return dispatch => {
    function addNotification(m_id, title, body, repeat, date, end_date) {
      const localNotification = {
        title: title,
        body: body, // (string) — body text of the notification.
        ios: {
          // (optional) (object) — notification configuration specific to iOS.
          sound: true // (optional) (boolean) — if true, play a sound. Default: false.
        },
        // (optional) (object) — notification configuration specific to Android.
        android: {
          sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
          //icon (optional) (string) — URL of icon to display in notification drawer.
          //color (optional) (string) — color of the notification icon in notification drawer.
          priority: "high", // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
          sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
          vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
          // link (optional) (string) — external link to open when notification is selected.
        }
      };

      var schedulingOptions = {};

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
          if (today.getMinutes() > minutes) {
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
          days = days - 1;

          for (var i = isBeforeNow ? 1 : 0; i <= days; i++) {
            let t = new Date(date);
            t.setDate(t.getDate() + i);

            schedulingOptions = {
              time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
            };

            console.log(new Date(schedulingOptions.time).toString());

            dispatch({
              type: ADD_NOTIFICATION,
              notification: {
                id: "1",
                m_id,
                date: new Date(schedulingOptions.time).toString()
              }
            });

            // Notifications.scheduleLocalNotificationAsync(
            //   localNotification,
            //   schedulingOptions
            // );
          }
        } else if (repeat === "week") {
          var days = Date.daysBetween(
            new Date(start_year, start_month, start_day, 0, 0, 0, 0),
            new Date(end_date)
          );
          days = days - 1;

          var weeks = days / 7;

          weeks = Math.floor(weeks);

          for (var i = isBeforeNow ? 1 : 0; i <= weeks; i++) {
            let t = new Date(date);
            t.setDate(t.getDate() + i * 7);

            schedulingOptions = {
              time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
            };

            console.log(new Date(schedulingOptions.time).toString());

            // Notifications.scheduleLocalNotificationAsync(
            //   localNotification,
            //   schedulingOptions
            // );
          }
        } else if (repeat === "month") {
          var months = 0;
          var end_date = new Date(end_date);

          if (date.getMonth() === end_date.getMonth()) {
            if (end_date.getFullYear() > date.getFullYear()) {
              var years = end_date.getFullYear() - date.getFullYear();
              months += 12 * years;
            }
          } else {
            months = end_date.getMonth() - date.getMonth();
          }

          console.log(months);

          for (var i = isBeforeNow ? 1 : 0; i <= months; i++) {
            let t = new Date(date);
            t.setMonth(t.getMonth() + i);

            schedulingOptions = {
              time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
            };

            console.log(new Date(schedulingOptions.time).toString());

            // Notifications.scheduleLocalNotificationAsync(
            //   localNotification,
            //   schedulingOptions
            // );
          }
        } else if (repeat === "year") {
          var years = 0;

          var end_date = new Date(end_date);

          if (start_year === end_date.getFullYear()) {
            if (!isBeforeNow) {
              years = 1;
            }
          } else {
            years = end_date.getFullYear() - start_year;
          }

          for (var i = 0; i < years; i++) {
            let t = new Date(date);
            t.setFullYear(t.getFullYear() + i);

            schedulingOptions = {
              time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
            };

            console.log(new Date(schedulingOptions.time).toString());

            // Notifications.scheduleLocalNotificationAsync(
            //   localNotification,
            //   schedulingOptions
            // );
          }
        }
      } else {
        schedulingOptions = {
          time: date.getTime(), // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
          repeat: repeat
        };
      }

      Notifications.cancelAllScheduledNotificationsAsync();

      // Notifications.scheduleLocalNotificationAsync(
      //   localNotification,
      //   schedulingOptions
      // );
    }

    addNotification(m_id, title, body, repeat, date, end_date);
  };
};
