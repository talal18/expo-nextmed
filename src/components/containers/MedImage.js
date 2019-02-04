import React, { Component } from "react";
import {
  Modal,
  StyleSheet,
  Button,
  Image,
  View,
  TouchableHighlight,
  Text
} from "react-native";
import { ImagePicker, MediaLibrary } from "expo";

import Metrics from "../../styling/Metrics";

import { connect } from "react-redux";

import { set_image_uri } from "../../redux/actions/data";

class MedImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Show Modal</Text>
        </TouchableHighlight>
        {this.props.uri.length > 0 && (
          <Image
            source={{ uri: this.props.uri }}
            style={{ width: 200, height: 200 }}
          />
        )}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <View>
            <Button
              title="Pick an image from camera roll"
              onPress={this._pickImageCamera}
            />
            <Button
              title="Pick an image from library"
              onPress={this._pickImageLibrary}
            />
          </View>
        </Modal>
      </View>
    );
  }

  _pickImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 4]
    });

    this.setModalVisible(false);

    this.props.set_image_uri(result.uri);
  };

  _pickImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4]
    });

    this.setModalVisible(false);

    this.props.set_image_uri(result.uri);
  };
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    uri: state.dataState.data.uri
  };
};

export default connect(
  mapStateToProps,
  {
    set_image_uri
  }
)(MedImage);
