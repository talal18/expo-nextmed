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

import { FileSystem, Notifications } from "expo";

import { connect } from "react-redux";

import { reset_data } from "../../redux/actions/data";

import { addMedication } from "../../redux/actions/medications";
import { addNotification } from "../../redux/actions/notifications";

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

  async addNotifications(m_id) {
    let start_date = new Date(this.props.data.start_date);
    let end_date = new Date(this.props.data.end_date);

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
          m_id
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

  async addMedication() {
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
        uri: this.props.data.uri,
        history: false
      });

      this.addNotifications(this.state.m_id);

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
    addNotification,
    reset_data
  }
)(AddScreen);
