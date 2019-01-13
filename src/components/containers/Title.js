import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

import Metrics from "../../styling/Metrics";

import { set_title } from "../../redux/actions/data";

import { connect } from "react-redux";

class Title extends Component {
  render() {
    return (
      <View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.medTitle}>Medicine title</Text>
        </View>
        <View>
          <TextInput
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
  titleInput: {
    width: Metrics.formTitleinputBoxW,
    height: Metrics.formTitleinputBoxH,
    paddingLeft: 5,
    backgroundColor: "#fff",
    borderColor: "grey",
    borderRadius: 5,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  },
  medTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
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
