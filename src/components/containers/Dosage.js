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
      incrementValue: 1.0
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "center", marginTop: 10, marginBottom: 20 }}>
          <Text style={styles.medDosage}>
            {localizedStrings[this.props.language].dosageLabel}
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: 15,
            textAlign: "center"
          }}
        >
          <TouchableHighlight
            onPress={() => {
              var dosage = 0;
              var incrementValue = 0;
              var result = 0;

              dosage = this.props.dosage;
              incrementValue = this.state.incrementValue;
              result = dosage - incrementValue;

              result = parseFloat(result.toFixed(2));

              this.props.set_dosage(result);
            }}
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#009688",
              justifyContent: "center",
              borderColor: "#d6d6d6",
              borderWidth: 5,
              borderRadius: 200
            }}
          >
            <Image
              style={{ width: 70, height: 70 }}
              source={require("../../assets/images/subtract.png")}
            />
          </TouchableHighlight>
          <TextInput
            value={this.props.dosage.toString()}
            style={{
              width: 100,
              height: 100,
              backgroundColor: "#d6d6d6",
              textAlign: "center",
              borderRadius: 20
            }}
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
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#009688",
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#d6d6d6",
              borderWidth: 5,
              borderRadius: 200
            }}
          >
            <Image
              source={require("../../assets/images/add.png")}
              style={{ width: 70, height: 70 }}
            />
          </TouchableHighlight>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <TouchableHighlight
            onPress={() => this.setState({ incrementValue: 0.1 })}
            style={{
              width: 60,
              height: 60,
              backgroundColor: "#009688",
              justifyContent: "center",
              borderColor: "#d6d6d6",
              borderWidth: 3,
              borderRadius: 200
            }}
          >
            <Text
              style={{
                color: "#d6d6d6",
                fontSize: 16,
                fontFamily: "sansBold",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              0.10
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.setState({ incrementValue: 0.25 })}
            style={{
              width: 60,
              height: 60,
              backgroundColor: "#009688",
              justifyContent: "center",
              borderColor: "#d6d6d6",
              borderWidth: 3,
              borderRadius: 200
            }}
          >
            <Text
              style={{
                color: "#d6d6d6",
                fontSize: 16,
                fontFamily: "sansBold",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              0.25
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.setState({ incrementValue: 0.5 })}
            style={{
              width: 60,
              height: 60,
              backgroundColor: "#009688",
              justifyContent: "center",
              borderColor: "#d6d6d6",
              borderWidth: 3,
              borderRadius: 200
            }}
          >
            <Text
              style={{
                color: "#d6d6d6",
                fontSize: 16,
                fontFamily: "sansBold",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              0.50
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.setState({ incrementValue: 1 })}
            style={{
              width: 60,
              height: 60,
              backgroundColor: "#009688",
              justifyContent: "center",
              borderColor: "#d6d6d6",
              borderWidth: 3,
              borderRadius: 200
            }}
          >
            <Text
              style={{
                color: "#d6d6d6",
                fontSize: 16,
                fontFamily: "sansBold",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              1.00
            </Text>
          </TouchableHighlight>
        </View>
      </View>

      // <View>
      //   <View style={{ alignItems: "center", marginTop: 10 }}>
      //     <Text style={styles.medDosage}>
      //       {localizedStrings[this.props.language].dosageLabel}
      //     </Text>
      //   </View>
      //   <View>
      //     <TextInput
      //       allowFontScaling={false}
      //       value={this.props.dosage}
      //       onChangeText={text => this.props.set_dosage(text)}
      //       keyboardType="number-pad"
      //       style={styles.dosageInput}
      //     />
      //   </View>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  dosageInput: {
    width: Metrics.formTitleinputBoxW,
    height: Metrics.formTitleinputBoxH,
    paddingLeft: 5,
    backgroundColor: "#d6d6d6",
    borderColor: "grey",
    borderRadius: 5,
    fontSize: Metrics.inputFontSize,
    fontFamily: "sansRegular",
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  },
  medDosage: {
    fontSize: Metrics.titleFontSize,
    fontFamily: "sansBold",
    color: "#d6d6d6"
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
