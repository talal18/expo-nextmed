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
    Search Funcationality in Manage Notifications --> Saleh  
    
    Modal Styling (Padding Top and Bottom) --> Talal       < Completed >
    delete image button styling --> Talal                  < Completed > 
    Fonts --> Talal + Saleh                                < Completed >
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
