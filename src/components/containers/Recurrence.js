import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";

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
                    padding: 5,
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
                <View style={styles.medRecTextContainer}>
                  <Text style={styles.medRecText}>{item.label}</Text>
                </View>
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
    flex: 1,
    alignItems: "center",
    marginTop: 5
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
    flex: 1,
    // width: Metrics.medRecEachImageContainerW,
    // height: Metrics.medRecEachImageContainerH,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5
  },

  medRecImage: {
    width: Metrics.medRecImageWH,
    height: Metrics.medRecImageWH
  },

  medRecTextContainer: {
    flex: 1
  },

  medRecText: {
    marginTop: 5,
    fontFamily: "sansRegular",
    fontSize: Metrics.RecFontSize,
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
