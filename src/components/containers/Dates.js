import React, { Component } from "react";
import {
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image
} from "react-native";

import DateTimePicker from "react-native-modal-datetime-picker";
import Metrics from "../../styling/Metrics";

import { connect } from "react-redux";
import { set_start_date, set_end_date } from "../../redux/actions/data";

import { localizedStrings } from "../../common/languages";

class Dates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      end_date: false,
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
                : localizedStrings[this.props.language].setStartDateLabel}
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
        {!this.state.end_date && (
          <View style={styles.addDateListItemContainer}>
            <View style={styles.addDateListItem}>
              <Text style={styles.addDatesListItemText}>
                {this.props.end_date
                  ? this.renderLabel(this.props.end_date)
                  : localizedStrings[this.props.language].setEndDateLabel}
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
        )}
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

  dateBeforeToday(date) {
    var myDate = new Date(date);
    var today = new Date(Date.now());

    return (
      myDate.getFullYear() < today.getFullYear() ||
      (myDate.getFullYear() === today.getFullYear() &&
        myDate.getMonth() < today.getMonth()) ||
      (myDate.getFullYear() === today.getFullYear() &&
        myDate.getMonth() === today.getMonth() &&
        myDate.getDate() < today.getDate())
    );
  }

  dateAfterDate(dateOne, dateTwo) {
    var one = new Date(dateOne);
    var two = new Date(dateTwo);

    return (
      one.getFullYear() > two.getFullYear() ||
      (one.getFullYear() === two.getFullYear() &&
        one.getMonth() > two.getMonth()) ||
      (one.getFullYear() === two.getFullYear() &&
        one.getMonth() === two.getMonth() &&
        one.getDate() > two.getDate())
    );
  }

  dateBeforeDate(dateOne, dateTwo) {
    var one = new Date(dateOne);
    var two = new Date(dateTwo);

    return (
      one.getFullYear() < two.getFullYear() ||
      (one.getFullYear() === two.getFullYear() &&
        one.getMonth() < two.getMonth()) ||
      (one.getFullYear() === two.getFullYear() &&
        one.getMonth() === two.getMonth() &&
        one.getDate() < two.getDate())
    );
  }

  _showDateDialog = () => this.setState({ date_dialog_visible: true });

  _hideDateDialog = () =>
    this.setState({
      isStartDate: false,
      isEndDate: false,
      date_dialog_visible: false
    });

  _handleDatePicked = date => {
    var errors = [];

    if (this.dateBeforeToday(date)) {
      if (this.state.isStartDate) {
        errors.push(
          localizedStrings[this.props.language].errorStartBeforeTodayLabel
        );
      } else if (this.state.isEndDate) {
        errors.push(
          localizedStrings[this.props.language].errorEndBeforeTodayLabel
        );
      }
    }

    if (this.state.isStartDate) {
      if (this.props.end_date.length > 0) {
        if (this.dateAfterDate(date, this.props.end_date)) {
          errors.push(
            localizedStrings[this.props.language].errorStartAfterEndDateLabel
          );
        }
      }
    }

    if (this.state.isEndDate) {
      if (this.props.start_date.length > 0) {
        if (this.dateBeforeDate(date, this.props.start_date)) {
          errors.push(
            localizedStrings[this.props.language].errorEndBeforeStartDateLabel
          );
        }
      }
    }

    if (errors.length > 0) {
      Alert.alert(
        localizedStrings[this.props.language].errorLabel,
        errors.join("").toString(),
        [
          {
            text: localizedStrings[this.props.language].okLabel,
            onPress: () => {
              this._hideDateDialog();
            }
          }
        ],
        { cancelable: true }
      );
    } else {
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

      this._hideDateDialog();
    }
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
      <View style={styles.container}>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.datesTitle}>
            {localizedStrings[this.props.language].startEndDateLabel}
          </Text>
        </View>
        {this.renderDates()}
        {this.renderDateDialog()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  addDatesListItemText: {
    fontFamily: "sansRegular",
    fontSize: Metrics.flatListItemFontSize,
    color: "#d6d6d6",
    justifyContent: "flex-start"
  },

  addButton: {
    height: Metrics.formSetAddDateButtonHeight,
    width: Metrics.formSetAddDateButtonHeight,
    flexDirection: "column",
    justifyContent: "center"
  },
  addButtonImage: {
    width: Metrics.formSetAddDateButtonImageHeight,
    height: Metrics.formSetAddDateButtonImageHeight,
    borderRadius: 5
  },

  datesTitle: {
    fontSize: Metrics.titleFontSize,
    fontFamily: "sansBold",
    color: "#d6d6d6"
  }
});

const mapStateToProps = state => {
  return {
    start_date: state.dataState.data.start_date,
    end_date: state.dataState.data.end_date,
    language: state.settingsState.language
  };
};

export default connect(
  mapStateToProps,
  {
    set_start_date,
    set_end_date
  }
)(Dates);
