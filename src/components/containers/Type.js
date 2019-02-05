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

import { localizedStrings } from "../../common/languages";

import { Dropdown } from "react-native-material-dropdown";

import Metrics from "../../styling/Metrics";

import { connect } from "react-redux";

import { set_type } from "../../redux/actions/data";

class Type extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type_picker: [
        { label: "Capsules", value: "capsules" },
        { label: localizedStrings["en"].typeLabels.dropsLabel, value: "drops" },
        { label: "Injection", value: "injection" },
        { label: "Liquid", value: "liquid" },
        { label: "Ointment (Cream, Gel,...)", value: "ointment" },
        { label: "Pills", value: "pills" },
        { label: "Powder", value: "powder" },
        { label: "Spray", value: "spray" },
        { label: "Suppositories", value: "suppositories" },
        { label: "Troches", value: "troches" }
      ],
      type_label: "Capsules"
    };
  }

  componentDidMount() {
    this.props.set_type("capsules");
  }

  render() {
    return (
      <View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.medTypeTitle}>Type</Text>
        </View>
        <View>
          <Dropdown
            allowFontScaling={false}
            fontSize={Metrics.dropDownFontSize}
            fontWeight="bold"
            itemTextStyle={{
              fontSize: Metrics.dropDownFontSize,
              fontWeight: "bold"
            }}
            inputContainerStyle={{ borderBottomColor: "transparent" }}
            value={this.props.type}
            rippleOpacity={0}
            dropdownOffset={{
              top: 10,
              left: 20
            }}
            itemPadding={20}
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
    fontSize: Metrics.titleFontSize,
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
