import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import Metrics from "../../styling/Metrics";

import { set_notes } from "../../redux/actions/data";

import { connect } from "react-redux";

class Notes extends Component {
  render() {
    return (
      <View>
        <View style={styles.textAreaContainer}>
          <TextInput
            allowFontScaling={false}
            value={this.props.notes}
            style={styles.textArea}
            multiline={true}
            onChangeText={text => this.props.set_notes(text)}
            placeholder="Notes"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textAreaContainer: {
    height: Metrics.textAreaContainerHeight,
    width: Metrics.textAreaContainerWidth,
    marginTop: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    alignItems: "center"
  },

  textArea: {
    height: "100%",
    width: "100%",
    padding: 5,
    fontSize: Metrics.inputFontSize,
    fontFamily: "sansItalic",
    backgroundColor: "#d6d6d6",
    color: "#262626",
    textAlignVertical: "top",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
});

const mapStateToProps = state => {
  return {
    notes: state.dataState.data.notes
  };
};

export default connect(
  mapStateToProps,
  {
    set_notes
  }
)(Notes);
