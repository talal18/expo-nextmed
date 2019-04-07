import React from "react";
import {
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";

import { Permissions, FileSystem, Notifications } from "expo";

import Metrics from "../../styling/Metrics";

import { connect } from "react-redux";

import { localizedStrings } from "../../common/languages";

import { reset_data } from "../../redux/actions/data";

import {
  deleteMedication,
  updateMedicationHistory
} from "../../redux/actions/medications";

import { updateNotification } from "../../redux/actions/notifications";

class HistoryScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.homeListItemContainer}>
          <TouchableOpacity
            style={styles.MedImageContainer}
            onPress={() => {
              this.props.navigation.navigate("Edit", { id: item.m_id });
            }}
          >
            {item.uri ? (
              <Image source={{ uri: item.uri }} style={styles.MedImage} />
            ) : (
              <Image
                source={require("../../../assets/default-img.png")}
                style={styles.MedImage}
              />
            )}
          </TouchableOpacity>

          <View style={styles.homeListItem}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Edit", { id: item.m_id });
              }}
            >
              <Text style={styles.itemText}>
                {item && item.title ? item.title : ""}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.deleteButtonContainer}
              onPress={() => {
                Alert.alert(
                  "Delete",
                  "Are you sure do you want to delete " + item.title,
                  [
                    {
                      text: "NO",
                      onPress: () => {}
                    },
                    {
                      text: "YES",
                      onPress: () => {
                        if (item.uri)
                          FileSystem.getInfoAsync(item.uri).then(
                            result =>
                              result.exists && FileSystem.deleteAsync(item.uri)
                          );

                        this.props.deleteMedication(item.m_id);
                      }
                    }
                  ],
                  { cancelable: true }
                );
              }}
            >
              <Image
                source={require("../../../assets/delete-icon.png")}
                style={styles.deleteButtonImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    // console.log(this.props.notifications);
    // console.log(this.props.medications);
    return (
      <View style={styles.container}>
        {this.props.medications.length > 0 ? (
          <FlatList
            data={this.props.medications.filter(item => {
              return item.history === true;
            })}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={styles.emptyFlatListContainer}>
            <View style={styles.emptyTextContainer}>
              <Text style={styles.emptyFlatListText}>
                {localizedStrings[this.props.language].homeEmptyListLabel}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424"
  },

  homeListItemContainer: {
    height: Metrics.homeListItemContainerHeight,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#595d63",
    padding: 5
  },
  homeListItem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },

  itemText: {
    color: "#d6d6d6",
    fontSize: Metrics.flatListItemFontSize,
    fontFamily: "sansRegular"
  },

  MedImageContainer: {
    justifyContent: "center",
    alignContent: "center",
    marginRight: 5
  },
  MedImage: {
    width: Metrics.homeMedImageWH,
    height: Metrics.homeMedImageWH,
    borderRadius: 5
  },

  deleteButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  deleteButtonImage: {
    width: Metrics.homeDeleteButtonWH,
    height: Metrics.homeDeleteButtonWH,
    borderRadius: 5
  },
  emptyFlatListContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },

  emptyTextContainer: {
    padding: 5
  },

  emptyFlatListText: {
    fontFamily: "sansItalic",
    color: "#d6d6d6",
    fontSize: Metrics.EmptyFlatListFontSize,
    textAlign: "center",
    flexWrap: "wrap"
  }
});

const mapStateToProps = state => {
  return {
    language: state.settingsState.language,
    medications: Object.values(state.medState.medications),
    notifications: state.notState.notifications
  };
};

export default connect(
  mapStateToProps,
  {
    reset_data,
    deleteMedication,
    updateMedicationHistory,
    updateNotification
  }
)(HistoryScreen);
