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
import Metrics from "../../styling/Metrics";

import { get_notifications } from "../../redux/actions/notifications";

class ManageNotifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };

    this.arrayholder = [];
  }

  renderCustomDate(date) {
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
  }

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
            <Switch style={styles.switch} />
          </View>
        </View>
      </View>
    );
  };

  componentDidMount() {
    this.props.notifications.map(item => {
      if (item.m_id === this.props.navigation.state.params.id) {
        this.setState({
          data: item
        });

        this.arrayholder = item.notifications.map(data => {
          return this.renderCustomDate(data.date);
        });
      }
    });
  }

  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      console.log(item);
      const itemData = item.customText.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: { ...this.state.data, notifications: newData }
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
          />
        </View>
        <View style={styles.container}>
          {this.state.data !== undefined && this.state.data.notifications && (
            <FlatList
              data={this.state.data.notifications.sort(function(a, b) {
                return new Date(a.date).getDate() - new Date(b.date).getDate();
              })}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
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
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
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

  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#009688",
    position: "absolute",
    bottom: 10,
    right: 10,
    alignItems: "center",
    justifyContent: "center"
  },

  addButtonImage: {
    width: 60,
    height: 60
  },
  searchInput: {
    height: Metrics.searchInputBoxH,
    paddingLeft: 5,
    backgroundColor: "#fff",
    borderColor: "grey",
    borderRadius: 5,
    fontSize: 20,
    fontWeight: "bold",
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35
  }
});

const mapStateToProps = state => {
  return {
    notifications: state.notificationsState.data
  };
};

export default connect(
  mapStateToProps,
  {
    get_notifications
  }
)(ManageNotifications);
