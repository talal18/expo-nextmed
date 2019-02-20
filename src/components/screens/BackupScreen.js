import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { connect } from "react-redux";
import Metrics from "../../styling/Metrics";

import { localizedStrings } from "../../common/languages";

class BackupScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    justifyContent: "flex-start"
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
