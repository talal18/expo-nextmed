import React from "react";
import { Text, View } from "react-native";

import { connect } from "react-redux";

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      online: true
    };
  }

  componentDidMount() {}

  /*
    Add no items to flat list in home page
    add / edit forms need to pull up when keyboard shows
    image url
    image buttons (camera/storage)
  */

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
        <Text style={{ color: "#fff" }}>Settings!</Text>
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
)(SettingsScreen);
