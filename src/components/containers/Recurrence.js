import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  Picker,
  Image
} from "react-native";

import Metrics from "../../styling/Metrics";

import { connect } from "react-redux";

import { set_recurrence } from "../../redux/actions/data";

class Recurrence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recurrences: [
        { label: "Daily", value: "daily" },
        { label: "Weekly", value: "weekly" },
        { label: "Monthly", value: "monthly" },
        { label: "Yearly", value: "yearly" }
      ],
      recurrence_label: "Daily"
    };
  }

  componentDidMount() {
    this.props.set_recurrence("daily");
  }

  render() {
    return (
      <View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.medRecTitle}>Medicine Recurrence</Text>
        </View>
        <View>
          {Platform.OS === "android" && (
            <TouchableOpacity style={styles.selectedRecType}>
              <View
                style={{
                  padding: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.selectedValueText}>
                  {this.state.recurrence_label}
                </Text>
                <Image
                  source={require("../../assets/images/list-arrow-242424.png")}
                  style={styles.listArrow}
                />
              </View>
            </TouchableOpacity>
          )}
          <Picker
            itemStyle={styles.medRecTitle}
            selectedValue={this.props.recurrence}
            onValueChange={(recurrence, itemIndex) => {
              this.props.set_recurrence(recurrence);
              this.setState({
                recurrence_label: this.state.recurrences.map(item => {
                  return item.value === recurrence && item.label;
                })
              });
            }}
            style={
              Platform.OS === "android"
                ? styles.medDropDownContainerAndroid
                : styles.medDropDownContainer
            }
          >
            {this.state.recurrences.map((recurrence, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={recurrence.label}
                  value={recurrence.value}
                />
              );
            })}
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  medDropDownContainerAndroid: {
    backgroundColor: "transparent",
    color: "transparent",
    width: Metrics.fromTypeDropMenucontainerW,
    height: Metrics.fromTypeDropMenucontainerH,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    borderColor: "grey",
    borderRadius: 5,
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  },
  medDropDownContainer: {
    width: Metrics.fromTypeDropMenucontainerW,
    height: Metrics.fromTypeDropMenucontainerH,
    color: "white",
    marginTop: 10,
    marginBottom: 60,
    justifyContent: "center",
    borderColor: "grey",
    borderRadius: 5,
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  },
  selectedValueText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#242424"
  },
  listArrow: {
    width: 10,
    height: 10
  },
  medRecTitle: {
    paddingBottom: Platform.OS === "ios" ? 60 : 0,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  selectedRecType: {
    width: Metrics.fromTypeDropMenucontainerW,
    height: Metrics.fromTypeDropMenucontainerH,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 5,
    position: "absolute",
    borderColor: "grey",
    borderRadius: 5,
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
    recurrence: state.dataState.data.recurrence
  };
};

export default connect(
  mapStateToProps,
  { set_recurrence }
)(Recurrence);
