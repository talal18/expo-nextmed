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

  componentWillMount() {}

  renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.homeListItemContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "stretch"
            }}
          >
            <TouchableOpacity
              style={styles.homeListItem}
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

  addData() {
    this.props.navigation.navigate("Add");
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            data={this.props.medications}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />

          <View>
            <TouchableOpacity
              style={styles.addButton}
              position="bottomRight"
              onPress={this.addData.bind(this)}
            >
              <Image
                source={require("../../assets/images/add-floating.png")}
                style={styles.addButtonImage}
              />
            </TouchableOpacity>
          </View>
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
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "flex-start"
  },

  itemText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
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
  }
});

const mapStateToProps = state => {
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
