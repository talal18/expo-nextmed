import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Switch,
  FlatList,
  TextInput
} from "react-native";

import { connect } from "react-redux";

import { updateNotification } from "../../redux/actions/notifications";

import Metrics from "../../styling/Metrics";
import { localizedStrings } from "../../common/languages";

import { Notifications } from "expo";

import { Calendar } from "react-native-calendars";

class ManageNotifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: Date,
      selected: ""
    };
  }

  renderCustomDate = date => {
    var myDate = new Date(date);

    var day = myDate.getDate();
    var dayInWeek = myDate.getDay();
    var monthInYear = myDate.getMonth() + 1;
    var month = myDate.getMonth() + 1;
    var year = myDate.getFullYear();

    if (day < 10) {
      day = "0" + day;
    }

    if (month < 10) {
      month = "0" + month;
    }

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

    var dayName = "";
    var monthName = "";

    switch (dayInWeek) {
      case 0:
        dayName = "Sun";
        break;
      case 1:
        dayName = "Mon";
        break;
      case 2:
        dayName = "Tue";
        break;
      case 3:
        dayName = "Wed";
        break;
      case 4:
        dayName = "Thu";
        break;
      case 5:
        dayName = "Fri";
        break;
      case 6:
        dayName = "Sat";
        break;
    }

    switch (monthInYear) {
      case 1:
        monthName = "Jan";
        break;
      case 2:
        monthName = "Feb";
        break;
      case 3:
        monthName = "Mar";
        break;
      case 4:
        monthName = "Apr";
        break;
      case 5:
        monthName = "May";
        break;
      case 6:
        monthName = "Jun";
        break;
      case 7:
        monthName = "Jul";
        break;
      case 8:
        monthName = "Aug";
        break;
      case 9:
        monthName = "Sep";
        break;
      case 10:
        monthName = "Oct";
        break;
      case 11:
        monthName = "Nov";
        break;
      case 12:
        monthName = "Dec";
        break;
    }

    return {
      date,
      customText:
        dayName +
        " " +
        monthName +
        " " +
        day +
        " " +
        year +
        " " +
        hours +
        ":" +
        minutes
    };
  };

  componentDidMount() {}

  renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.manageListItemContainer}>
          <View style={styles.ListItem}>
            <Text style={styles.itemText}>
              {item && item.date
                ? this.renderCustomDate(item.date).customText
                : ""}
            </Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch
              style={styles.switch}
              disabled={
                new Date(item.date).getTime() < new Date(Date.now()).getTime()
              }
              value={item.status}
              onValueChange={status => {
                if (status === false) {
                  if (item.notification_id !== null)
                    Notifications.cancelScheduledNotificationAsync(
                      item.notification_id
                    );

                  this.props.updateNotification(
                    item.id,
                    item.m_id,
                    item.notification_id,
                    status
                  );
                } else {
                  const localNotification = {
                    title: item.title,
                    body: item.body,
                    ios: {
                      sound: true
                    },
                    android: {
                      channelId: "nextmedNotifications",
                      sound: true,
                      priority: "high",
                      sticky: false,
                      vibrate: true
                    }
                  };

                  var schedulingOptions = {
                    time: new Date(item.date).getTime()
                  };

                  Notifications.scheduleLocalNotificationAsync(
                    localNotification,
                    schedulingOptions
                  ).then(notification_id => {
                    this.props.updateNotification(
                      item.id,
                      item.m_id,
                      notification_id,
                      status
                    );
                  });
                }
              }}
              thumbColor="#D4D4D4"
            />
          </View>
        </View>
      </View>
    );
  };

  searchFilterFunction(text) {
    const newData = this.arrayholder.filter(item => {
      const itemData = item.date.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({ notifications: newData });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <Calendar
            style={{
              borderWidth: 1,
              borderColor: "gray"
            }}
            theme={{
              calendarBackground: "#242424",
              textSectionTitleColor: "#d6d6d6",
              selectedDayBackgroundColor: "#009688",
              selectedDayTextColor: "#d6d6d6",
              todayTextColor: "#fff",
              dayTextColor: "#d6d6d6",
              textDisabledColor: "#595d63",
              dotColor: "white",
              selectedDotColor: "#ffffff",
              arrowColor: "#009688",
              monthTextColor: "#d6d6d6",
              textMonthFontWeight: "bold",
              textDayFontSize: Metrics.CalenderDayFontSize,
              textMonthFontSize: 15,
              textDayHeaderFontSize: 14
            }}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={new Date(this.props.data.start_date)}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={new Date(this.props.data.end_date)}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              var selectedDate = new Date(day.dateString);

              this.setState({
                selectedDate,
                selected: day.dateString
              });
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day => {
              console.log("selected day", day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={"MMMM yyyy"}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
              console.log("month changed", month);
            }}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            markedDates={{
              [this.state.selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: "orange"
              }
            }}
          />
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={Object.values(
              this.props.notifications[this.props.navigation.state.params.id]
            )
              .filter(notification => {
                var date = new Date(notification.date);
                var selectedDate = new Date(this.state.selectedDate);
                return (
                  date.getDate() === selectedDate.getDate() + 1 &&
                  date.getMonth() === selectedDate.getMonth() &&
                  date.getFullYear() === selectedDate.getFullYear()
                );
              })
              .sort(function(a, b) {
                return new Date(a.date) - new Date(b.date);
              })}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424"
  },
  calendarContainer: {
    paddingTop: 10
  },
  listContainer: {
    flex: 1,
    marginTop: 10
  },
  manageListItemContainer: {
    height: Metrics.homeListItemContainerHeight,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#595d63",
    padding: 5
  },

  ListItem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },

  itemText: {
    color: "#d6d6d6",
    fontSize: Metrics.flatListItemFontSize,
    fontFamily: "sansRegular"
  },

  switchContainer: {
    justifyContent: "flex-end",
    alignContent: "center"
  },
  switch: {
    width: 50,
    height: 50,
    borderRadius: 5
  },

  searchInput: {
    height: Metrics.searchInputBoxH,
    paddingLeft: 5,
    backgroundColor: "#fff",
    borderColor: "grey",
    borderRadius: 5,
    fontSize: Metrics.searchInputFontSize,
    fontFamily: "sansItalic",
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  }
});

const mapStateToProps = state => {
  return {
    language: state.settingsState.language,
    data: state.dataState.data,
    notifications: state.notState.notifications
  };
};

export default connect(
  mapStateToProps,
  {
    updateNotification
  }
)(ManageNotifications);
