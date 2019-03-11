import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import DateDiff from "date-diff";

import { FileSystem, Notifications } from "expo";

import { connect } from "react-redux";

import { reset_data } from "../../redux/actions/data";

import { addMedication } from "../../redux/actions/medications";
import {
  addNotifications,
  updateNotification
} from "../../redux/actions/notifications";

import Metrics from "../../styling/Metrics";

import { localizedStrings } from "../../common/languages";

import Dates from "../containers/Dates";
import Recurrence from "../containers/Recurrence";
import Times from "../containers/Times";
import Type from "../containers/Type";
import Title from "../containers/Title";
import Dosage from "../containers/Dosage";
import Notes from "../containers/Notes";
import MedImage from "../containers/MedImage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class AddScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      added: false,
      m_id: ""
    };
  }

  componentDidMount() {
    this.setState({
      m_id:
        "_" +
        Math.random()
          .toString(36)
          .substr(2, 9) +
        Date.now()
    });

    this.props.reset_data();
  }

  componentWillUnmount() {
    if (!this.state.added)
      if (this.props.data.uri)
        FileSystem.getInfoAsync(this.props.data.uri).then(
          result => result.exists && FileSystem.deleteAsync(this.props.data.uri)
        );
  }

  isBeforeNow(time) {
    var myDate = new Date(time);
    var minutes = myDate.getMinutes();
    var hours = myDate.getHours();

    var today = new Date(Date.now());
    var start_date = new Date(this.props.data.start_date);

    var start_day = start_date.getDate();
    var start_month = start_date.getMonth();
    var start_year = start_date.getFullYear();

    if (
      start_day === today.getDate() &&
      start_month === today.getMonth() &&
      start_year === today.getFullYear()
    ) {
      if (today.getHours() === hours) {
        return today.getMinutes() >= minutes;
      } else {
        return today.getHours() > hours;
      }
    } else {
      return false;
    }
  }

  addNotifications(m_id) {
    return new Promise(resolve => {
      var start_date = new Date(this.props.data.start_date);
      var end_date = new Date(this.props.data.end_date);
      var diff = new DateDiff(end_date, start_date);

      var title = this.props.data.title;
      var body =
        this.props.data.title +
        ": " +
        this.props.data.dosage +
        " " +
        this.props.data.type;

      var notifications = {};

      this.props.data.intake_times.map(time => {
        var myDate = new Date(time);
        var minutes = myDate.getMinutes();
        var hours = myDate.getHours();

        var isBeforeNow = this.isBeforeNow(time);

        var date = new Date(
          start_date.getFullYear(),
          start_date.getMonth(),
          start_date.getDate(),
          hours,
          minutes,
          "0",
          "0"
        );

        var count = 0;
        var recurrence = this.props.data.recurrence;

        if (recurrence === "day") count = diff.days() > 365 ? 365 : diff.days();
        else if (recurrence === "week")
          count = diff.weeks() > 52 ? 52 : diff.weeks();
        else if (recurrence === "month") count = diff.months();
        else if (recurrence === "year") count = diff.years();

        for (var i = isBeforeNow ? 1 : 0; i <= count; i++) {
          let t = new Date(date);

          if (recurrence === "day") t.setDate(t.getDate() + i);
          else if (recurrence === "week") t.setDate(t.getDate() + i * 7);
          else if (recurrence === "month") t.setMonth(t.getMonth() + i);
          else if (recurrence === "year") t.setFullYear(t.getFullYear() + i);

          var id =
            Math.random()
              .toString(36)
              .substr(2, 9) +
            "_" +
            Date.now();

          notifications[id] = {
            m_id,
            id,
            date: t.toString(),
            status: true,
            title,
            body,
            notification_id: ""
          };
        }
      });

      if (Object.values(notifications).length > 0) {
        this.props.addNotifications(m_id, notifications);
        resolve("success");
      } else {
        resolve("empty");
      }
    });
  }

  addMedication() {
    var errors = [];

    if (this.props.data.title.length <= 0) {
      errors.push(localizedStrings[this.props.language].errorNoTitle);
    }
    if (this.props.data.dosage.length <= 0) {
      errors.push(localizedStrings[this.props.language].errorNoDosage);
    }
    if (this.props.data.dosage && parseInt(this.props.data.dosage) <= 0) {
      errors.push(localizedStrings[this.props.language].errorDosageAmount);
    }
    if (this.props.data.start_date.length <= 0) {
      errors.push(localizedStrings[this.props.language].errorNoStartDate);
    }
    if (this.props.data.end_date.length <= 0) {
      errors.push(localizedStrings[this.props.language].errorNoEndDate);
    }
    if (this.props.data.intake_times.length <= 0) {
      errors.push(localizedStrings[this.props.language].errorNoIntakeTimes);
    }

    if (errors.length > 0) {
      Alert.alert(
        localizedStrings[this.props.language].errorLabel,
        errors.join("").toString(),
        [
          {
            text: localizedStrings[this.props.language].okLabel,
            onPress: () => {}
          }
        ],
        { cancelable: false }
      );
    } else {
      this.props.addMedication({
        m_id: this.state.m_id,
        title: this.props.data.title,
        type: this.props.data.type,
        start_date: this.props.data.start_date,
        end_date: this.props.data.end_date,
        intake_times: this.props.data.intake_times,
        recurrence: this.props.data.recurrence,
        dosage: this.props.data.dosage,
        notes: this.props.data.notes,
        uri: this.props.data.uri
      });

      schedule = async () => {
        var notifications = this.props.notifications[this.state.m_id];

        var title = this.props.data.title;
        var body =
          this.props.data.title +
          ": " +
          this.props.data.dosage +
          " " +
          this.props.data.type;

        const localNotification = {
          title,
          body,
          ios: {
            sound: true
          },
          android: {
            channelId: "nextmedNotifications",
            sound: true,
            priority: "high",
            sticky: false,
            vibrate: true
          }
        };

        for (notification in notifications) {
          var date = new Date(notifications[notification].date);

          schedulingOptions = {
            time: date.getTime()
          };

          var notification_id = await Notifications.scheduleLocalNotificationAsync(
            localNotification,
            schedulingOptions
          );

          this.props.updateNotification(
            notification,
            notifications[notification].m_id,
            notification_id,
            true
          );
        }
      };

      this.addNotifications(this.state.m_id).then(async result => {
        if (result === "success") {
          this.setState({ added: true });

          await schedule();
          this.props.navigation.navigate("Home");
        } else if (result === "empty") {
          return Alert.alert(
            localizedStrings[this.props.language].errorLabel,
            "No notifications will be schedualed. Please check dates and intake times",
            [
              {
                text: localizedStrings[this.props.language].okLabel,
                onPress: () => {}
              }
            ],
            { cancelable: false }
          );
        }
      });
    }
  }

  renderScrollView() {
    return (
      <ScrollView style={styles.scrollViewContainer}>
        <Title />
        <MedImage />
        <View style={styles.contentDivder} />
        <Type />
        <View style={styles.contentDivder} />
        <Times />
        <View style={styles.contentDivder} />
        <Dosage />
        <View style={styles.contentDivder} />
        <Recurrence />
        <View style={styles.contentDivder} />
        <Dates />
        <Notes />
        <View style={styles.AddButtoncontainer}>
          <TouchableOpacity
            onPress={this.addMedication.bind(this)}
            style={styles.addButton}
          >
            <Text style={styles.addButtonTitle}>
              {localizedStrings[this.props.language].addLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  render() {
    if (Platform.OS === "android") {
      return (
        <KeyboardAvoidingView
          style={({ flex: 1 }, styles.container)}
          behavior="padding"
          keyboardVerticalOffset={80}
          enabled
        >
          {this.renderScrollView()}
        </KeyboardAvoidingView>
      );
    } else if (Platform.OS === "ios") {
      return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          {this.renderScrollView()}
        </KeyboardAwareScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#242424"
  },

  scrollViewContainer: {
    paddingLeft: Metrics.scrollViewContainerPaddingHorizontal,
    paddingRight: Metrics.scrollViewContainerPaddingHorizontal
  },
  contentDivder: {
    width: "100%",
    borderTopColor: "#595d63",
    borderTopWidth: 3,
    marginTop: 10
  },
  AddButtoncontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  addButtonTitle: {
    fontSize: Metrics.titleFontSize,
    fontFamily: "sansBold",
    color: "#d6d6d6"
  },
  addButton: {
    width: Metrics.formAddTimeButtonWidth,
    height: Metrics.formAddTimeButtonHeight,
    backgroundColor: "#009688",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    borderColor: "grey",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  }
});

const mapStateToProps = state => {
  return {
    data: state.dataState.data,
    language: state.settingsState.language,
    notifications: state.notState.notifications
  };
};

export default connect(
  mapStateToProps,
  {
    addMedication,
    addNotifications,
    updateNotification,
    reset_data
  }
)(AddScreen);
