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

import { addMedication } from "../../redux/actions/medications";

import { reset_data } from "../../redux/actions/data";

import Metrics from "../../styling/Metrics";

import Dates from "../containers/Dates";
import Recurrence from "../containers/Recurrence";
import Times from "../containers/Times";
import Type from "../containers/Type";
import Title from "../containers/Title";
import Dosage from "../containers/Dosage";
import Notes from "../containers/Notes";
import MedImage from "../containers/MedImage";

import AppNotifications from "../common/AppNotifications";

class AddScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      m_id: ""
    };

    this.notify = new AppNotifications();
  }

  componentWillMount() {
    this.props.reset_data();
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
  }

  addNotification() {
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
      var start_date = new Date(this.props.data.start_date);

      /*
        7:45 PM

        Tuseday 15        
        Wednesday 16
        Thursday 17
        Friday 18
      */

      this.props.data.intake_times.map(item => {
        var myDate = new Date(item.time);
        var minutes = myDate.getMinutes();
        var hours = myDate.getHours();

        var date = new Date(
          start_date.getFullYear(),
          start_date.getMonth(),
          start_date.getDate(),
          hours,
          minutes,
          "0",
          "0"
        );

        this.notify.addNotification(
          this.props.data.title,
          this.props.data.title +
            ` is now due. You should take ${this.props.data.dosage} ${
              this.props.data.type
            }`,
          this.props.data.recurrence,
          date,
          this.props.data.end_date
        );
      });

      this.props.addMedication({
        m_id: this.state.m_id,
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
          <Notes />
          <TouchableOpacity
            onPress={this.addNotification.bind(this)}
            style={styles.addButton}
          >
            <Text style={styles.addButtonTitle}>Add Medicine</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: Metrics.formContentDivider,
    borderTopColor: "#595d63",
    borderTopWidth: 3,
    marginTop: 10
  },
  addButtonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
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
    data: state.dataState.data
  };
};

export default connect(
  mapStateToProps,
  {
    addMedication,
    reset_data
  }
)(AddScreen);
