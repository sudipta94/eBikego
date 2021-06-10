import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../../globalStyle';
import {ThemeItem} from '../../themes/EBikeGoLightTheme';
import DashBoard from '../dashboard';
import Profile from '../profile';
const Tab = createBottomTabNavigator();
const Tabs = () => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else {
            iconName = 'person';
          }

          return (
            <Icon
              name={iconName}
              size={theme.icons.bigIcon}
              color={color}
              style={{
                marginBottom: 0,
              }}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.secondaryTint,
        showLabel: true,
        style: [
          {
            height: 60,
            borderTopWidth: 0,
            marginTop: -15,
          },
          globalStyles.highBoxShadow,
        ],
        tabStyle: {
          borderTopWidth: 0,
        },
        labelStyle: {
          paddingBottom: 5,
        },
      }}
      initialRouteName="dashboard">
      <Tab.Screen name="Dashboard" component={DashBoard} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Tabs;
