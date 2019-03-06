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
  getNotificationsByMedicationId
} from "./src/common/SQLiteHelper";

import BackgroundTask from "react-native-background-task";

console.disableYellowBox = true;

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

BackgroundTask.define(() => {
  // // get all medications
  // getMedications().then(result => {
  //   // loop on each medication
  //   result.map(medication => {
  //     // get all notifications of that medication using the id
  //     getNotificationsByMedicationId(medication.id).then(notifications => {
  //       var now = new Date(Date.now());
  //       var date = new Date(notifications.date);
  //       var minutes = date.getMinutes();
  //       var hours = date.getHours();

  //       if (medication.recurrence === "day") {
  //         var diff = new DateDiff(date, now);

  //         if (diff.minutes() > 15) {
  //         }
  //       } else if (medication.recurrence === "week") {
  //       } else if (medication.recurrence === "month") {
  //       } else if (medication.recurrence === "year") {
  //       }
  //     });
  //   });
  // });

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
      period: 9000 // Aim to run every 30 mins - more conservative on battery
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
