import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import Metrics from "../../styling/Metrics";

import { set_notes } from "../../redux/actions/data";

import { connect } from "react-redux";

import { localizedStrings } from "../../common/languages";

class Notes extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textAreaContainer}>
          <TextInput
            allowFontScaling={false}
            value={this.props.notes}
            style={styles.textArea}
            multiline={true}
            onChangeText={text => this.props.set_notes(text)}
            placeholder={localizedStrings[this.props.language].notesLabel}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  textAreaContainer: {
    height: Metrics.textAreaContainerHeight,
    width: Metrics.textAreaContainerWidth,
    marginTop: 5,
    alignItems: "center"
  },

  textArea: {
    height: "100%",
    width: "100%",
    padding: 5,
    borderRadius: 10,
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
    notes: state.dataState.data.notes,
    language: state.settingsState.language
  };
};

export default connect(
  mapStateToProps,
  {
    set_notes
  }
)(Notes);
