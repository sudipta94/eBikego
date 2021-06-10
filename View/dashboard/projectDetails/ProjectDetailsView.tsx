import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import globalStyles from '../../../globalStyle';
import {ThemeItem} from '../../../themes/EBikeGoLightTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TaskItem} from '../dashboardHome/DashboardHomeView';
import {Project, Tasks} from '../../../models/userModel';
const ProjectDetailsView = ({
  project,
  SetTask,
  task,
  actionTigger,
}: ProjectDetailsProps) => {
  const theme: ThemeItem = Object(useTheme());
  console.log(task);

  return (
    <View style={{flex: 1}}>
      <Header project={project} />
      <ScrollView>
        <CreateTask SetTask={SetTask} />
        <View
          style={{
            padding: 5,
            backgroundColor: theme.colors.primaryTint,
            width: '25%',
            marginTop: 10,
            borderTopRightRadius: theme.roundness.mediumRoundness,
            borderBottomRightRadius: theme.roundness.mediumRoundness,
          }}>
          <Text
            style={[
              {
                color: theme.colors.primaryConstrast,
                fontSize: theme.fonts.smallFont,
                fontWeight: 'bold',
              },
              globalStyles.fontFamily,
            ]}>
            Tasks
          </Text>
        </View>
        {!!task &&
          task.map(item => (
            <TaskItem
              key={item.task_id}
              item={item}
              actionTigger={actionTigger}
            />
          ))}
      </ScrollView>
    </View>
  );
};
interface ProjectDetailsProps {
  project?: Project;
  SetTask?: any;
  task?: Tasks[];
  actionTigger?: any;
}
export default ProjectDetailsView;
const Header = (props: any) => {
  console.log(props);

  const theme: ThemeItem = Object(useTheme());
  return (
    <View
      style={{
        height: 55,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        paddingLeft: 40,
      }}>
      <Text
        style={[
          {
            fontSize: theme.fonts.mediumFont,
            color: theme.colors.primaryConstrast,
          },
          globalStyles.fontFamily,
        ]}>
        {props?.project?.project_name}
      </Text>
    </View>
  );
};

const CreateTask = (props: any) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <TouchableOpacity
      onPress={() => props.SetTask(true)}
      style={{
        height: 55,
        margin: 10,
        borderWidth: 0.5,
        borderColor: theme.colors.inputBorder,
        borderRadius: theme.roundness.mediumRoundness,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Ionicons
        color={theme.colors.primary}
        name={'add-outline'}
        size={theme.icons.bigIcon}
        style={{marginLeft: 10}}
      />
      <Text
        style={{color: theme.colors.primary, fontSize: theme.fonts.mediumFont}}>
        Create Task
      </Text>
    </TouchableOpacity>
  );
};
