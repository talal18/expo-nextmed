import React, { Component } from "react";
import {
  Alert,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  Image
} from "react-native";

import DateTimePicker from "react-native-modal-datetime-picker";
import Metrics from "../../styling/Metrics";

import { connect } from "react-redux";
import { set_start_date, set_end_date } from "../../redux/actions/data";

class Dates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date_label: "",
      end_date_label: "",
      isStartDate: false,
      isEndDate: false,
      date_dialog_visible: false
    };
  }

  renderLabel(date) {
    var myDate = new Date(date);

    var day = myDate.getDate();
    var month = myDate.getMonth() + 1;
    var year = myDate.getFullYear();

    if (day < 10) {
      day = "0" + day;
    }

    if (month < 10) {
      month = "0" + month;
    }

    var pickedDate = day + "/" + month + "/" + year;

    return pickedDate;
  }

  renderDates() {
    return (
      <View style={{ paddingTop: 10 }}>
        <View style={styles.addDateListItemContainer}>
          <View style={styles.addDateListItem}>
            <Text style={styles.addDatesListItemText}>
              {this.props.start_date
                ? this.renderLabel(this.props.start_date)
                : "Set a start date"}
            </Text>

            <TouchableOpacity
              onPress={this.handleSetStartDate.bind(this)}
              style={styles.addButton}
            >
              {this.props.start_date ? (
                <Image
                  source={require("../../assets/images/edit-button.png")}
                  style={styles.addButtonImage}
                />
              ) : (
                <Image
                  source={require("../../assets/images/add-button.png")}
                  style={styles.addButtonImage}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.addDateListItemContainer}>
          <View style={styles.addDateListItem}>
            <Text style={styles.addDatesListItemText}>
              {this.props.end_date
                ? this.renderLabel(this.props.end_date)
                : "Set an end date"}
            </Text>

            <TouchableOpacity
              onPress={this.handleSetEndDate.bind(this)}
              style={styles.addButton}
            >
              {this.props.end_date ? (
                <Image
                  source={require("../../assets/images/edit-button.png")}
                  style={styles.addButtonImage}
                />
              ) : (
                <Image
                  source={require("../../assets/images/add-button.png")}
                  style={styles.addButtonImage}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  renderDateDialog() {
    return (
      <DateTimePicker
        datePickerModeAndroid={"spinner"}
        mode={"date"}
        isVisible={this.state.date_dialog_visible}
        onConfirm={this._handleDatePicked}
        onCancel={this._hideDateDialog}
      />
    );
  }

  _showDateDialog = () => this.setState({ date_dialog_visible: true });

  _hideDateDialog = () => this.setState({ date_dialog_visible: false });

  _handleDatePicked = date => {
    var myDate = new Date(date);
    var today = new Date(Date.now());

    if (this.state.isEndDate && this.props.start_date) {
      if (myDate.getTime() < new Date(this.props.start_date).getTime()) {
        if (Platform.OS === "ios")
          return Alert.alert(
            "Error",
            "End Date can't be before Start Date",
            [
              {
                text: "OK",
                onPress: () => {
                  this.props.set_end_date("");
                }
              }
            ],
            { cancelable: false }
          );

        Alert.alert(
          "Error",
          "End Date can't be before Start Date",
          [
            {
              text: "OK",
              onPress: () => {
                this.props.set_end_date("");
              }
            }
          ],
          { cancelable: false }
        );
      }
    }

    if (this.state.isStartDate && this.props.end_date) {
      if (myDate.getTime() > new Date(this.props.end_date).getTime()) {
        if (Platform.OS === "ios")
          return Alert.alert(
            "Error",
            "Start Date can't be after End Date",
            [
              {
                text: "OK",
                onPress: () => {
                  this.props.set_start_date("");
                }
              }
            ],
            { cancelable: false }
          );

        Alert.alert(
          "Error",
          "Start Date can't be after End Date",
          [
            {
              text: "OK",
              onPress: () => {
                this.props.set_start_date("");
              }
            }
          ],
          { cancelable: false }
        );
      }
    }

    if (myDate.getDate() < today.getDate()) {
      if (Platform.OS === "ios")
        return Alert.alert(
          "Error",
          "Date can't be before today's date",
          [
            {
              text: "OK",
              onPress: () => {}
            }
          ],
          { cancelable: false }
        );
      Alert.alert(
        "Error",
        "Date can't be before today's date",
        [
          {
            text: "OK",
            onPress: () => {}
          }
        ],
        { cancelable: false }
      );
    } else {
      var day = myDate.getDate();
      var month = myDate.getMonth() + 1;
      var year = myDate.getFullYear();

      if (day < 10) {
        day = "0" + day;
      }

      if (month < 10) {
        month = "0" + month;
      }

      var pickedDate = day + "/" + month + "/" + year;

      if (this.state.isStartDate) {
        this.props.set_start_date(date.toString());
        this.setState({
          isStartDate: false,
          start_date_label: pickedDate
        });
      }

      if (this.state.isEndDate) {
        this.props.set_end_date(date.toString());
        this.setState({
          isEndDate: false,
          end_date_label: pickedDate
        });
      }
    }

    this._hideDateDialog();
  };

  handleSetStartDate() {
    this.setState({ isStartDate: true });
    this._showDateDialog();
  }

  handleSetEndDate() {
    this.setState({ isEndDate: true });
    this._showDateDialog();
  }

  render() {
    return (
      <View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.datesTitle}>Start & End Date</Text>
        </View>
        {this.renderDates()}
        {this.renderDateDialog()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addDateListItemContainer: {
    height: Metrics.formAddTimeListContainerHeight,
    width: Metrics.formAddTimeListContainerWidth,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#595d63",
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderWidth: 1
  },
  addDateListItem: {
    height: Metrics.formAddTimeListHeight,
    width: Metrics.formAddTimeListWidth,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  addDatesListItemText: {
    fontSize: 20,
    color: "#fff",
    justifyContent: "flex-start"
  },
  addButton: {
    height: 30,
    width: 30,
    flexDirection: "column",
    justifyContent: "center"
  },
  addButtonImage: {
    width: 40,
    height: 40,
    borderRadius: 5
  },
  datesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  }
});

const mapStateToProps = state => {
  return {
    start_date: state.dataState.data.start_date,
    end_date: state.dataState.data.end_date
  };
};

export default connect(
  mapStateToProps,
  {
    set_start_date,
    set_end_date
  }
)(Dates);
