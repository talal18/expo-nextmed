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
import {
  getMedicationById,
  updateMedication,
  getNotificationsByMedicationId,
  addNotification,
  deleteNotificationById
} from "../../common/SQLiteHelper";

class EditScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: []
    };
  }

  componentWillMount() {
    this.props.reset_data();
  }

  getMedication(id) {
    getMedicationById(id).then(result => {
      this.props.set_title(result.title);
      this.props.set_dosage(parseFloat(result.dosage));
      this.props.set_notes(result.notes);
      this.props.set_recurrence(result.recurrence);
      this.props.set_start_date(result.start_date);
      this.props.set_end_date(result.end_date);
      this.props.set_type(result.type);
      this.props.set_image_uri(result.uri);

      var intake_times = result.intake_times.split(",");
      intake_times.map(time => {
        this.props.add_time(parseInt(time));
      });

      getNotificationsByMedicationId(id)
        .then(result => {
          this.setState({ notifications: result });
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  componentDidMount() {
    this.getMedication(this.props.navigation.state.params.id);
  }

  manageNotifications() {
    this.props.navigation.navigate("Notifications", {
      id: this.props.navigation.state.params.id
    });
  }

  deleteNotifications(id) {
    getNotificationsByMedicationId(id).then(result => {
      result.map(notification => {
        if (
          new Date(notification.date).getTime() > new Date(Date.now()).getTime()
        )
          Notifications.cancelScheduledNotificationAsync(
            notification.notification_id
          );

        deleteNotificationById(notification.id);
      });
    });
  }

  async updateNotifications(m_id) {
    this.props.data.intake_times.map(time => {
      var start_date = new Date(this.props.data.start_date);
      var myDate = new Date(time);
      var minutes = myDate.getMinutes();
      var hours = myDate.getHours();

      var now = new Date(Date.now());
      var date = new Date(
        start_date.getFullYear(),
        start_date.getMonth(),
        start_date.getDate(),
        hours,
        minutes,
        "0",
        "0"
      );

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

      var diff = new DateDiff(date, now);

      if (diff.minutes() <= 15 && date.getTime() > now.getTime()) {
        var schedulingOptions = {
          time: date.getTime()
        };
        Notifications.scheduleLocalNotificationAsync(
          localNotification,
          schedulingOptions
        ).then(notification_id => {
          schedulingOptions = {
            time: date.getTime()
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
    });
  }

  updateMedication() {
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

    var dateNow = new Date(Date.now());
    var startDate = new Date(this.props.data.start_date);
    var start_day = startDate.getDate();
    var start_month = startDate.getMonth();
    var start_year = startDate.getFullYear();

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
      updateMedication(this.props.navigation.state.params.id, {
        title: this.props.data.title,
        type: this.props.data.type,
        start_date: this.props.data.start_date,
        end_date: this.props.data.end_date,
        intake_times: this.props.data.intake_times.sort(function(a, b) {
          return a - b;
        }),
        recurrence: this.props.data.recurrence,
        dosage: this.props.data.dosage,
        notes: this.props.data.notes,
        uri: this.props.data.uri
      })
        .then(async m_id => {
          this.deleteNotifications(m_id);

          await this.updateNotifications(m_id);

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
    language: state.settingsState.language
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
    set_image_uri
  }
)(EditScreen);
