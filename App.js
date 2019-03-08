import React from "react";
import DateDiff from "date-diff";

import { Text, Platform } from "react-native";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux";

import { Font, Notifications } from "expo";

import Navigation from "./src/components/Navigation";
import {
  createTables,
  getMedications,
  getNotificationsByMedicationId,
  notificationExistsByMedicationId
} from "./src/common/SQLiteHelper";

import BackgroundTask from "react-native-background-task";

console.disableYellowBox = true;

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

BackgroundTask.define(() => {
  // // get all medications
  // getMedications().then(result => {
  //   console.log(result);
  //   // loop on each medication
  //   result.map(medication => {
  //     console.log(medication);
  //     var start_date = new Date(medication.start_date);
  //     var current_date = new Date(Date.now());

  //     var title = medication.title;
  //     var body =
  //       medication.title + ": " + medication.dosage + " " + medication.type;

  //     var intake_times = medication.intake_times.split(",");
  //     intake_times = intake_times.map(time => {
  //       return parseInt(time);
  //     });

  //     const localNotification = {
  //       title,
  //       body,
  //       ios: {
  //         sound: true
  //       },
  //       android: {
  //         channelId: "nextmedNotifications",
  //         sound: true,
  //         priority: "high",
  //         sticky: false,
  //         vibrate: true
  //       }
  //     };

  //     var totalDays = new DateDiff(
  //       new Date(medication.end_date),
  //       new Date(medication.start_date)
  //     ).days();

  //     console.log(totalDays);

  //     var daysLeft = new DateDiff(
  //       new Date(medication.end_date),
  //       new Date(
  //         start_date.getTime() > current_date.getTime()
  //           ? start_date
  //           : Date.now()
  //       )
  //     ).days();

  //     console.log(daysLeft);

  //     // get all notifications of that medication using the id
  //     if (medication.recurrence === "day") {
  //       console.log("Daily");
  //       for (var i = 0; i < (daysLeft < 14 ? daysLeft : 14); i++) {
  //         console.log("I: " + i);
  //         intake_times.map(intake_time => {
  //           console.log("Intake Time: " + intake_time);
  //           var myDate = new Date(intake_time);
  //           var minutes = myDate.getMinutes();
  //           var hours = myDate.getHours();

  //           var date = new Date(
  //             start_date.getTime() > current_date.getTime()
  //               ? start_date.getFullYear()
  //               : current_date.getFullYear(),
  //             start_date.getTime() > current_date.getTime()
  //               ? start_date.getMonth()
  //               : current_date.getMonth(),
  //             start_date.getTime() > current_date.getTime()
  //               ? start_date.getDate()
  //               : current_date.getDate(),
  //             hours,
  //             minutes,
  //             "0",
  //             "0"
  //           );

  //           let t = new Date(date);
  //           t.setDate(t.getDate() + i);

  //           var schedulingOptions = {
  //             time: t.getTime()
  //           };

  //           var diff = new DateDiff(t, new Date(medication.date_added));

  //           notificationExistsByMedicationId(medication.id, t.toString())
  //             .then(result => {
  //               console.log(result);
  //               if (result.length === 0) {
  //                 if (
  //                   diff.minutes() > 15 &&
  //                   t.getTime() > current_date.getTime()
  //                 ) {
  //                   Notifications.scheduleLocalNotificationAsync(
  //                     localNotification,
  //                     schedulingOptions
  //                   ).then(notification_id => {
  //                     schedulingOptions = {
  //                       time: t.getTime()
  //                     };

  //                     addNotification({
  //                       m_id: medication.id,
  //                       notification_id,
  //                       date: new Date(schedulingOptions.time).toString(),
  //                       status: true,
  //                       title,
  //                       body
  //                     });
  //                   });

  //                   console.log(t.toString());
  //                 }
  //               }
  //             })
  //             .catch(error => {
  //               console.log(error);
  //             });
  //         });
  //       }
  //     } else if (medication.recurrence === "week") {
  //     } else if (medication.recurrence === "month") {
  //     } else if (medication.recurrence === "year") {
  //     }
  //   });
  // });
  console.log("Hello from a background task");

  BackgroundTask.finish();
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoad: false
    };

    createTables();
  }

  async componentDidMount() {
    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("nextmedNotifications", {
        name: "Medicine Notifications",
        sound: true,
        vibrate: true, // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
        priority: "high" // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
      });
    }

    await Font.loadAsync({
      champ: require("./assets/fonts/champ.ttf"),
      champBold: require("./assets/fonts/champ-bold.ttf"),
      champItalic: require("./assets/fonts/champ-italic.ttf"),
      champBoldItaic: require("./assets/fonts/champ-bold-italic.ttf"),
      sansBold: require("./assets/fonts/Sansation-Bold.ttf"),
      sansBoldItalic: require("./assets/fonts/Sansation-BoldItalic.ttf"),
      sansItalic: require("./assets/fonts/Sansation-Italic.ttf"),
      sansLight: require("./assets/fonts/Sansation-Light.ttf"),
      sansLightItalic: require("./assets/fonts/Sansation-LightItalic.ttf"),
      sansRegular: require("./assets/fonts/Sansation-Regular.ttf")
    });

    this.setState({ fontLoad: true });

    BackgroundTask.schedule({
      period: 900,
      timeout: 60 * 5
    });
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {this.state.fontLoad ? <Navigation /> : null}
        </PersistGate>
      </Provider>
    );
  }
}
