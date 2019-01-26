import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  Picker,
  Image
} from "react-native";

import { Dropdown } from "react-native-material-dropdown";

import Metrics from "../../styling/Metrics";

import { connect } from "react-redux";

import { set_recurrence } from "../../redux/actions/data";

class Recurrence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recurrences: [
        { label: "Daily", value: "day" },
        { label: "Weekly", value: "week" },
        { label: "Monthly", value: "month" },
        { label: "Yearly", value: "year" }
      ],
      message: ""
    };
  }

  componentDidMount() {
    this.props.set_recurrence("day");
  }

  render() {
    return (
      <View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.medRecTitle}>Frequency</Text>
        </View>
        <View>
          <Dropdown
            allowFontScaling={false}
            fontSize={Metrics.dropDownFontSize}
            fontWeight="bold"
            itemTextStyle={{
              fontSize: Metrics.dropDownFontSize,
              fontWeight: "bold"
            }}
            inputContainerStyle={{ borderBottomColor: "transparent" }}
            value={this.props.recurrence}
            rippleOpacity={0}
            dropdownOffset={{
              top: 10,
              left: 0
            }}
            containerStyle={styles.textInputStyle}
            data={this.state.recurrences}
            onChangeText={(recurrence, itemIndex, data) => {
              this.props.set_recurrence(recurrence);
            }}
          />
        </View>
        {this.props.recurrence === "day" || this.props.recurrence === "week" ? (
          <View style={styles.frequencyNoteContainer}>
            <Text style={styles.frequencyNote}>
              Note: Notifications will be set for 1 year only.
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  medRecTitle: {
    fontSize: Metrics.titleFontSize,
    fontWeight: "bold",
    color: "#fff"
  },
  textInputStyle: {
    justifyContent: "center",
    width: Metrics.formTitleinputBoxW,
    height: Metrics.formTitleinputBoxH,
    paddingLeft: 5,
    backgroundColor: "#fff",
    borderColor: "grey",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  },
  frequencyNoteContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  frequencyNote: {
    color: "#FFF",
    fontStyle: "italic"
  }
});

const mapStateToProps = state => {
  return {
    recurrence: state.dataState.data.recurrence
  };
};

export default connect(
  mapStateToProps,
  { set_recurrence }
)(Recurrence);
