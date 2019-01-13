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

import { set_type } from "../../redux/actions/data";

class Type extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type_picker: [
        { label: "Drops", value: "drops" },
        { label: "Injection", value: "injection" },
        { label: "Liquid", value: "liquid" },
        { label: "Ointment (Cream, Gel,...)", value: "ointment" },
        { label: "Pills", value: "pills" },
        { label: "Powder", value: "powder" },
        { label: "Spray", value: "spray" },
        { label: "Suppositories", value: "suppositories" },
        { label: "Troches", value: "troches" }
      ],
      type_label: "Drops"
    };
  }

  componentDidMount() {
    this.props.set_type("drops");
  }

  render() {
    return (
      <View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.medTypeTitle}>Medicine type</Text>
        </View>
        <View>
          {Platform.OS === "android" && (
            <TouchableOpacity style={styles.selectedMedType}>
              <View
                style={{
                  padding: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.selectedValueText}>
                  {this.state.type_label}
                </Text>
                <Image
                  source={require("../../assets/images/list-arrow-242424.png")}
                  style={styles.listArrow}
                />
              </View>
            </TouchableOpacity>
          )}
          <Picker
            itemStyle={styles.medTypeTitle}
            selectedValue={this.props.type}
            onValueChange={(type, itemIndex) => {
              this.props.set_type(type);
              this.setState({
                type_label: this.state.type_picker.map(item => {
                  return item.value === type && item.label;
                })
              });
            }}
            style={
              Platform.OS === "android"
                ? styles.medDropDownContainerAndroid
                : styles.medDropDownContainer
            }
          >
            {this.state.type_picker.map((type, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={type.label}
                  value={type.value}
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
  medTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  medTypeTitle: {
    paddingBottom: Platform.OS === "ios" ? 60 : 0,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
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
  selectedMedType: {
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
  },

  listArrow: {
    width: 10,
    height: 10
  },

  medTypeListContainer: {
    margin: 20,
    backgroundColor: "#efefef",
    bottom: 20,
    left: 20,
    right: 20,
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 5,
    borderColor: "grey"
  },

  medTypeListTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "black",
    marginBottom: 5,
    marginTop: 5
  },
  medTypeList: {
    fontSize: 18,
    fontWeight: "300",
    color: "black",
    margin: 5
  }
});

const mapStateToProps = state => {
  return {
    type: state.dataState.data.type
  };
};

export default connect(
  mapStateToProps,
  { set_type }
)(Type);
