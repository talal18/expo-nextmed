import React from "react";
import { Text, View } from "react-native";

import { connect } from "react-redux";

class ManageNotifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      online: true
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#242424"
        }}
      >
        <Text style={{ color: "#fff" }}>
          List of Notifications (Use FlatList)!
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {}
)(ManageNotifications);
