import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Image
} from "react-native";

import Metrics from "../../styling/Metrics";

import { set_dosage } from "../../redux/actions/data";

import { connect } from "react-redux";

import { localizedStrings } from "../../common/languages";

class Dosage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      incrementValue: 1.0,
      increments: [
        {
          label: "0.10",
          value: 0.1,
          image: require("../../../assets/daily.png")
        },
        {
          label: "0.25",
          value: 0.25,
          image: require("../../../assets/daily.png")
        },
        {
          label: "0.50",
          value: 0.5,
          image: require("../../../assets/daily.png")
        },
        {
          label: "1.00",
          value: 1.0,
          image: require("../../../assets/daily.png")
        }
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center", marginTop: 10, marginBottom: 20 }}>
          <Text style={styles.medDosage}>
            {localizedStrings[this.props.language].dosageLabel}
          </Text>
        </View>
        <View style={styles.dosageAddSubImageContainer}>
          <TouchableHighlight
            onPress={() => {
              var dosage = 0;
              var incrementValue = 0;
              var result = 0;

              dosage = this.props.dosage;

              incrementValue = this.state.incrementValue;
              result = dosage - incrementValue;

              result = parseFloat(result.toFixed(2));

              if (result >= 0) this.props.set_dosage(result);
            }}
            style={styles.dosageAddSubButton}
          >
            <Image
              style={styles.dosageAddSubImage}
              source={require("../../../assets/subtract.png")}
            />
          </TouchableHighlight>
          <TextInput
            editable={false}
            value={this.props.dosage.toString()}
            style={styles.dosageInput}
          />
          <TouchableHighlight
            onPress={() => {
              var dosage = 0;
              var incrementValue = 0;
              var result = 0;

              dosage = this.props.dosage;
              incrementValue = this.state.incrementValue;
              result = dosage + incrementValue;

              result = parseFloat(result.toFixed(2));

              this.props.set_dosage(result);
            }}
            style={styles.dosageAddSubButton}
          >
            <Image
              source={require("../../../assets/add.png")}
              style={styles.dosageAddSubImage}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.dosageIncrContainer}>
          {this.state.increments.map((increment, index) => {
            return (
              <TouchableHighlight
                key={index}
                onPress={() =>
                  this.setState({ incrementValue: increment.value })
                }
                style={{
                  width: Metrics.dosageIncrButtonWH,
                  height: Metrics.dosageIncrButtonWH,
                  backgroundColor:
                    this.state.incrementValue !== undefined &&
                    this.state.incrementValue === increment.value
                      ? "#009688"
                      : "#595d63",
                  justifyContent: "center",
                  borderColor: "#d6d6d6",
                  borderWidth: 3,
                  borderRadius: 200
                }}
              >
                <Text style={styles.dosageIncrButtonsText}>
                  {increment.label}
                </Text>
              </TouchableHighlight>
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
    paddingBottom: 10
  },
  medDosage: {
    fontSize: Metrics.titleFontSize,
    fontFamily: "sansBold",
    color: "#d6d6d6"
  },

  dosageInput: {
    width: Metrics.dosageInputBoxWH,
    height: Metrics.dosageInputBoxWH,
    backgroundColor: "#d6d6d6",
    textAlign: "center",
    borderRadius: 20,
    fontWeight: "bold",
    fontSize: Metrics.inputFontSize
  },

  dosageAddSubImageContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 15,
    textAlign: "center"
  },

  dosageAddSubButton: {
    width: Metrics.dosageAddSubButtonWH,
    height: Metrics.dosageAddSubButtonWH,
    backgroundColor: "#009688",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#d6d6d6",
    borderWidth: 3,
    borderRadius: 200
  },

  dosageAddSubImage: {
    width: Metrics.dosageAddSubImageWH,
    height: Metrics.dosageAddSubImageWH
  },

  dosageIncrContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },

  dosageIncrButtonsText: {
    color: "#d6d6d6",
    fontSize: Metrics.DosageIncrFontSize,
    fontFamily: "sansBold",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  }
});

const mapStateToProps = state => {
  return {
    dosage: state.dataState.data.dosage,
    language: state.settingsState.language
  };
};

export default connect(
  mapStateToProps,
  {
    set_dosage
  }
)(Dosage);
