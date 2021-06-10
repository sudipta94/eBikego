import {useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';
import {ThemeItem} from '../../themes/EBikeGoLightTheme';
import CreateTask from './CreateTask';
import CreateTaskView from './CreateTask/CreateTaskView';
import DashboardHome from './dashboardHome';
import ProjectDetail from './projectDetails';

const DashBoard = () => {
  const theme: ThemeItem = Object(useTheme());
  const Home = createStackNavigator();
  return (
    <Home.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: {display: 'none'},
      }}
      initialRouteName="dashboard">
      <Home.Screen
        name="dashboard"
        component={DashboardHome}
        options={{headerTintColor: theme.colors.primary}}
      />
      <Home.Screen
        name="project-details"
        component={ProjectDetail}
        options={{headerTintColor: theme.colors.primaryConstrast}}
      />
      <Home.Screen
        name="create-task"
        component={CreateTask}
        options={{headerTintColor: theme.colors.primaryConstrast}}
      />
    </Home.Navigator>
  );
};

export default DashBoard;
