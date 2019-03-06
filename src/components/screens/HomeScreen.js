import React from "react";
import DateDiff from "date-diff";
import {
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
  StyleSheet
} from "react-native";

import { Permissions, FileSystem, Notifications } from "expo";

import Metrics from "../../styling/Metrics";

import { connect } from "react-redux";

import { localizedStrings } from "../../common/languages";
import {
  getMedications,
  deleteMedicationById,
  deleteNotificationsByMedicationId,
  getNotificationsByMedicationId,
  deleteNotificationById,
  notificationExistsByMedicationId,
  addNotification
} from "../../common/SQLiteHelper";
import { reset_data } from "../../redux/actions/data";

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    let result = await Permissions.askAsync(
      Permissions.NOTIFICATIONS,
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    getMedications().then(result => {
      this.setState({ data: result });
    });

    this.didFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      payload => {
        getMedications().then(result => {
          this.setState({ data: result });
          this.props.reset_data();
        });
      }
    );

    this.test();
  }

  test() {
    // get all medications
    getMedications().then(result => {
      // loop on each medication
      result.map(medication => {
        var start_date = new Date(medication.start_date);
        var current_date = new Date(Date.now());

        var title = medication.title;
        var body =
          medication.title + ": " + medication.dosage + " " + medication.type;

        var intake_times = medication.intake_times.split(",");
        intake_times = intake_times.map(time => {
          return parseInt(time);
        });

        const localNotification = {
          title,
          body,
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

        // get all notifications of that medication using the id
        if (medication.recurrence === "day") {
          var totalDays = new DateDiff(
            new Date(medication.end_date),
            new Date(medication.start_date)
          ).days();

          var daysLeft = new DateDiff(
            new Date(medication.end_date),
            new Date(
              start_date.getTime() > current_date.getTime()
                ? start_date
                : Date.now()
            )
          ).days();

          for (
            var i = 0;
            i < (daysLeft < 14 ? daysLeft : 14) &&
            current_date.getTime() >
              new Date(start_date.setDate(start_date.getDate() - 1)).getTime();
            i++
          ) {
            intake_times.map(intake_time => {
              var myDate = new Date(intake_time);
              var minutes = myDate.getMinutes();
              var hours = myDate.getHours();

              var date = new Date(
                current_date.getFullYear(),
                current_date.getMonth(),
                current_date.getDate(),
                hours,
                minutes,
                "0",
                "0"
              );

              let t = new Date(date);
              t.setDate(t.getDate() + i);

              var schedulingOptions = {
                time: t.getTime()
              };

              var diff = new DateDiff(t, new Date(medication.date_added));

              notificationExistsByMedicationId(medication.id, t.toString())
                .then(result => {
                  if (result.length === 0) {
                    if (
                      diff.minutes() > 15 &&
                      t.getTime() > current_date.getTime()
                    ) {
                      addNotification({
                        m_id: medication.id,
                        notification_id: "notification_id",
                        date: new Date(schedulingOptions.time).toString(),
                        status: true,
                        title,
                        body
                      });
                    }
                  } else {
                    console.log(result[0]);
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            });
          }
        } else if (medication.recurrence === "week") {
        } else if (medication.recurrence === "month") {
        } else if (medication.recurrence === "year") {
        }
      });
    });
  }

  componentWillUnmount() {
    this.didFocusSubscription.remove();
  }

  deleteNotifications(id) {
    getNotificationsByMedicationId(id).then(result => {
      result.map(notification => {
        if (
          new Date(notification.date).getTime() > new Date(Date.now()).getTime()
        )
          Notifications.cancelScheduledNotificationAsync(
            notification.notification_id
          );

        deleteNotificationById(notification.id);
      });
    });
  }

  renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.homeListItemContainer}>
          <TouchableOpacity
            style={styles.MedImageContainer}
            onPress={() => {
              this.props.navigation.navigate("Edit", { id: item.id });
            }}
          >
            {item.uri ? (
              <Image source={{ uri: item.uri }} style={styles.MedImage} />
            ) : (
              <Image
                source={require("../../assets/images/default-img.png")}
                style={styles.MedImage}
              />
            )}
          </TouchableOpacity>

          <View style={styles.homeListItem}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Edit", { id: item.id });
              }}
            >
              <Text style={styles.itemText}>
                {item && item.title ? item.title : ""}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.deleteButtonContainer}
              onPress={() => {
                Alert.alert(
                  "Delete",
                  "Are you sure do you want to delete " + item.title,
                  [
                    {
                      text: "NO",
                      onPress: () => {}
                    },
                    {
                      text: "YES",
                      onPress: () => {
                        if (item.uri)
                          FileSystem.getInfoAsync(item.uri).then(
                            result =>
                              result.exists && FileSystem.deleteAsync(item.uri)
                          );

                        deleteMedicationById(item.id).then(result => {
                          this.deleteNotifications(item.id);
                          getMedications().then(result => {
                            this.setState({ data: result });
                          });
                        });
                      }
                    }
                  ],
                  { cancelable: true }
                );
              }}
            >
              <Image
                source={require("../../assets/images/delete-icon2.png")}
                style={styles.deleteButtonImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.data.length > 0 ? (
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={styles.emptyFlatListContainer}>
            <View style={styles.emptyTextContainer}>
              <Text style={styles.emptyFlatListText}>
                {localizedStrings[this.props.language].homeEmptyListLabel}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424"
  },

  homeListItemContainer: {
    height: Metrics.homeListItemContainerHeight,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#595d63",
    padding: 5
  },
  homeListItem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },

  itemText: {
    color: "#d6d6d6",
    fontSize: Metrics.flatListItemFontSize,
    fontFamily: "sansRegular"
  },

  MedImageContainer: {
    justifyContent: "center",
    alignContent: "center",
    marginRight: 5
  },
  MedImage: {
    width: Metrics.homeMedImageWH,
    height: Metrics.homeMedImageWH,
    borderRadius: 5
  },

  deleteButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  deleteButtonImage: {
    width: Metrics.homeDeleteButtonWH,
    height: Metrics.homeDeleteButtonWH,
    borderRadius: 5
  },
  emptyFlatListContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },

  emptyTextContainer: {
    padding: 5
  },

  emptyFlatListText: {
    fontFamily: "sansItalic",
    color: "#d6d6d6",
    fontSize: Metrics.EmptyFlatListFontSize,
    textAlign: "center",
    flexWrap: "wrap"
  }
});

const mapStateToProps = state => {
  return {
    language: state.settingsState.language
  };
};

export default connect(
  mapStateToProps,
  {
    reset_data
  }
)(HomeScreen);
