import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {} from 'react-native';
import EbikeGoLightTheme from './themes/EBikeGoLightTheme';

import {Provider as ReduxProvider} from 'react-redux';
import ConfigureStore from './redux/configureStore';
import MainRoute from './MainRoute';
import SpinnerView from './library/spinnerView';

const App = () => {
  const store = ConfigureStore();
  return (
    <ReduxProvider store={store}>
      <NavigationContainer theme={EbikeGoLightTheme}>
        <MainRoute />
      </NavigationContainer>
      <SpinnerView></SpinnerView>
    </ReduxProvider>
  );
};

export default App;
