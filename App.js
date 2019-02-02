import React from "react";
import { Text } from "react-native";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux";

import { Font } from "expo";

import Navigation from "./src/components/Navigation";

console.disableYellowBox = true;

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoad: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      champ: require("./assets/fonts/champ.ttf"),
      champBold: require("./assets/fonts/champ-bold.ttf"),
      champItalic: require("./assets/fonts/champ-italic.ttf"),
      champBoldItaic: require("./assets/fonts/champ-bold-italic.ttf")
    });
    this.setState({ fontLoad: true });
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {this.state.fontLoad ? <Navigation /> : null}
        </PersistGate>
      </Provider>
    );
  }
}
