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

import { Dropdown } from "react-native-material-dropdown";

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
          <Dropdown
            inputContainerStyle={{ borderBottomColor: "transparent" }}
            value={this.props.type}
            rippleOpacity={0}
            dropdownOffset={{
              top: 10,
              left: 0
            }}
            containerStyle={styles.textInputStyle}
            data={this.state.type_picker}
            onChangeText={(type, itemIndex, data) => {
              this.props.set_type(type);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  medTypeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  textInputStyle: {
    justifyContent: "center",
    width: Metrics.formTitleinputBoxW,
    height: Metrics.formTitleinputBoxH,
    paddingLeft: 5,
    backgroundColor: "#fff",
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
    type: state.dataState.data.type
  };
};

export default connect(
  mapStateToProps,
  { set_type }
)(Type);
