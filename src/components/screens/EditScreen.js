import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";

import { connect } from "react-redux";

import { updateMedication } from "../../redux/actions/medications";

import {
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
      m_id: ""
    };
  }

  componentWillMount() {
    this.props.reset_data();
  }

  getMedication(id) {
    this.props.medications.map(item => {
      if (item.m_id === id) {
        this.props.set_m_id(item.m_id);
        this.props.set_title(item.title);
        this.props.set_dosage(item.dosage);
        this.props.set_notes(item.notes);
        this.props.set_recurrence(item.recurrence);
        this.props.set_start_date(item.start_date);
        this.props.set_end_date(item.end_date);
        this.props.set_type(item.type);

        item.intake_times.map(time => {
          this.props.add_time(time);
        });
      }
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

  updateNotification() {
    var errors = [];

    if (this.props.data.title.length <= 0) {
      errors.push(`You must provide a title`);
    }
    if (this.props.data.dosage.length <= 0) {
      errors.push(`\nYou must provide a dosage amount`);
    }
    if (this.props.data.dosage && parseInt(this.props.data.dosage) <= 0) {
      errors.push(`\nDosage can't be less than or equal to 0`);
    }
    if (this.props.data.start_date.length <= 0) {
      errors.push(`\nYou must provide a start date`);
    }
    if (this.props.data.intake_times.length <= 0) {
      errors.push(`\nYou must have atleast 1 intake time`);
    }

    if (errors.length > 0) {
      Alert.alert(
        "Error",
        errors.toString(),
        [
          {
            text: "OK",
            onPress: () => {}
          }
        ],
        { cancelable: false }
      );
    } else {
      this.props.updateMedication({
        m_id: this.props.data.m_id,
        title: this.props.data.title,
        type: this.props.data.type,
        start_date: this.props.data.start_date,
        end_date: this.props.data.end_date,
        intake_times: this.props.data.intake_times,
        recurrence: this.props.data.recurrence,
        dosage: this.props.data.dosage,
        notes: this.props.data.notes
      });
      this.props.navigation.navigate("Home");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollViewContainer}>
          <Title />
          <MedImage />
          <View style={styles.contentDivder} />
          <Type />
          <View style={styles.contentDivder} />
          <Times />
          <Dosage />
          <View style={styles.contentDivder} />
          <Recurrence />
          <View style={styles.contentDivder} />
          <Dates />
          <TouchableOpacity
            onPress={this.manageNotifications.bind(this)}
            style={styles.updateButton}
          >
            <Text style={styles.updateButtonTitle}>Manage Notifications</Text>
          </TouchableOpacity>
          <Notes />
          <TouchableOpacity
            onPress={this.updateNotification.bind(this)}
            style={styles.updateButton}
          >
            <Text style={styles.updateButtonTitle}>Update</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#262626",
    justifyContent: "center",
    alignItems: "center"
    //paddingTop: Metrics.formContainerPaddingTop
  },
  scrollViewContainer: {
    paddingLeft: Metrics.scrollViewContainerPaddingHorizontal,
    paddingRight: Metrics.scrollViewContainerPaddingHorizontal
  },
  contentDivder: {
    width: Metrics.formContentDivider,
    borderTopColor: "#595d63",
    borderTopWidth: 3,
    marginTop: 10
  },
  updateButtonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
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
    medications: state.medState.medications
  };
};

export default connect(
  mapStateToProps,
  {
    updateMedication,
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
    set_user_id
  }
)(EditScreen);
