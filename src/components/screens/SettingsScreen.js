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
    Search Funcationality in Manage Notifications
    Medicine Image (Delete Button Styling) in Add / Edit Medicine
    Modal Styling (Padding Top and Bottom) --> Talal
    HomeScreen Empty Text Styling --> Talal

    Fonts --> Talal + Saleh
    settings -> choose language Saleh
    settings -> About Button
    languages support Talal
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
        <Text style={{ color: "#d6d6d6" }}>Settings!</Text>
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
