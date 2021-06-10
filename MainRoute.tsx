import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';
import EbikeGoLightTheme, {ThemeItem} from './themes/EBikeGoLightTheme';
import Signup from './View/signup';
import Tabs from './View/tabs';
import Login from './View/login';
import {connect} from 'react-redux';
import {StoreState} from './models/reduxModels';
import {userCreateModel} from './models/userModel';
import {useTheme} from '@react-navigation/native';
const MainRoute = ({user}: MainRouteProps) => {
  const Stack = createStackNavigator();
  const theme: ThemeItem = Object(useTheme());
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: {display: 'none'},
      }}
      initialRouteName="tabs">
      {!!user ? (
        <Stack.Screen name="tabs" component={Tabs} />
      ) : (
        <>
          <Stack.Screen
            name="login"
            component={Login}
            options={{headerTintColor: theme.colors.primary}}
          />
          <Stack.Screen
            name="signup"
            component={Signup}
            options={{headerTintColor: theme.colors.primary}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (state: StoreState) => {
  return {
    user: state.user.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainRoute);
interface MainRouteProps {
  user?: userCreateModel;
}
