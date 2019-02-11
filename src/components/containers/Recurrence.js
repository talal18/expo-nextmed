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

import { localizedStrings } from "../../common/languages";

class Recurrence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recurrences: [
        {
          label:
            localizedStrings[this.props.language].frequencyMenuLabels
              .dailyLabel,
          value: "day"
        },
        {
          label:
            localizedStrings[this.props.language].frequencyMenuLabels
              .weeklyLabel,
          value: "week"
        },
        {
          label:
            localizedStrings[this.props.language].frequencyMenuLabels
              .monthlyLabel,
          value: "month"
        },
        {
          label:
            localizedStrings[this.props.language].frequencyMenuLabels
              .yearlyLabel,
          value: "year"
        }
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
          <Text style={styles.medRecTitle}>
            {localizedStrings[this.props.language].frequencyLabel}
          </Text>
        </View>
        <View>
          <Dropdown
            allowFontScaling={false}
            fontSize={Metrics.dropDownFontSize}
            // fontFamily="sansBold"
            itemTextStyle={{
              fontSize: Metrics.dropDownFontSize
              // fontFamily: "sansBold"
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
              {localizedStrings[this.props.language].notificationNoteLabel}
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
    fontFamily: "sansBold",
    color: "#d6d6d6"
  },
  textInputStyle: {
    justifyContent: "center",
    width: Metrics.formTitleinputBoxW,
    height: Metrics.formTitleinputBoxH,
    paddingLeft: 5,
    backgroundColor: "#d6d6d6",

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
    color: "#d6d6d6",
    fontFamily: "sansItalic"
  }
});

const mapStateToProps = state => {
  return {
    recurrence: state.dataState.data.recurrence,
    language: state.settingsState.language
  };
};

export default connect(
  mapStateToProps,
  { set_recurrence }
)(Recurrence);
