import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

import Metrics from "../../styling/Metrics";

import { set_dosage } from "../../redux/actions/data";

import { connect } from "react-redux";

class Dosage extends Component {
  render() {
    return (
      <View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.medDosage}>Dosage</Text>
        </View>
        <View>
          <TextInput
            allowFontScaling={false}
            value={this.props.dosage}
            onChangeText={text => this.props.set_dosage(text)}
            keyboardType="number-pad"
            style={styles.dosageInput}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dosageInput: {
    width: Metrics.formTitleinputBoxW,
    height: Metrics.formTitleinputBoxH,
    paddingLeft: 5,
    backgroundColor: "#fff",
    borderColor: "grey",
    borderRadius: 5,
    fontSize: Metrics.inputFontSize,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  },
  medDosage: {
    fontSize: Metrics.titleFontSize,
    fontWeight: "bold",
    color: "#fff"
  }
});

const mapStateToProps = state => {
  return {
    dosage: state.dataState.data.dosage
  };
};

export default connect(
  mapStateToProps,
  {
    set_dosage
  }
)(Dosage);
