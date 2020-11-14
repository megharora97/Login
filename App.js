import * as React from 'react';
import { LogBox, Text, View, Platform, StatusBar, } from 'react-native';
import MainNavigator from './src/Navigator';

StatusBar.setBarStyle('light-content');
if (Platform.OS != 'ios') {
  StatusBar.setBackgroundColor('black');
  StatusBar.setHidden(false)
}
LogBox.ignoreLogs(['Warning: componentWillReceiveProps has been renamed,', 'VirtualizedLists should never be nested', "Require cycle:", "YellowBox has been replaced with LogBox. Please call LogBox.ignoreLogs() instead.", "Animated: `useNativeDriver` was not specified"])


class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <MainNavigator />
    );
  }
}

export default App;