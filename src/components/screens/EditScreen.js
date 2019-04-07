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

import { connect } from "react-redux";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { localizedStrings } from "../../common/languages";

import {
  set_image_uri,
  set_m_id,
  set_user_id,
  set_title,
  set_type,
  set_dosage,
  set_recurrence,
  add_time,
  set_start_date,
  set_end_date,
  set_notes,
  reset_data
} from "../../redux/actions/data";

import { updateMedication } from "../../redux/actions/medications";

import {
  addNotification,
  deleteNotifications
} from "../../redux/actions/notifications";

import { Notifications } from "expo";

import Metrics from "../../styling/Metrics";

import Dates from "../containers/Dates";
import Recurrence from "../containers/Recurrence";
import Times from "../containers/Times";
import Type from "../containers/Type";
import Title from "../containers/Title";
import Dosage from "../containers/Dosage";
import Notes from "../containers/Notes";
import MedImage from "../containers/MedImage";

class EditScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      m_id: "",
      notifications: {}
    };
  }

  componentWillMount() {
    this.props.reset_data();
  }

  getMedication(id) {
    let medication = this.props.medications[id];
    this.props.set_title(medication.title);
    this.props.set_dosage(parseFloat(medication.dosage));
    this.props.set_notes(medication.notes);
    this.props.set_recurrence(medication.recurrence);
    this.props.set_start_date(medication.start_date);
    this.props.set_end_date(medication.end_date);
    this.props.set_type(medication.type);
    this.props.set_image_uri(medication.uri);

    medication.intake_times.map(time => {
      this.props.add_time(time);
    });
  }

  componentDidMount() {
    this.props.reset_data();
    this.getMedication(this.props.navigation.state.params.id);

    this.setState({
      m_id: this.props.navigation.state.params.id
    });
  }

  manageNotifications() {
    this.props.navigation.navigate("Notifications", {
      id: this.props.navigation.state.params.id
    });
  }

  isBeforeNow(time) {
    let myDate = new Date(time);
    let minutes = myDate.getMinutes();
    let hours = myDate.getHours();

    let today = new Date(Date.now());
    let start_date = new Date(this.props.data.start_date);

    let start_day = start_date.getDate();
    let start_month = start_date.getMonth();
    let start_year = start_date.getFullYear();

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

  async updateNotifications(m_id) {
    let start_date = new Date(this.props.data.start_date);

    let title = this.props.data.title;
    let body =
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

    let recurrence = this.props.data.recurrence;

    let end_date_time = new Date(
      this.props.data.intake_times[this.props.data.intake_times.length - 1]
    );

    let end_date_reminder = new Date(
      end_date.getFullYear(),
      end_date.getMonth(),
      end_date.getDate(),
      end_date_time.getHours(),
      end_date_time.getMinutes(),
      "0",
      "0"
    );

    let end_date_id = await Notifications.scheduleLocalNotificationAsync(
      {
        data: {
          m_id,
          isEndDate: true
        },
        title,
        body,
        ios: {
          sound: true
        },
        android: {
          channelId: "nextmedNotifications",
          sound: true,
          priority: "high",
          vibrate: true,
          sticky: true
        }
      },
      {
        time: end_date_reminder.getTime()
      }
    );

    this.props.data.intake_times.map(async time => {
      let myDate = new Date(time);
      let minutes = myDate.getMinutes();
      let hours = myDate.getHours();

      let date = new Date(
        start_date.getFullYear(),
        start_date.getMonth(),
        start_date.getDate(),
        hours,
        minutes,
        "0",
        "0"
      );

      if (date.getTime() < new Date(Date.now()).getTime()) {
        if (this.props.data.recurrence === "day")
          date.setDate(date.getDate() + 1);
        else if (this.props.data.recurrence === "week")
          date.setDate(date.getDate() + 1 * 7);
        else if (this.props.data.recurrence === "month")
          date.setMonth(date.getMonth() + 1);
        else if (this.props.data.recurrence === "year")
          date.setFullYear(date.getFullYear() + 1);
      }

      let schedulingOptions = {
        time: date.getTime(),
        repeat: recurrence
      };

      let notification_id = await Notifications.scheduleLocalNotificationAsync(
        localNotification,
        schedulingOptions
      );

      let id =
        Math.random()
          .toString(36)
          .substr(2, 9) +
        "_" +
        Date.now();

      this.props.addNotification({
        m_id,
        id,
        date: date.toString(),
        status: true,
        title,
        body,
        notification_id
      });
    });
  }

  async updateMedication() {
    let errors = [];

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

    let dateNow = new Date(Date.now());
    let startDate = new Date(this.props.data.start_date);
    let start_day = startDate.getDate();
    let start_month = startDate.getMonth();
    let start_year = startDate.getFullYear();

    if (
      start_year < dateNow.getFullYear() ||
      (start_year === dateNow.getFullYear() &&
        start_month < dateNow.getMonth()) ||
      (start_year === dateNow.getFullYear() &&
        start_month === dateNow.getMonth() &&
        start_day < dateNow.getDate())
    ) {
      errors.push(
        localizedStrings[this.props.language]
          .errorStartDateBeforeTodayDateLabel + `\n`
      );
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
      this.props.deleteNotifications(this.props.navigation.state.params.id);
      this.props.updateMedication({
        m_id: this.props.navigation.state.params.id,
        title: this.props.data.title,
        type: this.props.data.type,
        start_date: this.props.data.start_date,
        end_date: this.props.data.end_date,
        intake_times: this.props.data.intake_times,
        recurrence: this.props.data.recurrence,
        dosage: this.props.data.dosage,
        notes: this.props.data.notes,
        uri: this.props.data.uri,
        history: false
      });

      this.updateNotifications(this.state.m_id);

      this.setState({ added: true });

      this.props.navigation.navigate("Home");
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
        <View style={styles.manageNotificationsButtonContainer}>
          <TouchableOpacity
            onPress={this.manageNotifications.bind(this)}
            style={styles.updateButton}
          >
            <Text style={styles.updateButtonTitle}>
              {localizedStrings[this.props.language].manageNotificationsLabel}
            </Text>
          </TouchableOpacity>
        </View>
        <Notes />
        <View style={styles.updateButtonContainer}>
          <TouchableOpacity
            onPress={this.updateMedication.bind(this)}
            style={styles.updateButton}
          >
            <Text style={styles.updateButtonTitle}>
              {localizedStrings[this.props.language].updateLabel}
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
  manageNotificationsButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  updateButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  updateButtonTitle: {
    fontSize: Metrics.titleFontSize,
    fontFamily: "sansBold",
    color: "#d6d6d6"
  },
  updateButton: {
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
    medications: state.medState.medications,
    notifications: state.notState.notifications
  };
};

export default connect(
  mapStateToProps,
  {
    reset_data,
    set_title,
    set_type,
    set_dosage,
    set_recurrence,
    add_time,
    set_start_date,
    set_end_date,
    set_notes,
    set_m_id,
    set_user_id,
    set_image_uri,
    updateMedication,
    addNotification,
    deleteNotifications
  }
)(EditScreen);
