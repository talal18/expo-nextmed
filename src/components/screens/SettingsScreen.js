import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity
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
      <View style={styles.settingsListItemContainer}>
        <View style={styles.settingsListItem}>
          <TouchableOpacity
            style={styles.settingslanguageItem}
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            {this.props.language === "ar" ? (
              <View style={styles.settingsListItem}>
                <Text
                  style={
                    this.props.language === "ar"
                      ? styles.itemTextArabic
                      : styles.itemText
                  }
                >
                  {localizedStrings[this.props.language].selectedLanguageLabel}
                </Text>
                <Text
                  style={
                    this.props.language === "ar"
                      ? styles.itemTextArabic
                      : styles.itemText
                  }
                >
                  {localizedStrings[this.props.language].languagesLabel}
                </Text>
              </View>
            ) : (
              <View style={styles.settingsListItem}>
                <Text
                  style={
                    this.props.language === "ar"
                      ? styles.itemTextArabic
                      : styles.itemText
                  }
                >
                  {localizedStrings[this.props.language].languagesLabel}
                </Text>
                <Text
                  style={
                    this.props.language === "ar"
                      ? styles.itemTextArabic
                      : styles.itemText
                  }
                >
                  {localizedStrings[this.props.language].selectedLanguageLabel}
                </Text>
              </View>
            )}
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
              <Text style={styles.buttonText}>English</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.buttons}
              onPress={this.set_language.bind(this, "fr")}
            >
              <Text style={styles.buttonText}>French</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.buttons}
              onPress={this.set_language.bind(this, "es")}
            >
              <Text style={styles.buttonText}>Spanish</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.buttons}
              onPress={this.set_language.bind(this, "ar")}
            >
              <Text style={styles.buttonText}>Arabic</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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
    fontFamily: "sansRegular"
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
    Search Funcationality in Manage Notifications --> Saleh  
    
    Modal Styling (Padding Top and Bottom) --> Talal       < Completed >
    delete image button styling --> Talal                  < Completed > 
    Fonts --> Talal + Saleh                                < Completed >
    settings -> choose language Saleh
    settings -> About Button
    languages support Talal         
  */
