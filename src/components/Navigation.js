import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { connect } from "react-redux";

import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";

import Metrics from "../styling/Metrics";

import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";

import AddScreen from "./screens/AddScreen";
import EditScreen from "./screens/EditScreen";

import ManageNotifications from "./screens/ManageNotifications";
import { localizedStrings } from "../common/languages";
import HistoryScreen from "./screens/HistoryScreen";

const AppNavigator = createStackNavigator({
  Tabs: {
    screen: createBottomTabNavigator(
      {
        Home: createStackNavigator({
          Home: {
            screen: HomeScreen,
            navigationOptions: ({ navigation, screenProps }) => ({
              headerTitle: localizedStrings[screenProps.language].homeTitle,
              headerStyle: {
                backgroundColor: "#595d63"
              },
              headerTintColor: "#d6d6d6",
              headerTitleStyle: {
                fontSize: Metrics.navigationTitleFontSize,
                fontFamily: "sansBold"
              },
              headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate("Add")}>
                  <Image
                    style={{
                      width: Metrics.homeAddButtonWidth,
                      height: Metrics.homeAddButtonHeight,
                      marginRight: Metrics.homeAddButtonMarginRight
                    }}
                    source={require("../../assets/add-navbar.png")}
                  />
                </TouchableOpacity>
              )
            })
          }
        }),
        History: createStackNavigator({
          History: {
            screen: HistoryScreen,
            navigationOptions: ({ navigation, screenProps }) => ({
              headerTitle: localizedStrings[screenProps.language].historyTitle,
              headerStyle: {
                backgroundColor: "#595d63"
              },
              headerTintColor: "#d6d6d6",
              headerTitleStyle: {
                fontSize: Metrics.navigationTitleFontSize,
                fontFamily: "sansBold"
              }
            })
          }
        }),
        Settings: createStackNavigator({
          Settings: {
            screen: SettingsScreen,
            navigationOptions: ({ navigation, screenProps }) => ({
              headerTitle: localizedStrings[screenProps.language].settingsTitle,
              headerStyle: {
                backgroundColor: "#595d63"
              },
              headerTintColor: "#d6d6d6",
              headerTitleStyle: {
                fontSize: Metrics.navigationTitleFontSize,
                fontFamily: "sansBold"
              }
            })
          }
        })
      },
      {
        tabBarPosition: "bottom",
        swipeEnabled: "true",

        tabBarOptions: {
          horizontal: true,
          showIcon: true,
          showLabel: false,
          activeBackgroundColor: "#009688",
          inactiveBackgroundColor: "#595d63",

          tabStyle: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
          },
          style: {
            backgroundColor: "trasparent",
            justifyContent: "center",
            alignItems: "center"
          }
        },
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            if (routeName === "Home") {
              return (
                <Image
                  style={{ width: 35, height: 35 }}
                  source={require("../../assets/home-tab.png")}
                />
              );
            } else if (routeName === "History") {
              return (
                <Image
                  style={{ width: 35, height: 35 }}
                  source={require("../../assets/history-tab.png")}
                />
              );
            } else if (routeName === "Settings") {
              return (
                <Image
                  style={{ width: 35, height: 35 }}
                  source={require("../../assets/settings-tab.png")}
                />
              );
            }
          }
        })
      }
    ),
    navigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: "#595d63"
      },
      headerTintColor: "#d6d6d6",
      headerTitleStyle: {
        fontSize: Metrics.navigationTitleFontSize,
        fontFamily: "sansItalic"
      }
    }
  },
  Add: {
    screen: AddScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTitle: localizedStrings[screenProps.language].addTitle,
      headerStyle: {
        backgroundColor: "#595d63"
      },
      headerTintColor: "#d6d6d6",
      headerTitleStyle: {
        fontSize: Metrics.navigationTitleFontSize
      }
    })
  },
  Edit: {
    screen: EditScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTitle: localizedStrings[screenProps.language].editTitle,
      headerStyle: {
        backgroundColor: "#595d63"
      },
      headerTintColor: "#d6d6d6",
      headerTitleStyle: {
        fontSize: Metrics.navigationTitleFontSize,
        fontWeight: "bold"
      }
    })
  },
  Notifications: {
    screen: ManageNotifications,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTitle:
        localizedStrings[screenProps.language].manageNotificationsTitle,
      headerStyle: {
        backgroundColor: "#595d63"
      },
      headerTintColor: "#d6d6d6",
      headerTitleStyle: {
        fontSize: Metrics.navigationTitleFontSize,
        fontWeight: "bold"
      }
    })
  }
});

class NavWrapper extends React.Component {
  static router = AppNavigator.router;
  render() {
    const { navigation } = this.props;
    return (
      <AppNavigator
        navigation={navigation}
        screenProps={{
          language: this.props.language
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.settingsState.language
  };
};

const AppNavWrapper = connect(
  mapStateToProps,
  {}
)(NavWrapper);
export default createAppContainer(AppNavWrapper);

const styles = StyleSheet.create({
  addButtonStyle: {}
});
