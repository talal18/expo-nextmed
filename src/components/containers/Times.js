import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  Alert
} from "react-native";

import DateTimePicker from "react-native-modal-datetime-picker";

import { connect } from "react-redux";

import { add_time, delete_time } from "../../redux/actions/data";

import { localizedStrings } from "../../common/languages";

import Metrics from "../../styling/Metrics";

class Times extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time_dialog_visible: false
    };
  }

  renderTimeText(date) {
    var myDate = new Date(date);
    var minutes = myDate.getMinutes();
    var hours = parseInt(myDate.getHours());

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (hours >= 12) {
      hours -= 12;
      if (hours === 0) {
        hours = 12;
      }
      minutes += " PM";
    } else {
      if (hours === 0) {
        hours = "12";
      }

      minutes += " AM";
    }

    return hours + ":" + minutes;
  }

  renderTime() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this._showTimeDialog.bind(this)}
          style={styles.addTimesButton}
        >
          <Text style={styles.medTimesTitle}>
            {localizedStrings[this.props.language].addTimesLabel}
          </Text>
        </TouchableOpacity>
        {this.props.intake_times.length > 0 && (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.props.intake_times.sort(function(a, b) {
              return a - b;
            })}
            renderItem={({ item }) => (
              <View style={styles.addTimeListItemContainer}>
                <View style={styles.addTimeListItem}>
                  <Text style={styles.addTimesListItemText}>
                    {this.renderTimeText(item)}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      this.props.delete_time(item);
                    }}
                    style={styles.deleteButton}
                  >
                    <Image
                      source={require("../../../assets/delete-icon.png")}
                      style={styles.deleteButtonImage}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    );
  }

  _showTimeDialog = () => this.setState({ time_dialog_visible: true });

  _hideTimeDialog = () => this.setState({ time_dialog_visible: false });

  _handleTimePicked = time => {
    var isSame = false;
    this.props.intake_times.map((item, index) => {
      if (item === time.getTime()) {
        isSame = true;
      }
    });

    if (!isSame) {
      this.props.add_time(time.getTime());
    } else {
      return Alert.alert(
        "Error",
        "You already added this time",
        [
          {
            text: "OK",
            onPress: () => {
              this._hideTimeDialog();
            }
          }
        ],
        { cancelable: false }
      );
    }

    this._hideTimeDialog();
  };

  renderTimeDialog() {
    return (
      <DateTimePicker
        confirmTextStyle={{ color: "#009688" }}
        cancelTextStyle={{ color: "#009688" }}
        style={{ backgroundColor: "green" }}
        is24Hour={false}
        mode={"time"}
        isVisible={this.state.time_dialog_visible}
        onConfirm={this._handleTimePicked}
        onCancel={this._hideTimeDialog}
      />
    );
  }

  render() {
    return (
      <View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={styles.timesTitle}>
            {localizedStrings[this.props.language].timesLabel}
          </Text>
        </View>
        {this.renderTime()}
        {this.renderTimeDialog()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  timesTitle: {
    fontSize: Metrics.titleFontSize,
    fontFamily: "sansBold",
    color: "#d6d6d6"
  },

  medTimesTitle: {
    fontSize: Metrics.titleFontSize,
    fontFamily: "sansBold",
    color: "#d6d6d6"
  },
  addTimesButton: {
    width: Metrics.formAddTimeButtonWidth,
    height: Metrics.formAddTimeButtonHeight,
    paddingLeft: 5,
    paddingRight: 5,
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
  addTimeListItemContainer: {
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
  addTimeListItem: {
    height: Metrics.formAddTimeListHeight,
    width: Metrics.formAddTimeListWidth,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  addTimesListItemText: {
    fontSize: Metrics.flatListItemFontSize,
    fontFamily: "sansRegular",
    color: "#d6d6d6",
    justifyContent: "flex-start"
  },
  deleteButton: {
    height: Metrics.formAddTimeDeleteButtonWH,
    width: Metrics.formAddTimeDeleteButtonWH,
    flexDirection: "column",
    justifyContent: "center"
  },
  deleteButtonImage: {
    width: Metrics.formAddTimeDeleteButtonImageWH,
    height: Metrics.formAddTimeDeleteButtonImageWH,
    borderRadius: 5
  }
});

const mapStateToProps = state => {
  return {
    intake_times: state.dataState.data.intake_times,
    language: state.settingsState.language
  };
};

export default connect(
  mapStateToProps,
  {
    add_time,
    delete_time
  }
)(Times);
