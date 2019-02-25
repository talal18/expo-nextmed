import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
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

  render() {
    return (
      <View style={styles.container}>
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
                      padding: Metrics.typeImagesPaddingH,
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  medTypeTitle: {
    fontSize: Metrics.titleFontSize,
    fontFamily: "sansBold",
    color: "#d6d6d6"
  },

  scrollViewStyle: {},

  imagesContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  imageTextViewContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
    width: Metrics.imageTextViewContainerW
  },

  typeImage: {
    width: Metrics.typeImageWH,
    height: Metrics.typeImageWH
  },
  textContainer: {
    flexDirection: "row"
  },
  imageText: {
    fontSize: Metrics.TypeFontSize,
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
