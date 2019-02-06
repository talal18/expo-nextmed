import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

import Metrics from "../../styling/Metrics";

import { set_title } from "../../redux/actions/data";

import { connect } from "react-redux";

import { localizedStrings } from "../../common/languages";

class Title extends Component {
  render() {
    return (
      <View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.medTitle}>
            {localizedStrings["en"].medicineTitleLabel}
          </Text>
        </View>
        <View>
          <TextInput
            allowFontScaling={false}
            value={this.props.title}
            onChangeText={text => this.props.set_title(text)}
            style={styles.titleInput}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  medTitle: {
    fontSize: Metrics.titleFontSize,
    fontFamily: "sansBold",
    color: "#d6d6d6"
  },

  titleInput: {
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
  }
});

const mapStateToProps = state => {
  return {
    title: state.dataState.data.title
  };
};

export default connect(
  mapStateToProps,
  {
    set_title
  }
)(Title);
