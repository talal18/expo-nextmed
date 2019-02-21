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
          value: "day",
          image: require("../../assets/images/daily.png")
        },
        {
          label:
            localizedStrings[this.props.language].frequencyMenuLabels
              .weeklyLabel,
          value: "week",
          image: require("../../assets/images/weekly.png")
        },
        {
          label:
            localizedStrings[this.props.language].frequencyMenuLabels
              .monthlyLabel,
          value: "month",
          image: require("../../assets/images/monthly.png")
        },
        {
          label:
            localizedStrings[this.props.language].frequencyMenuLabels
              .yearlyLabel,
          value: "year",
          image: require("../../assets/images/yearly.png")
        }
      ],
      message: ""
    };
  }

  componentDidMount() {
    // this.props.set_recurrence("day");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.medRecTitleContainer}>
          <Text style={styles.medRecTitle}>
            {localizedStrings[this.props.language].frequencyLabel}
          </Text>
        </View>
        <View style={styles.medRecImagesContainer}>
          {this.state.recurrences.map((item, index) => {
            return (
              <View key={index} style={styles.medRecEachImageContainer}>
                <View
                  style={{
                    borderWidth: 3,
                    borderRadius: 200,
                    borderColor: "#d6d6d6",
                    padding: 10,
                    margin: 10,
                    backgroundColor:
                      this.props.recurrence !== undefined &&
                      this.props.recurrence.length > 0 &&
                      this.props.recurrence === item.value
                        ? "#009688"
                        : "#595d63"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.props.set_recurrence(item.value)}
                  >
                    <Image style={styles.medRecImage} source={item.image} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.medRecText}>{item.label}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  medRecTitleContainer: {
    alignItems: "center",
    marginTop: 10
  },

  medRecTitle: {
    fontSize: Metrics.titleFontSize,
    fontFamily: "sansBold",
    color: "#d6d6d6"
  },

  medRecImagesContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 5
  },

  medRecEachImageContainer: {
    width: Metrics.medRecEachImageContainerW,
    height: Metrics.medRecEachImageContainerH,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5
  },

  medRecImage: {
    width: Metrics.medRecImageWH,
    height: Metrics.medRecImageWH
  },

  medRecText: {
    marginTop: 5,
    fontFamily: "sansRegular",
    fontSize: Metrics.TypeRecFontSize,
    color: "#d6d6d6"
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

{
  /* <View>
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
        ) : null} */
}

// textInputStyle: {
//   justifyContent: "center",
//   width: Metrics.formTitleinputBoxW,
//   height: Metrics.formTitleinputBoxH,
//   paddingLeft: 5,
//   backgroundColor: "#d6d6d6",

//   borderColor: "grey",
//   borderRadius: 5,
//   marginTop: 10,
//   marginBottom: 10,
//   shadowColor: "#303838",
//   shadowOffset: { width: 0, height: 5 },
//   shadowRadius: 10,
//   shadowOpacity: 0.35
// },
