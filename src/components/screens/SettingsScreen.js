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
    Medicine Image Styling
    Modal Styling --> Talal
    HomeScreen Add Button Styling --> Talal
    HomeScreen Empty Text Styling --> Talal
    Fonts --> Talal + Saleh
    add / edit forms need to pull up when keyboard shows --> Saleh + Talal
    Updating the Medicine times (Functionality) Saleh
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
