import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
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

const TabNavigator = createBottomTabNavigator(
  {
    Home: createStackNavigator({
      Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
          headerTitle: "Medicine List",
          headerStyle: {
            backgroundColor: "#595d63"
          },
          headerTintColor: "#d6d6d6",
          headerTitleStyle: {
            fontSize: Metrics.navigationTitleFontSize,
            fontWeight: "bold"
          },
          headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate("Add")}>
              <Image
                style={{
                  width: Metrics.homeAddButtonWidth,
                  height: Metrics.homeAddButtonHeight,
                  marginRight: 10
                }}
                source={require("../assets/images/add-navbar.png")}
              />
            </TouchableOpacity>
          )
        })
      }
    }),
    Settings: createStackNavigator({
      Settings: {
        screen: SettingsScreen,
        navigationOptions: {
          headerTitle: "Settings",
          headerStyle: {
            backgroundColor: "#595d63"
          },
          headerTintColor: "#d6d6d6",
          headerTitleStyle: {
            fontSize: Metrics.navigationTitleFontSize,
            fontWeight: "bold"
          }
        }
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
      activeBackgroundColor: "#595d63",
      inactiveBackgroundColor: "#009688",

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
              style={styles.homeTabLogo}
              source={require("../assets/images/home-tab4.png")}
            />
          );
        } else if (routeName === "Settings") {
          return (
            <Image
              style={styles.settingTabLogo}
              source={require("../assets/images/settings-tab.png")}
            />
          );
        }
      }
    })
  }
);

const AppNavigator = createStackNavigator({
  Tabs: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: "#595d63"
      },
      headerTintColor: "#d6d6d6",
      headerTitleStyle: {
        fontSize: Metrics.navigationTitleFontSize,
        fontWeight: "bold"
      }
    }
  },
  Add: {
    screen: AddScreen,
    navigationOptions: {
      title: "Add",
      headerStyle: {
        backgroundColor: "#595d63"
      },
      headerTintColor: "#d6d6d6",
      headerTitleStyle: {
        fontSize: Metrics.navigationTitleFontSize,
        fontWeight: "bold"
      }
    }
  },
  Edit: {
    screen: EditScreen,
    navigationOptions: {
      title: "Edit",
      headerStyle: {
        backgroundColor: "#595d63"
      },
      headerTintColor: "#d6d6d6",
      headerTitleStyle: {
        fontSize: Metrics.navigationTitleFontSize,
        fontWeight: "bold"
      }
    }
  },
  Notifications: {
    screen: ManageNotifications,
    navigationOptions: {
      title: "Manage Notifications",
      headerStyle: {
        backgroundColor: "#595d63"
      },
      headerTintColor: "#d6d6d6",
      headerTitleStyle: {
        fontSize: Metrics.navigationTitleFontSize,
        fontWeight: "bold"
      }
    }
  }
});

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  addButtonStyle: {}
});
