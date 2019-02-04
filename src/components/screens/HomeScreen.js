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

import { Permissions } from "expo";

import Metrics from "../../styling/Metrics";

import { connect } from "react-redux";

import { deleteMedication } from "../../redux/actions/medications";

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    let result = await Permissions.askAsync(
      Permissions.NOTIFICATIONS,
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
  }

  componentWillMount() {}

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
                source={require("../../assets/images/default-img.png")}
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
                        this.props.deleteMedication(item);
                      }
                    }
                  ],
                  { cancelable: true }
                );
              }}
            >
              <Image
                source={require("../../assets/images/delete-icon2.png")}
                style={styles.deleteButtonImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {this.props.medications.length > 0 ? (
            <FlatList
              data={this.props.medications}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text style={styles.emptyFlatListText}>
              You have not scheduled any medicine. Use the add button to
              schedule a new medicine
            </Text>
          )}
        </View>
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
    color: "#fff",
    fontSize: Metrics.flatListItemFontSize,
    fontFamily: "champBold"
  },

  MedImageContainer: {
    justifyContent: "center",
    alignContent: "center",
    marginRight: 5
  },
  MedImage: {
    width: 50,
    height: 50,
    borderRadius: 5
  },

  deleteButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  deleteButtonImage: {
    width: 50,
    height: 50,
    borderRadius: 5
  },

  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#009688",
    position: "absolute",
    bottom: 10,
    right: 10,
    alignItems: "center",
    justifyContent: "center"
  },

  addButtonImage: {
    width: 60,
    height: 60
  },
  emptyFlatListText: {}
});

const mapStateToProps = state => {
  console.log(state);
  return {
    medications: state.medState.medications
  };
};

export default connect(
  mapStateToProps,
  {
    deleteMedication
  }
)(HomeScreen);
