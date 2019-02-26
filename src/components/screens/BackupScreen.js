import React from "react";
import { Share, Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { connect } from "react-redux";
import Metrics from "../../styling/Metrics";

import { localizedStrings } from "../../common/languages";

class BackupScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  backup() {}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.descTextContainer}>
          <Text style={styles.descText}>
            Backup and Restore data aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={this.backup.bind(this)}
            style={styles.buttons}
          >
            <Text style={styles.buttonsText}>Backup Data</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttons}>
            <Text style={styles.buttonsText}>Restore Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  descTextContainer: {
    justifyContent: "center",
    alignItems: "center"
  },

  descText: {
    fontFamily: "sansItalic",
    color: "#d6d6d6",
    fontSize: Metrics.EmptyFlatListFontSize,
    textAlign: "left",
    flexWrap: "wrap"
  },

  buttonsContainer: { alignItems: "center", justifyContent: "center" },

  buttons: {
    width: Metrics.formAddTimeButtonWidth,
    height: Metrics.formAddTimeButtonHeight,
    backgroundColor: "#009688",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    borderColor: "grey",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  },

  buttonsText: {
    fontSize: Metrics.titleFontSize,
    fontFamily: "sansBold",
    color: "#d6d6d6"
  }
});

const mapStateToProps = state => {
  return {
    language: state.settingsState.language
  };
};

export default connect(
  mapStateToProps,
  {}
)(BackupScreen);
