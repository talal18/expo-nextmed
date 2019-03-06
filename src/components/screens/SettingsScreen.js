import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert
} from "react-native";

import { connect } from "react-redux";
import Metrics from "../../styling/Metrics";

import { localizedStrings } from "../../common/languages";

import { set_language } from "../../redux/actions/settings";

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      items: []
    };
  }

  componentDidMount() {}

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  renderItems() {
    return (
      <View>
        <View style={styles.settingsListItemContainer}>
          <TouchableOpacity
            style={styles.settingslanguageItem}
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <View
              style={
                this.props.language === "ar"
                  ? styles.settingsListItemArabic
                  : styles.settingsListItem
              }
            >
              <Text style={styles.itemText}>
                {localizedStrings[this.props.language].languagesLabel}
              </Text>
              <Text style={styles.selectedItemText}>
                {localizedStrings[this.props.language].selectedLanguageLabel}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.settingsListItemContainer}>
          <TouchableOpacity
            style={styles.settingslanguageItem}
            onPress={() => this.props.navigation.navigate("Backup")}
          >
            <View
              style={
                this.props.language === "ar"
                  ? styles.settingsListItemArabic
                  : styles.settingsListItem
              }
            >
              <Text style={styles.itemText}>
                {localizedStrings[this.props.language].backupLabel}
              </Text>
            </View>
          </TouchableOpacity>
        </View> */}

        <View style={styles.settingsListItemContainer}>
          <TouchableOpacity
            style={styles.settingslanguageItem}
            onPress={() => {
              var aboutText =
                "Developers:\n" +
                "Saleh Yassin (yass0016@gmail.com)\n" +
                "Talal Qasem (talal_kasem@hotmail.com)";
              Alert.alert("TASA Development", aboutText);
            }}
          >
            <View
              style={
                this.props.language === "ar"
                  ? styles.settingsListItemArabic
                  : styles.settingsListItem
              }
            >
              <Text style={styles.itemText}>
                {localizedStrings[this.props.language].aboutUsLabel}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  set_language(language) {
    this.props.set_language(language);

    this.setState({
      modalVisible: false
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderItems()}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <TouchableHighlight
              style={styles.buttons}
              onPress={this.set_language.bind(this, "en")}
            >
              <Text style={styles.buttonText}>
                {localizedStrings[this.props.language].languageEnglishLabel}
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.buttons}
              onPress={this.set_language.bind(this, "fr")}
            >
              <Text style={styles.buttonText}>
                {localizedStrings[this.props.language].languageFrenchLabel}
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.buttons}
              onPress={this.set_language.bind(this, "es")}
            >
              <Text style={styles.buttonText}>
                {localizedStrings[this.props.language].languageSpanishLabel}
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.buttons}
              onPress={this.set_language.bind(this, "ar")}
            >
              <Text style={styles.buttonText}>
                {localizedStrings[this.props.language].languageArabicLabel}
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    justifyContent: "flex-start"
  },

  settingsListItemContainer: {
    height: Metrics.homeListItemContainerHeight,
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#595d63",
    padding: 5
  },
  settingsListItem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  settingsListItemArabic: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  settingslanguageItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  itemText: {
    color: "#d6d6d6",
    fontSize: Metrics.flatListItemFontSize,
    fontFamily: "sansRegular",
    marginBottom: 5
  },

  selectedItemText: {
    color: "#d6d6d6",
    fontSize: Metrics.flatListSelectedItemFontSize,
    fontFamily: "sansRegular"
  },
  selectedItemTextArabic: {
    color: "#d6d6d6",
    fontSize: Metrics.flatListSelectedItemFontSize,
    fontFamily: "sansRegular",
    textAlign: "right"
  },
  itemTextArabic: {
    color: "#d6d6d6",
    fontSize: Metrics.flatListItemFontSize,
    fontFamily: "sansRegular",
    textAlign: "right"
  },
  modalContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d6d6d6"
  },
  buttons: {
    width: Metrics.modalButtonWidth,
    height: Metrics.modalButtonHeight,
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
  buttonText: {
    fontSize: Metrics.ModalButtonsFontSize,
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
  {
    set_language
  }
)(SettingsScreen);

/*

 * About Us Text - Talal, Saleh
 * Review Languages, French and Spanish (In Progress)
 ** Next Phase: Archive Medicines (Old Medicines)
 ** Next Notification Display on HomeScreen
 ** Show near hospitals, clincs, pharmacies with phone numbers
 * 
 */
