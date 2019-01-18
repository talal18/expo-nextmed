import React, { Component } from "react";
import { StyleSheet, Button, Image, View } from "react-native";
import { ImagePicker } from "expo";

import Metrics from "../../styling/Metrics";

import { connect } from "react-redux";

class MedImage extends Component {
  state = {
    image: null
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {}
)(MedImage);
