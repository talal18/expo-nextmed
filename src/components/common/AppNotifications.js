import { Notifications } from "expo";

export default class AppNotifications {
  constructor() {}

  addNotification(title, body, repeat, date, end_date) {
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
    var start_day = date.getDate();
    var start_month = date.getMonth();
    var start_year = date.getFullYear();

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

        for (var i = 0; i <= days; i++) {
          let t = new Date(date);
          t.setDate(t.getDate() + i);

          schedulingOptions = {
            time: t.getTime() // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
          };

          console.log(new Date(schedulingOptions.time).toString());

          // Notifications.scheduleLocalNotificationAsync(
          //   localNotification,
          //   schedulingOptions
          // );
        }
      } else if (repeat === "week") {
      } else if (repeat === "month") {
      } else if (repeat === "year") {
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
}
