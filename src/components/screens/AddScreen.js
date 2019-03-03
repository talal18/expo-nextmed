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

import { addMedication, addNotification } from "../../common/SQLiteHelper";

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
      added: false
    };
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

      if (this.props.data.recurrence === "day") {
        var days = diff.days();
        if (days > 365) days = 365;
        for (var i = isBeforeNow ? 1 : 0; i <= days; i++) {
          let t = new Date(date);
          t.setDate(t.getDate() + i);

          var schedulingOptions = {
            time: t.getTime()
          };

          Notifications.scheduleLocalNotificationAsync(
            localNotification,
            schedulingOptions
          ).then(notification_id => {
            schedulingOptions = {
              time: t.getTime()
            };

            addNotification({
              m_id,
              notification_id,
              date: new Date(schedulingOptions.time).toString(),
              status: true,
              title,
              body
            });
          });
        }
      } else if (this.props.data.recurrence === "week") {
        var weeks = diff.weeks();

        if (weeks > 52) weeks = 52;

        for (var i = isBeforeNow ? 1 : 0; i <= weeks; i++) {
          let t = new Date(date);
          t.setDate(t.getDate() + i * 7);

          var schedulingOptions = {
            time: t.getTime()
          };

          Notifications.scheduleLocalNotificationAsync(
            localNotification,
            schedulingOptions
          ).then(notification_id => {
            schedulingOptions = {
              time: t.getTime()
            };

            addNotification({
              m_id,
              notification_id,
              date: new Date(schedulingOptions.time).toString(),
              status: true,
              title,
              body
            });
          });
        }
      } else if (this.props.data.recurrence === "month") {
        var months = diff.months();

        for (var i = isBeforeNow ? 1 : 0; i <= months; i++) {
          let t = new Date(date);
          t.setMonth(t.getMonth() + i);

          var schedulingOptions = {
            time: t.getTime()
          };

          Notifications.scheduleLocalNotificationAsync(
            localNotification,
            schedulingOptions
          ).then(notification_id => {
            schedulingOptions = {
              time: t.getTime()
            };

            addNotification({
              m_id,
              notification_id,
              date: new Date(schedulingOptions.time).toString(),
              status: true,
              title,
              body
            });
          });
        }
      } else if (this.props.data.recurrence === "year") {
        var years = diff.years();

        for (var i = isBeforeNow ? 1 : 0; i <= years; i++) {
          let t = new Date(date);
          t.setFullYear(t.getFullYear() + i);

          var schedulingOptions = {
            time: t.getTime()
          };

          Notifications.scheduleLocalNotificationAsync(
            localNotification,
            schedulingOptions
          ).then(notification_id => {
            schedulingOptions = {
              time: t.getTime()
            };

            addNotification({
              m_id,
              notification_id,
              date: new Date(schedulingOptions.time).toString(),
              status: true,
              title,
              body
            });
          });
        }
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
      addMedication({
        title: this.props.data.title,
        type: this.props.data.type,
        start_date: this.props.data.start_date,
        end_date: this.props.data.end_date,
        intake_times: this.props.data.intake_times,
        recurrence: this.props.data.recurrence,
        dosage: this.props.data.dosage,
        notes: this.props.data.notes,
        uri: this.props.data.uri
      })
        .then(m_id => {
          this.addNotifications(m_id);

          this.setState({ added: true });

          this.props.navigation.navigate("Home");
        })
        .catch(error => {
          console.log(error);
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
    language: state.settingsState.language
  };
};

export default connect(
  mapStateToProps,
  {
    reset_data
  }
)(AddScreen);
