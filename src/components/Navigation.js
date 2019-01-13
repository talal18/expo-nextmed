import React from "react";
import { Image, StyleSheet } from "react-native";
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

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Settings: SettingsScreen
  },
  {
    tabBarPosition: "bottom",

    tabBarOptions: {
      horizontal: true,
      showIcon: true,
      showLabel: false,
      pressColor: "#595d63",

      tabStyle: {
        flexDirection: "row",
        height: Metrics.tabHeight,
        backgroundColor: "#000",

        justifyContent: "center"
      }
    },
    style: {
      backgroundColor: "#242424"
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === "Home") {
          return (
            <Image
              style={styles.homeTabLogo}
              source={require("../assets/images/home-tab2.png")}
            />
          );
        } else if (routeName === "Settings") {
          return (
            <Image
              style={styles.settingTabLogo}
              source={require("../assets/images/settings-logo3.png")}
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
      title: "Medicine List",
      headerStyle: {
        backgroundColor: "#595d63"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
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
      headerTintColor: "#fff",
      headerTitleStyle: {
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
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
});

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  // homeTabLogo: {
  //   width: Metrics.homeTabLogoWidth,
  //   height: Metrics.homeTabLogoHeight
  // },
  // settingTabLogo: {
  //   width: Metrics.settingsTabLogoWidth,
  //   height: Metrics.settingsTabLogoHeight
  // }
});
