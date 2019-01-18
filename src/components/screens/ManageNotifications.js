import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";

import { connect } from "react-redux";
import Metrics from "../../styling/Metrics";

import { get_notifications } from "../../redux/actions/notifications";

class ManageNotifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }

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
            <Text style={styles.itemText}>
              {item && item.date ? item.date : ""}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  componentDidMount() {
    this.props.notifications.map(item => {
      if (item.m_id === this.props.navigation.state.params.id) {
        this.setState({
          data: item
        });
      }
    });
  }

  render() {
    console.log(this.state.data);
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            data={this.state.data.notifications}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
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
    notifications: state.notificationsState.data
  };
};

export default connect(
  mapStateToProps,
  {
    get_notifications
  }
)(ManageNotifications);
