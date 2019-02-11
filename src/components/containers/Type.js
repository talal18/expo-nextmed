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

import Metrics from "../../styling/Metrics";

import { connect } from "react-redux";

import { set_type } from "../../redux/actions/data";

class Type extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type_picker: [
        {
          label: localizedStrings[this.props.language].typeLabels.capsulesLabel,
          value: "capsules",
          image: require("../../assets/images/capsulesT.png")
        },
        {
          label: localizedStrings[this.props.language].typeLabels.dropsLabel,
          value: "drops",
          image: require("../../assets/images/dropsT.png")
        },
        {
          label:
            localizedStrings[this.props.language].typeLabels.injectionsLabel,
          value: "injection",
          image: require("../../assets/images/injectionsT.png")
        },
        {
          label: localizedStrings[this.props.language].typeLabels.liquidLabel,
          value: "liquid",
          image: require("../../assets/images/liquidT.png")
        },
        {
          label: localizedStrings[this.props.language].typeLabels.ointmentLabel,
          value: "ointment",
          image: require("../../assets/images/ointmentT.png")
        },
        {
          label: localizedStrings[this.props.language].typeLabels.pillsLabel,
          value: "pills",
          image: require("../../assets/images/pillsT.png")
        },
        {
          label: localizedStrings[this.props.language].typeLabels.powderLabel,
          value: "powder",
          image: require("../../assets/images/powderT.png")
        },
        {
          label: localizedStrings[this.props.language].typeLabels.sprayLabel,
          value: "spray",
          image: require("../../assets/images/sprayT.png")
        },
        {
          label:
            localizedStrings[this.props.language].typeLabels.suppositoriesLabel,
          value: "suppositories",
          image: require("../../assets/images/suppositoriesT.png")
        },
        {
          label: localizedStrings[this.props.language].typeLabels.trochesLabel,
          value: "troches",
          image: require("../../assets/images/trochesT.png")
        }
      ]
    };
  }

  componentDidMount() {
    // this.props.set_type("capsules");
  }

  render() {
    return (
      <View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.medTypeTitle}>
            {localizedStrings[this.props.language].typeTitleLabel}
          </Text>
        </View>
        <View style={styles.imagesContainer}>
          <ScrollView horizontal={true} style={styles.scrollViewStyle}>
            {this.state.type_picker.map((item, index) => {
              return (
                <View key={index} style={styles.imageTextViewContainer}>
                  <View
                    style={{
                      paddingTop: Metrics.typeImagesPaddingH,
                      paddingBottom: Metrics.typeImagesPaddingH,
                      paddingLeft: Metrics.typeImagesPaddingW,
                      paddingRight: Metrics.typeImagesPaddingW,
                      borderRadius: 300,
                      borderWidth: 5,
                      borderColor: "#d6d6d6",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor:
                        this.props.type !== undefined &&
                        this.props.type.length > 0 &&
                        this.props.type === item.value
                          ? "#009688"
                          : "#595d63"
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.props.set_type(item.value)}
                    >
                      <Image source={item.image} style={styles.typeImage} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.imageText}>{item.label}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  medTypeTitle: {
    fontSize: Metrics.titleFontSize,
    fontFamily: "sansBold",
    color: "#d6d6d6"
  },
  textInputStyle: {
    justifyContent: "center",
    width: Metrics.formTitleinputBoxW,
    height: Metrics.formTitleinputBoxH,
    paddingLeft: 5,
    backgroundColor: "#d6d6d6",
    borderColor: "grey",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  },

  scrollViewStyle: {},

  imagesContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  imageTextViewContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    width: Metrics.imageTextViewContainerW
  },

  typeImage: {
    width: 70,
    height: 70
  },
  textContainer: {
    flex: 1,
    flexDirection: "row"
  },
  imageText: {
    fontSize: Metrics.EmptyFlatListFontSize,
    fontFamily: "sansRegular",
    color: "#d6d6d6",
    marginTop: 5,
    flexWrap: "wrap",
    textAlign: "center"
  }
});

const mapStateToProps = state => {
  return {
    type: state.dataState.data.type,
    language: state.settingsState.language
  };
};

export default connect(
  mapStateToProps,
  { set_type }
)(Type);
