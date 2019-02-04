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
          style={styles.imageAddButton}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.imageAddButtonText}>Add Image</Text>
        </TouchableHighlight>
        {this.props.uri.length > 0 && (
          <Image
            source={{ uri: this.props.uri }}
            style={{ width: 200, height: 200 }}
          />
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <TouchableHighlight
              style={styles.buttons}
              onPress={this._pickImageLibrary}
            >
              <Text style={styles.buttonText}>
                Pick an image from camera roll
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.buttons}
              onPress={this._pickImageLibrary}
            >
              <Text style={styles.buttonText}>Pick an image from library</Text>
            </TouchableHighlight>
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

const styles = StyleSheet.create({
  modalContainer: {
    marginTop: Metrics.modalMarginVertical,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#d6d6d6"
  },

  imageAddButton: {
    width: Metrics.formAddImageButtonWidth,
    height: Metrics.formAddImageButtonHeight,
    backgroundColor: "#009688",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    borderColor: "grey",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  },

  imageAddButtonText: {
    fontSize: Metrics.titleFontSize,
    fontWeight: "bold",
    color: "#fff"
  },

  buttons: {
    width: Metrics.modalButtonWidth,
    height: Metrics.modalButtonHeight,
    backgroundColor: "#009688",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    borderColor: "grey",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  },
  buttonText: {
    fontSize: Metrics.ModalButtonsFontSize,
    color: "#d6d6d6"
  }
});

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
